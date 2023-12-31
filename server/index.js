const express = require('express');
const http = require('http'); 
const socketIo = require('socket.io'); 
const bodyParser = require('body-parser');
const compression = require('compression');
require('dotenv').config();
const cors = require('cors');



const app = express();
const port = process.env.HOST_PORT || 3000;
const server = http.createServer(app); 
const io = socketIo(server);

// CORS
app.use(cors());

app.use(compression({ filter: shouldCompress }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const router = require('./routes/routes')
app.use('/', router)

// const io = socketIO(server);
// const verifyTokenAsync = promisify(jwt.verify);

// Socket.IO middleware for authorization, you can implement your own logic
// io.use((socket, next) => {
//   (async () => {
//     try {
//       // Get the token from the query parameters
//       const token = socket.handshake.query.token;

//       if (!token) {
//         return next(new Error('Authentication error: Token missing'));
//       }

//       // Verify the token
//       const decoded = await verifyTokenAsync(token, JWT_SECRET);

//     //  Checking if it is a teacher or a student.
//       const isTeacher = decoded.role === 'teacher'; 
//       const isStudent = decoded.role === 'student'; 
//       if (!isTeacher && !isStudent) {
//         return next(new Error('Authentication error: Not a teacher or student'));
//       }

//       // Attach user details to the socket for future use
//       socket.user = decoded;

//       // Continue with the connection
//       next();
//     } catch (error) {
//       console.error('Socket.IO authentication error:', error.message);
//       next(new Error('Authentication error'));
//     }
//   })();
// });

// // Socket.IO connection logic
// io.on('connection', (socket) => {
//   console.log('A user connected');

//   // Implement socket event handlers here

//   socket.on('disconnect', () => {
//     console.log('User disconnected');
//   });
// });

// // Apply Socket.IO middleware
// app.use((req, res, next) => {
//   req.io = io;
//   next();
// });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

function shouldCompress(req, res) {
  if (req.headers['x-no-compression']) {
    // Don't compress responses with this request header
    return false;
  }

  // Compress responses larger than 10 KB
  return compression.filter(req, res);
}
