import AppError from '../helpers/errorHandler.js';
import { clearAuthCookies, setAuthCookies } from '../helpers/cookie.js';
import {
    authenticateUser,
    createAuthSession,
    registerUser,
    revokeAuthSession,
    rotateRefreshToken,
} from '../services/auth.services.js';

const Register = async (req, res) => {
    const user = await registerUser(req.body ?? {});
    const session = await createAuthSession(user._id);
    setAuthCookies(res, session);
    return res.status(201).json({ success: true, message: 'Registration successful' });
};

const Login = async (req, res) => {
    const user = await authenticateUser(req.body ?? {});
    const session = await createAuthSession(user._id);
    setAuthCookies(res, session);
    return res.status(200).json({ success: true, message: 'Login successful' });
};

const Refresh = async (req, res) => {
    const session = await rotateRefreshToken({
        token: req.cookies?.refreshToken,
        sessionId: req.cookies?.sessionId,
    });
    setAuthCookies(res, session);
    return res.status(200).json({ success: true, message: 'Session refreshed' });
};

const Logout = async (req, res) => {
    await revokeAuthSession(req.cookies?.sessionId);
    clearAuthCookies(res);
    return res.status(200).json({ success: true, message: 'Logged out' });
};

const Me = (req, res) => {
    if (!req.user) {
        throw new AppError(401, 'Authentication required');
    }

    return res.status(200).json({
        success: true,
        user: {
            id: req.user.id,
            name: req.user.name,
            email: req.user.email,
            phone: req.user.phone,
        },
    });
};

export { Register, Login, Refresh, Logout, Me };