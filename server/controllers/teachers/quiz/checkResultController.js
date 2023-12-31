const pool = require('../../../config/db');
const jwt = require('jsonwebtoken');
const checkResultController = async (req, res) => {
    try {
        const { quizId } = req.params;
        const teacherId = req.teacher.teacherid;

        // Check if the requested quiz belongs to the teacher
        const quizResult = await pool.query(
            'SELECT * FROM quizzes WHERE quizid = $1 AND teacherid = $2',
            [quizId, teacherId]
        );

        if (quizResult.rows.length === 0) {
            return res.status(404).json({ error: 'Quiz not found or does not belong to the teacher' });
        }

        // Fetch results for the selected quiz
        const result = await pool.query(
            'SELECT students.name, students.registrationnumber, students.batch, students.branch, students.section, results.score ' +
            'FROM results ' +
            'JOIN students ON results.registrationnumber = students.registrationnumber ' +
            'WHERE results.quizid = $1',
            [quizId]
        );

        const quizResults = result.rows;

        res.json({ quizResults });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = checkResultController;