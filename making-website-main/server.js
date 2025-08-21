const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const path = require('path');

const app = express();
const PORT = 3000;

// Connect to MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',         // change if needed
  password: '',         // change if needed
  database: 'roadmap_portal'
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database.");
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// POST: Register
app.post('/register', async (req, res) => {
  const { fullname, email, username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = `INSERT INTO users (fullname, email, username, password) VALUES (?, ?, ?, ?)`;

    db.query(sql, [fullname, email, username, hashedPassword], (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.send(`<script>alert("Username or Email already exists."); window.location.href="/register.html";</script>`);
        }
        console.error(err);
        return res.send(`<script>alert("Registration failed."); window.location.href="/register.html";</script>`);
      }

      res.send(`<script>alert("Registration successful!"); window.location.href="/register.html";</script>`);
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error.");
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
