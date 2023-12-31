const jwt = require('jsonwebtoken');
const Redis = require('ioredis');
const redis = new Redis();
const socketQuizController = require('./socketQuizController'); 


const createQuizLive = async (req, res) => {
    try {
      // Teacher verification
      const token = req.header('Authorization');
  
      // Verify the token
      const decoded = jwt.verify(token.replace(/^Bearer\s/, ''), process.env.JWT_SECRET);
      console.log('Decoded Token in Controller', decoded);
      const teacherId = decoded.teacherId;
      console.log('Teacher ID: ', teacherId);
  
      // Get quiz ID and duration from the request
      const { quizId, duration } = req.body;
  
      // Generate a JSONified quiz and get the room password from the socketQuizController
      const { roomPassword, quizDetails } = await socketQuizController(quizId, teacherId, duration);
  
      // Create a socket.io room for the live quiz
      const io = req.app.get('io');
      const roomName = `quiz-room-${quizId}`;
      const room = io.of('/').in(roomName);
  
      // Set up event handlers to receive quiz data (excluding answers) and manage the real-time timer
      room.on('connection', (socket) => {
        // Emit quiz data (excluding answers) to connected students
        socket.emit('quizData', quizDetails);
  
        // Start the timer
        const timerDuration = duration * 60 * 1000; // Convert minutes to milliseconds
        let timeLeft = timerDuration;
  
        const timerInterval = setInterval(() => {
          timeLeft -= 1000; // Reduce time left by 1 second
          if (timeLeft <= 0) {
            clearInterval(timerInterval);
            // Timer has ended, close the room and disconnect all clients
            room.emit('timerEnd'); // Emit a custom event to notify clients that the timer has ended
            room.disconnectSockets(true); // Disconnect all clients and close the room
          }
        }, 1000);
      });
  
      // Return the generated password to the teacher
      res.json({ roomPassword });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  module.exports = createQuizLive;
