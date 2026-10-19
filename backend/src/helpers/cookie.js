
const setCookie = (res, name, token, maxAge) => {
    if (!res || !name || !token || !maxAge) {
        throw new Error('Response, cookie name, token, and max age are required');
    }

    res.cookie(name, token, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge,
    });
};

export { setCookie };