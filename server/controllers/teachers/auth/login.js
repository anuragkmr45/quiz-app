const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../../../config/db');

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the teacher with the provided email exists
    const result = await pool.query('SELECT * FROM teachers WHERE email = $1', [email]);
    const teacher = result.rows[0];

    if (!teacher) {
      return res.status(401).json({ success: false, error: 'Invalid email or password' });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, teacher.password);

    if (!passwordMatch) {
      return res.status(401).json({ success: false, error: 'Invalid email or password' });
    }

    // Generate a JSON Web Token (JWT) for authentication
    const token = jwt.sign({ teacherId: teacher.teacherid, email: teacher.email }, process.env.JWT_SECRET);

    res.json({
      success: true,
      token,
      teacherId:teacher.teacherid
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ s1uccess: false, error: 'Internal Server Error' });
  }
};

module.exports = loginController;


