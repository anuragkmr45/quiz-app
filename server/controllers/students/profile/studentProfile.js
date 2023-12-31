const pool = require('../../../config/db');

const studentProfile = async () => {

    const token = req.header('Authorization');

        if (!token) {
            return res.status(401).json({ error: "Unauthorized", details: "No token Found", errorDetails: error.message });
          }

    try {
          const decoded = jwt.verify(token.replace(/^Bearer\s/, ''), process.env.JWT_SECRET);
          console.log("Decoded Token:", decoded);

         const registrationnumber = decoded.registrationNumber;
        // Get student details from the database based on the registration number in the JWT token
        const result = await pool.query('SELECT * FROM students WHERE registrationnumber = $1', [registrationnumber]);

        const student = result.rows[0];

        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        // Extract profile information
        const { name, email, batch, branch, section } = student;

        // Send the profile information in the response
        res.json({ name, email, batch, branch, section });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = studentProfile;