const express = require('express');

// middlewares
const authenticateTeacher = require('../middlewares/teacher/auth/authenticateTeacher');
const authenticateStudent = require('../middlewares/student/auth/authenticateStudent');

// teacher's side
const loginController = require("../controllers/teachers/auth/login");
const {logoutTeacherController}  = require("../controllers/teachers/auth/logout");
const registerController = require("../controllers/teachers/auth/register");
const checkResultTeacherController = require("../controllers/teachers/quiz/checkResultController");
const myQuizesController = require("../controllers/teachers/quiz/myQuizesController");
const getQuizController = require("../controllers/teachers/quiz/getQuizController");

// quiz
const createQuizController = require("../controllers/quizzes/createQuizController")

// student's side
const studentLoginController = require("../controllers/students/auth/login")
const studentRegController = require("../controllers/students/auth/register")
const studentProfile = require("../controllers/students/profile/studentProfile")
const checkStudentResultController = require("../controllers/students/quiz/checkResultController")
const { logoutStudentController } = require("../controllers/students/auth/logout")
// const scoreCounter = require("../controllers/students/quiz/scoreCounterController")
// const joinLiveQuizSocket = require("../controllers/students/quiz/joinLiveQuiz")

const router = express.Router();

// post 
router.post('/', authenticateTeacher, logoutTeacherController);
router.post('/teacher-login', loginController);
router.post('/teacher-register', registerController);
router.post('/dashboard/add-quiz', authenticateTeacher, createQuizController)
router.post('/student-login', studentLoginController);
router.post('/student-register', studentRegController);
router.post('/student-logout', authenticateStudent, logoutStudentController);

// get
router.get('/student-profile', authenticateStudent, studentProfile)
router.get('/dashboard/previous-quizes', authenticateTeacher, myQuizesController)
router.get('/dashboard/previous-quizes/:quizId', authenticateTeacher, getQuizController);
router.get('/dashboard/previous-quizes/:quizId/results', authenticateTeacher, checkResultTeacherController )
router.get('/my-results', authenticateStudent, checkStudentResultController )

module.exports = router;