const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mysql2 = require('mysql2');
const crypto = require('crypto');

// Generate a random secret key of 32 bytes (256 bits)
const secretKey = crypto.randomBytes(32).toString('hex');
const app = express();
const port = 3306;

const db = mysql2.createConnection({
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '',
  database: 'dbms_project'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: secretKey, resave: true, saveUninitialized: true }));

// Serve static files (e.g., CSS and JavaScript)
app.use(express.static('public'));

// Route for the login page
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});

// Route for handling login POST request
app.post('/login', (req, res) => {
  console.log("login");
    const { email, password, loginType } = req.body;
  
    // Determine which table to query based on the user's role
    let tableToQuery;
    if (loginType === 'citizen') {
      tableToQuery = 'citizen_info';
    } else if (loginType === 'employee') {
      tableToQuery = 'employe_info';
    } 
    // else if (loginType === 'administrator') {
    //   tableToQuery = 'administrators';
    // } 
    else {
      return res.send('Unknown loginType. Please contact support.');
    }

    console.log("TABLE TO QUERY");
    console.log(tableToQuery);
  
    const query = `SELECT * FROM ${tableToQuery} WHERE username = ? AND password = ?`;
  

    db.query(query, [email, password], (err, results) => {
        if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
          return;
        }
    
        if (results.length > 0) {
          const user = results[0];
          req.session.user = user;
          
          if (loginType === 'citizen') {
            res.redirect('/citizen-dashboard');
          } else if (loginType === 'employee') {
            res.redirect('/employee-dashboard');
          } else if (loginType === 'administrator') {
            res.redirect('/admin-dashboard');
          }
        } else {
          res.send('Login failed. Please try again.');
        }
      });
    });

// Route for the user dashboard
app.get('/dashboard', (req, res) => {
  if (req.session.user) {
    res.sendFile(__dirname + 'Dashboard/Citizen/userdashboard.html');
  } else {
    res.redirect('/login');
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const loginas = document.getElementById('loginType').value;

  if(loginas === "admin" && email === "admin" && password === "password")  {
    window.location.href = "../Dashboard/Administration/civic.html?email=" + encodeURIComponent(email);
  }

  const request = {
    email: email,
    password: password,
    loginas: loginas
  }

   var requestUrl = "http://localhost:3000/login" ;

   fetch(requestUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
      // You may need to include additional headers depending on your server requirements
    },
    body: JSON.stringify(request)
  })
    .then(response => {
      // Check if the response status is OK (200)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      // Parse the JSON data in the response
      if(loginas === "citizen") {
        console.log("THIS IS A CITIZEN");
        window.location.href = "../Dashboard/Citizen/userdasboard.html?email=" + encodeURIComponent(email);
      }
    })
    .then(data => {
      // Handle the JSON data returned from the server
      // console.log('Data from the server:', data);
      
    })
    .catch(error => {
      // Handle any errors that occurred during the fetch
      console.error('Fetch error:', error);
    });

}


