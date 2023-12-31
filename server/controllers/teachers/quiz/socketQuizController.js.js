const pool = require('../../../config/db');
const jwt = require('jsonwebtoken');
const Redis = require('ioredis');
const redis = new Redis();
const pool = require('../../../config/db');

//Function to get Quiz details from the database

async function getQuizDetailsFromDatabase(quizId) {
  try {
    const quizQuery = `
      SELECT 
      quizzes.quizid,
      quizzes.title AS quiz_title, 
      questions.question AS question_text, 
      questions.option1, 
      questions.option2, 
      questions.option3, 
      questions.option4, 
      questions.answer,
      quizzes.teacherId
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
      return null; // Quiz not found
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
    const quizTeacherId = quizResult.rows[0].teacherId;

    if (quizTeacherId !== teacherId) {
      return null; // Unauthorized access
    }

    return { quizTitle, quizData };
  } catch (error) {
    console.error(error);
    return null; // Error fetching quiz details
  }
}

//Function to generate random password

function generateRandomPassword() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let password = '';
  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters.charAt(randomIndex);
  }
  return password;
}

// Function to JSONify the quiz and store in redis cache for 2 hours along with the password to join the room.

const socketQuizController = async (req, res) => {
    try {

      // Teacher verification
        const token = req.header('Authorization');

        // Verify the token
        const decoded = jwt.verify(token.replace(/^Bearer\s/, ''), process.env.JWT_SECRET);
        console.log('Decoded Token in Controller', decoded);
        const TeacherID = decoded.teacherId;
        console.log('Teacher ID: ',TeacherID);
  
      // Get quiz ID and duration from the request
      const { quizId } = req.body;
  
      // Fetch quiz details from the database (assuming you have a function for this)
      const quizDetails = await getQuizDetailsFromDatabase(quizId);
  
      if (!quizDetails) {
        return res.status(404).json({ error: 'Quiz not found' });
      }

      if (quizDetails.teacherId !== teacherId) {
        return res.status(403).json({ error: 'Unauthorized', details: 'Teacher does not have access to this quiz' });
      }
  
      // Generate a random password for the quiz room
      const roomPassword = generateRandomPassword();
  
      // Store quiz details and password in Redis cache
      const roomKey = `quiz-room:${quizId}`;
      const roomData = {
        quizDetails,
        password: roomPassword,
      };
  
      // Convert room data to JSON before storing in Redis
      const roomDataJSON = JSON.stringify(roomData);
  
      // Store room data in Redis with an expiration time (e.g., duration * 60 seconds)
      await redis.setex(roomKey, 7200, roomDataJSON);
  
      // Return the generated password to the teacher
      res.json({ roomPassword });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  module.exports = socketQuizController;