const jwt = require('jsonwebtoken');
const pool = require('../../../config/db');

async function authenticateTeacher(req, res, next) {

  const token = req.header('Authorization');
  console.log('1Token', token);

  if (!token) {
    return res.status(401).json({ error: "Unauthorized", details: "No token Found", errorDetails: error.message });
  }
  try {
    const decoded = jwt.verify(token.replace(/^Bearer\s/, ''), process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);

    const teacherResult = await pool.query('SELECT * FROM teachers WHERE teacherId = $1', [decoded.teacherId]);

    if (!teacherResult.rows[0]) {
      return res.status(401).json({ error: "Unauthorized", details: "Invalid Token", errorDetails: error.message });
    }

    req.teacher = teacherResult.rows[0];
    next();
  }
  catch (error) {
    console.error(error);
    return res.status(401).json({ error: "Unauthorized", details: "Invalid Token2", errorDetails: error.message });
  }

}

module.exports = authenticateTeacher;