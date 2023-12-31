const pool = require('../../../config/db');

const myQuizesController = async (req, res) => {
    try {
        const teacherId = req.teacher.teacherid;

        // Fetch all quizzes created by the teacher
        const result = await pool.query(
            'SELECT quizid, title, datecreated FROM quizzes WHERE teacherid = $1 ORDER BY datecreated DESC',
            [teacherId]
        );

        const quizzes = result.rows;

        res.json({ quizzes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = myQuizesController