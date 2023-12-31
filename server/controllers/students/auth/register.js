const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../../../config/db');

const studentRegController = async (req, res) => {
    try {
        const {
            name,
            registrationNumber,
            email,
            password,
            batch,
            branch,
            section,
            course
        } = req.body;

        // Hash the password before storing it in the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Perform database insertion
        const result = await pool.query(
            'INSERT INTO students (name, registrationnumber, email, password, batch, branch, section, course) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
            [name, registrationNumber, email, hashedPassword, batch, branch, section, course]
        );

        const newStudent = result.rows[0];

        // Generate a JWT token for the newly registered student
        const token = jwt.sign(
            { registrationNumber: newStudent.registrationnumber },
            process.env.JWT_SECRET,
            { expiresIn: '7d' } // Token expiration time 
        );

        res.status(201).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
} 

module.exports = studentRegController;