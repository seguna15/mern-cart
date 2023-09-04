const jwt = require('jsonwebtoken');

const genAuthToken = (user) => {
    const secret = process.env.JWT_SECRET_KEY;

    const token = jwt.sign(
        {
            userId: user.id,
            name: user.name,
            email: user.email
        },
        secret,
        {expiresIn: '1d'}
    );

    return token;
}


module.exports = genAuthToken;