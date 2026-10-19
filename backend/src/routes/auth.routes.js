import { Router } from 'express';
import {
    registerUser,
    authenticateUser,
    createAuthSession,
    rotateRefreshToken,
    revokeAuthSessionByUser,
} from '../services/auth.services.js';
import { setCookie } from '../helpers/cookie.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = Router();

// POST /api/auth/register
router.post('/register', async (req, res, next) => {
    try {
        const user = await registerUser(req.body);
        const session = await createAuthSession(user._id, {
            userAgent: req.headers['user-agent'],
            ip: req.ip,
        });
        setCookie(res, 'accessToken', session.accessToken, 7 * 60 * 1000);
        setCookie(res, 'refreshToken', session.refreshToken, 30 * 24 * 60 * 60 * 1000);
        setCookie(res, 'sessionId', session.sessionId, 30 * 24 * 60 * 60 * 1000);
        return res.status(201).json({
            success: true,
            message: 'Registration successful',
            user: { id: user._id, name: user.name, email: user.email, phone: user.phone },
        });
    } catch (err) {
        next(err);
    }
});

// POST /api/auth/login
router.post('/login', async (req, res, next) => {
    try {
        const { email, phone, password } = req.body;
        const user = await authenticateUser({ email, phone, password });
        const session = await createAuthSession(user._id, {
            userAgent: req.headers['user-agent'],
            ip: req.ip,
        });
        setCookie(res, 'accessToken', session.accessToken, 7 * 60 * 1000);
        setCookie(res, 'refreshToken', session.refreshToken, 30 * 24 * 60 * 60 * 1000);
        setCookie(res, 'sessionId', session.sessionId, 30 * 24 * 60 * 60 * 1000);
        return res.status(200).json({
            success: true,
            message: 'Login successful',
            user: { id: user._id, name: user.name, email: user.email, phone: user.phone },
        });
    } catch (err) {
        next(err);
    }
});

// POST /api/auth/refresh
router.post('/refresh', async (req, res, next) => {
    try {
        const session = await rotateRefreshToken({
            token: req.cookies?.refreshToken,
            sessionId: req.cookies?.sessionId,
        });
        setCookie(res, 'accessToken', session.accessToken, 7 * 60 * 1000);
        setCookie(res, 'refreshToken', session.refreshToken, 30 * 24 * 60 * 60 * 1000);
        setCookie(res, 'sessionId', session.sessionId, 30 * 24 * 60 * 60 * 1000);
        return res.status(200).json({
            success: true,
            message: 'Session refreshed',
        });
    } catch (err) {
        next(err);
    }
});

// POST /api/auth/logout
router.post('/logout', authenticate, async (req, res, next) => {
    try {
        await revokeAuthSessionByUser(req.user._id);
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        res.clearCookie('sessionId');
        return res.status(200).json({
            success: true,
            message: 'Logged out',
        });
    } catch (err) {
        next(err);
    }
});

// GET /api/auth/me
router.get('/me', authenticate, async (req, res) => {
    return res.status(200).json({
        success: true,
        user: {
            id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            phone: req.user.phone,
            emailVerified: req.user.emailVerified,
        },
    });
});

export default router;