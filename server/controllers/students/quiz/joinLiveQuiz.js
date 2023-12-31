const Redis = require('ioredis');
const redis = new Redis();
const socketIO = require('socket.io');
const pool = require('../../../config/db');
const jwt = require('jsonwebtoken');

const joinLiveQuizSocket = (server) => {
    // Using the authenticateStudent middleware to obtain the token from the request
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized', details: 'No token found', errorDetails: error.message });
    }

    

  io.on('connection', (socket) => {
    // Handle a student joining the live quiz room
    socket.on('joinQuizRoom', async ({ quizId, password }) => {
      try {
        // Check if the provided password is correct
        const roomKey = `quiz-room:${quizId}`;
        const storedDataJSON = await redis.get(roomKey);

        if (!storedDataJSON) {
          socket.emit('quizNotFound');
          return;
        }

        const storedData = JSON.parse(storedDataJSON);

        if (password !== storedData.password) {
          socket.emit('invalidPassword');
          return;
        }

        // Emit the quiz details to the student (excluding answers)
        const quizDetails = storedData.quizDetails;
        socket.emit('quizDetails', quizDetails);
      } catch (error) {
        console.error(error);
        socket.emit('serverError');
      }
    });
  });
};

module.exports = joinLiveQuizSocket;
