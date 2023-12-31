const jwt = require('jsonwebtoken');
const pool = require('../../../config/db');

async function authenticateStudent(req, res, next) {
    const token = req.header('Authorization');

    if (!token) {
        const error = new Error('No token found');
        return res.status(401).json({ error: 'Unauthorized', details: 'No token found', errorDetails: error.message });
    }

    try {
        const decoded = jwt.verify(token.replace(/^Bearer\s/, ''), process.env.JWT_SECRET);
        const registrationnumber = decoded.registrationNumber;
        const studentResult = await pool.query('SELECT * FROM students WHERE registrationnumber = $1', [registrationnumber]);

        if (!studentResult.rows[0]) {
            const error = new Error('Invalid Token Rows');
            return res.status(401).json({ error: 'Unauthorized', details: 'Invalid token rows', errorDetails: error.message });
        }

        req.student = studentResult.rows[0];
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: 'Unauthorized', details: 'Invalid token2', errorDetails: error.message });
        // next(error);
    }
}

module.exports = authenticateStudent;
