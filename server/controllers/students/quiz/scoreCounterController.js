const pool = require('../../../config/db');
const Redis = require('ioredis');
const redis = new Redis();
const jwt = require('jsonwebtoken'); // Import JWT library

// Function to calculate the score based on quiz data and student's responses
function calculateScore(quizData, studentResponses) {
  let score = 0;

  // Compare each question's answer in the quiz data with the student's response
  for (let i = 0; i < quizData.length; i++) {
    const { question, answer } = quizData[i];
    const studentResponse = studentResponses.find((response) => response.question === question);

    if (studentResponse && studentResponse.answer === answer) {
      // Correct answer
      score++;
    }
  }

  return score;
}

const scoreCounter = async (req, res) => {
  try {
    // Authenticate the student using JWT token
    const token = req.header('Authorization');

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized', details: 'No token found' });
    }

    // Verify the token and obtain the registrationNumber
    const decoded = jwt.verify(token.replace(/^Bearer\s/, ''), process.env.JWT_SECRET);
    const registrationNumber = decoded.registrationNumber;

    // Get quiz data (quizId, questions, correct answers) from Redis
    const { studentResponses } = req.body;
    const quizId = studentResponses[0].quizId; // Assuming quizId is the same for all responses
    const roomKey = `quiz-room:${quizId}`;
    const storedDataJSON = await redis.get(roomKey);

    if (!storedDataJSON) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    const storedData = JSON.parse(storedDataJSON);
    const quizData = storedData.quizDetails.quizData;

    // Calculate the score based on student's responses
    const score = calculateScore(quizData, studentResponses);

    // Update the score in the results table (you may need to customize this part based on your database structure)
    const updateScoreQuery = 'INSERT INTO results (registration_number, quiz_id, score) VALUES ($1, $2, $3)';
    await pool.query(updateScoreQuery, [registrationNumber, quizId, score]);

    res.json({ score });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = scoreCounter;
