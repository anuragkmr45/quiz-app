const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../../../config/db');

const studentLoginController = async (req, res) => {
    try {
        const { registrationNumber, password } = req.body;

        // Retrieve the student from the database based on registration number
        const result = await pool.query('SELECT * FROM students WHERE registrationnumber = $1', [registrationNumber]);

        const student = result.rows[0];

        if (!student) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Compare the provided password with the hashed password from the database
        const passwordMatch = await bcrypt.compare(password, student.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate a JWT token for the authenticated student
        const token = jwt.sign(
            { registrationNumber: student.registrationnumber },
            process.env.JWT_SECRET,
            { expiresIn: '7d' } // Token expiration time 
        );

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = studentLoginController;