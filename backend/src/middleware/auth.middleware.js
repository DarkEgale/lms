import jwt from 'jsonwebtoken';
import { AccessToken } from '../models/index.js';
import User from '../models/users.model.js';
import AppError from '../helpers/errorHandler.js';

export const authenticate = async (req, res, next) => {
    try {
        let token;

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer ')
        ) {
            token = req.headers.authorization.split(' ')[1];
        } else if (req.cookies?.accessToken) {
            token = req.cookies.accessToken;
        }

        if (!token) {
            return next(new AppError(401, 'অথেন্টিকেশন প্রয়োজন। লগইন করুন।'));
        }

        const decoded = jwt.verify(token, process.env.API_SECRET);

        const crypto = await import('node:crypto');
        const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

        const storedToken = await AccessToken.findOne({
            user: decoded.id,
            tokenHash,
            isRevoked: false,
        });

        if (!storedToken) {
            return next(new AppError(401, 'টোকেন অবৈধ বা রেভোক করা হয়েছে।'));
        }

        if (storedToken.expiresAt < new Date()) {
            return next(new AppError(401, 'টোকেন মেয়াদ expire হয়ে গেছে।'));
        }

        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            return next(new AppError(401, 'User not found'));
        }

        req.user = user;
        next();
    } catch (err) {
        if (err.name === 'JsonWebTokenError') {
            return next(new AppError(401, 'টোকেন অবৈধ।'));
        }
        if (err.name === 'TokenExpiredError') {
            return next(new AppError(401, 'টোকেন মেয়াদ expire হয়ে গেছে।'));
        }
        next(err);
    }
};