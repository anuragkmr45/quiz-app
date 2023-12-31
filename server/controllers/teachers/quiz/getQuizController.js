const pool = require('../../../config/db');
const jwt = require('jsonwebtoken');

const getQuizController = async (req, res) => {
    
    const token = req.header('Authorization');

    // Verify the token
    const decoded = jwt.verify(token.replace(/^Bearer\s/, ''), process.env.JWT_SECRET);
    console.log('Decoded Token in Controller', decoded);
    const TeacherID = decoded.teacherId;
    console.log('Teacher ID: ',TeacherID);

    try {
        const { quizId } = req.params;

        // Check if the requested quiz belongs to the teacher
        const quizOwnershipQuery = `
            SELECT 1 
            FROM quizzes 
            WHERE quizid = $1 AND teacherid = $2
        `;

        const quizOwnershipResult = await pool.query(quizOwnershipQuery, [quizId, TeacherID]);

        if (quizOwnershipResult.rows.length === 0) {
            return res.status(401).json({ error: 'Unauthorized', details: 'Quiz does not belong to the teacher' });
        }

        // Fetch quiz details including questions and options
        const quizQuery = `
            SELECT 
                quizzes.title AS quiz_title, 
                questions.question AS question_text, 
                questions.option1, 
                questions.option2, 
                questions.option3, 
                questions.option4, 
                questions.answer
            FROM 
                quizzes 
            INNER JOIN 
                quizquestions ON quizzes.quizid = quizquestions.quizid
            INNER JOIN 
                questions ON quizquestions.questionid = questions.questionid
            WHERE 
                quizzes.quizid = $1
        `;

        const quizResult = await pool.query(quizQuery, [quizId]);

        if (quizResult.rows.length === 0) {
            return res.status(404).json({ error: 'Quiz not found' });
        }

        const quizData = quizResult.rows.map((row) => {
            return {
                question_text: row.question_text,
                option1: row.option1,
                option2: row.option2,
                option3: row.option3,
                option4: row.option4,
                answer: row.answer,
            };
        });

        const quizTitle = quizResult.rows[0].quiz_title;

        res.json({ quizTitle, quizData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = getQuizController;
