const pool = require('../../config/db');
const jwt = require('jsonwebtoken');


async function createQuizController(req, res) {
  const token = req.header('Authorization');

  // Verify the token
  const decoded = jwt.verify(token.replace(/^Bearer\s/, ''), process.env.JWT_SECRET);
  console.log('Decoded Token in Controller', decoded);
  const TeacherID = decoded.teacherId;
  console.log('Teacher ID: ', TeacherID);

  let QuizID;


  try {
    const {
      Title,
      Description,
      DateCreated,
      SubjectID,
      TopicName,
      Questions,
    } = req.body.body;

    console.log('Request Body:', req.body);
    // Generate a random 4-digit alphanumeric value
    const randomValue = Math.random().toString(36).substring(2, 6).toUpperCase();

    // Concatenate the prefix with the random value to create the quiz ID
    const quizID = `itersoa${randomValue}`;

    // Insert into Topics Table
    const topicID = `topic${randomValue}`;

    console.log('TopicName:', TopicName);
    console.log('topicID:', topicID);
    console.log('SubjectID:', SubjectID);
    const insertTopicQuery = `
      INSERT INTO Topics (TopicID, TopicName, SubjectID)
      VALUES ($1, $2, $3)
    `;
    await pool.query(insertTopicQuery, [topicID, TopicName, SubjectID]);

    // Insert into Quizzes Table
    const insertQuizQuery = `
      INSERT INTO Quizzes (QuizID, Title, Description, TeacherID, DateCreated, SubjectID, TopicID)
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING QuizID
    `;
    await pool.query(insertQuizQuery, [
      quizID,
      Title,
      Description,
      TeacherID,
      DateCreated,
      SubjectID,
      topicID,
    ]);

    // Get the newly inserted Quiz's ID
    const getQuizIDQuery = 'SELECT QuizID FROM Quizzes WHERE QuizID = $1';
    console.log('getQuizIDQuery', getQuizIDQuery);
    const quizResult = await pool.query(getQuizIDQuery, [quizID]);
    console.log('quizResult', quizResult);
    // const { QuizID } = quizResult.rows[0];
    // console.log('QuizID:', QuizID);

    QuizID = quizResult.rows[0].quizid;  // Assign QuizID

    console.log('QuizID:', QuizID);

    for (const { Question, Options, Answer } of Questions) {
      // Insert into Questions Table
      const insertQuestionQuery = `
        INSERT INTO Questions (Question, Option1, Option2, Option3, Option4, Answer, TopicID)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING QuestionID
      `;
      const questionResult = await pool.query(insertQuestionQuery, [
        Question,
        Options[0],
        Options[1],
        Options[2],
        Options[3],
        Answer,
        topicID,
      ]);

      const QuestionID = questionResult.rows[0].questionid;

      // Insert into QuizQuestions Table
      const insertQuizQuestionQuery = `
        INSERT INTO QuizQuestions (QuizID, QuestionID)
        VALUES ($1, $2)
      `;
      console.log('Inserting into QuizQuestions:', QuizID, QuestionID);
      await pool.query(insertQuizQuestionQuery, [QuizID, QuestionID]);
    }

    res.status(201).json({ success: true, message: 'Quiz created successfully' });
  } catch (error) {
    console.error('Error creating quiz:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}

module.exports = createQuizController;