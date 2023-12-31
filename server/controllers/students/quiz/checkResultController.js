const pool = require('../../../config/db');
const jwt = require('jsonwebtoken');


const checkResultController = async (req, res) => {
    try {
        // Using the authenticateStudent middleware to obtain the token from the request
        const token = req.header('Authorization');

        if (!token) {
            return res.status(401).json({ error: 'Unauthorized', details: 'No token found', errorDetails: error.message });
        }

        // Verify the token and obtain the registrationNumber
        const decoded = jwt.verify(token.replace(/^Bearer\s/, ''), process.env.JWT_SECRET);
        console.log('Decoded Token:', decoded); 
        const registrationNumber = decoded.registrationNumber;
        console.log('regno', registrationNumber);

        // Fetch results for the student
        const result = await pool.query(
            'SELECT quizzes.title, quizzes.datecreated, results.score ' +
            'FROM results ' +
            'JOIN quizzes ON results.quizid = quizzes.quizid ' +
            'WHERE results.registrationnumber = $1',
            [registrationNumber]
        );

        const quizResults = result.rows;

        res.json({ quizResults });
        console.log(quizResults);
    } catch (error) {
        console.error(error);
        if (error.name === 'JsonWebTokenError') {
            res.status(401).json({ error: 'Unauthorized', details: 'Invalid tokenc', errorDetails: error.message });
        } else {
            res.status(500).json({ error: 'Internal Server Error', errorDetails: error.message });
        }
    }
};

module.exports = checkResultController;

