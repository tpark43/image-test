export const validateUser = (req, res, next) => {
    const { username, password, password2 } = req.body;
    if ( username.length < 4 || password.length < 4) {
        throw new Error('Invalid input');
    }
    if ( req.url.includes('register') && password !== password2) {
        return next(new Error('Invalid password'));
    }
    return next();
}