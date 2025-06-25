const jwt = require('jsonwebtoken');

function generateToken(account) {
    return jwt.sign(
        { id: account.ID, role: account.Role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
}

module.exports = { generateToken };
