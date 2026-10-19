
const setCookie = (res, name, token, maxAge) => {
    if (!res || !name || !token || !maxAge) {
        throw new Error('Response, cookie name, token, and max age are required');
    }

    const isSecure = process.env.COOKIE_SECURE === 'true';
    const sameSite = process.env.COOKIE_SAME_SITE || 'Lax';

    res.cookie(name, token, {
        httpOnly: true,
        secure: isSecure,
        sameSite: sameSite,
        maxAge,
    });
};

const clearAuthCookies = (res) => {
    res.clearCookie('accessToken', {
        httpOnly: true,
        secure: process.env.COOKIE_SECURE === 'true',
        sameSite: process.env.COOKIE_SAME_SITE || 'Lax',
    });
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: process.env.COOKIE_SECURE === 'true',
        sameSite: process.env.COOKIE_SAME_SITE || 'Lax',
    });
    res.clearCookie('sessionId', {
        httpOnly: true,
        secure: process.env.COOKIE_SECURE === 'true',
        sameSite: process.env.COOKIE_SAME_SITE || 'Lax',
    });
};

export { setCookie, clearAuthCookies };