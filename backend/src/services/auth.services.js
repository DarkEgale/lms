import User from "../models/users.model.js";
import AppError from '../helpers/errorHandler.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { accessToken, refreshToken } from '../helpers/tokengen.js';
import { sessionId } from '../helpers/sessionGen.js';

const MAX_FAILED_ATTEMPTS = 5;
const LOCK_TIME = 2 * 60 * 60 * 1000;

const registerUser = async ({ name, email, phone, password }) => {
    if (![name, email, phone, password].every((value) => typeof value === 'string' && value.trim())) {
        throw new AppError(400, 'All fields are required');
    }

    const existingEmail = await User.findOne({ email: email.trim().toLowerCase() });
    if (existingEmail) {
        throw new AppError(409, 'এই ইমেইল দিয়ে ইতিমধ্যে অ্যাকাউন্ট তৈরি আছে');
    }

    const existingPhone = await User.findOne({ phone: phone.trim() });
    if (existingPhone) {
        throw new AppError(409, 'এই ফোন নম্বর দিয়ে ইতিমধ্যে অ্যাকাউন্ট তৈরি আছে');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    return User.create({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        password: hash,
    });
};

const authenticateUser = async ({ email, phone, password }) => {
    if (!password || typeof password !== 'string' || !password.trim()) {
        throw new AppError(400, 'পাসওয়ার্ড লিখুন');
    }

    if (!email && !phone) {
        throw new AppError(400, 'ইমেইল বা ফোন নম্বর লিখুন');
    }

    const user = await User.findOne(
        email
            ? { email: email.trim().toLowerCase() }
            : { phone: phone.trim() }
    );

    if (!user) {
        throw new AppError(401, 'ইমেইল/ফোন বা পাসওয়ার্ড ভুল');
    }

    if (user.lockUntil && user.lockUntil > Date.now()) {
        throw new AppError(423, 'অ্যাকাউন্ট অস্থায়ীভাবে লক করা হয়েছে। পরে চেষ্টা করুন।');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        user.failedAttempts += 1;
        if (user.failedAttempts >= MAX_FAILED_ATTEMPTS) {
            user.lockUntil = new Date(Date.now() + LOCK_TIME);
        }
        await user.save();
        throw new AppError(401, 'ইমেইল/ফোন বা পাসওয়ার্ড ভুল');
    }

    if (user.failedAttempts > 0 || user.lockUntil) {
        user.failedAttempts = 0;
        user.lockUntil = undefined;
        await user.save();
    }

    return user;
};

const createAuthSession = async (userId, deviceInfo = {}) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new AppError(404, 'User not found');
    }

    const sessionIdValue = sessionId();

    const accessTokenValue = accessToken(userId);
    const refreshTokenValue = refreshToken(userId);

    const accessDecoded = jwt.decode(accessTokenValue);
    const refreshDecoded = jwt.decode(refreshTokenValue);

    const accessExpiresAt = new Date((accessDecoded.exp || 0) * 1000);
    const refreshExpiresAt = new Date((refreshDecoded.exp || 0) * 1000);

    const crypto = await import('node:crypto');
    const accessTokenHash = crypto.createHash('sha256').update(accessTokenValue).digest('hex');

    await AccessToken.create({
        user: userId,
        tokenHash: accessTokenHash,
        expiresAt: accessExpiresAt,
        deviceInfo,
    });

    await RefreshToken.create({
        user: userId,
        token: refreshTokenValue,
        expiresAt: refreshExpiresAt,
        deviceInfo,
    });

    return {
        sessionId: sessionIdValue,
        accessToken: accessTokenValue,
        refreshToken: refreshTokenValue,
        accessExpiresAt,
        refreshExpiresAt,
    };
};

const rotateRefreshToken = async ({ token, sessionId: sessionIdValue }) => {
    if (!token) {
        throw new AppError(401, 'Refresh token required');
    }

    const existing = await RefreshToken.findOne({ token, isRevoked: false });
    if (!existing) {
        throw new AppError(401, 'Invalid or revoked refresh token');
    }

    const reuseCount = await RefreshToken.countDocuments({
        user: existing.user,
        createdAt: { $gte: existing.createdAt },
    });
    if (reuseCount > 1) {
        await RefreshToken.updateMany({ user: existing.user }, { isRevoked: true });
        await AccessToken.updateMany({ user: existing.user }, { isRevoked: true });
        throw new AppError(401, 'Token reuse detected. All sessions revoked.');
    }

    existing.isRevoked = true;
    await existing.save();

    await AccessToken.updateMany(
        { user: existing.user, isRevoked: false },
        { isRevoked: true }
    );

    return createAuthSession(existing.user, existing.deviceInfo);
};

const revokeAuthSessionByUser = async (userId) => {
    await RefreshToken.updateMany({ user: userId }, { isRevoked: true });
    await AccessToken.updateMany({ user: userId }, { isRevoked: true });
};

export {
    registerUser,
    authenticateUser,
    createAuthSession,
    rotateRefreshToken,
    revokeAuthSessionByUser,
};