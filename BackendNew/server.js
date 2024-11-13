const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'blabla@6969#25r87',
    database: 'dbms_project',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Define a route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.post('/signupCitizen', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const pincode = req.body.pincode;
    const address = req.body.address;
    const contactNumber = req.body.contact_number;
    const city = req.body.city;
    const gender = req.body.gender;
    const name = req.body.name;
    const aadharNumber = req.body.aadhaar_number;
    const dob = req.body.dob;

    pool.query(
    'INSERT INTO citizen_info (email, password, pincode, address, contactno, city, gender, name, aadharnumber, dob)' +  
    'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
    [email, password, pincode, address, contactNumber, city, gender, name, aadharNumber, dob], // You should hash the password before saving it
    (error, results) => {
        if (error) {
        console.error('Error saving user to database:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
        }

        res.status(200).json({ message: 'User registered successfully' });
    })
});

app.post('/loginCitizen', async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ error: 'Email, password are required' });
    }
  
    // Check if the user exists in the database
    pool.query(
      'SELECT * FROM citizen_info WHERE email = ?',
      [email],
      async (error, results) => {
        if (error) {
          console.error('Error checking user in the database:', error);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
  
        if (results.length === 0) {
          return res.status(401).json({ error: 'Invalid email or password' });
        }
  
        // Compare the provided password with the hashed password in the database
        if (password === results[0].password) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
  
        // Respond with a success message
        res.status(200).json({ message: 'Login successful' });
      }
    );
});

app.post('/signupEmployee', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const pincode = req.body.pincode;
    const address = req.body.address;
    const contactNumber = req.body.contact_number;
    const city = req.body.city;
    const gender = req.body.gender;
    const name = req.body.name;
    const aadharNumber = req.body.aadhaar_number;
    const dob = req.body.dob;

    pool.query(
    'INSERT INTO employe_info (email, password, pincode, address, contactno, city, gender, name, aadharnumber, dob)' +  
    'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
    [email, password, pincode, address, contactNumber, city, gender, name, aadharNumber, dob], // You should hash the password before saving it
    (error, results) => {
        if (error) {
        console.error('Error saving user to database:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
        }

        res.status(200).json({ message: 'User registered successfully' });
    })
});

app.post('/loginEmployee', async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ error: 'Email, password are required' });
    }
  
    // Check if the user exists in the database
    pool.query(
      'SELECT * FROM employe_info WHERE email = ?',
      [email],
      async (error, results) => {
        if (error) {
          console.error('Error checking user in the database:', error);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
  
        if (results.length === 0) {
          return res.status(401).json({ error: 'Invalid email or password' });
        }
  
        // Compare the provided password with the hashed password in the database
        if (password === results[0].password) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
  
        // Respond with a success message
        res.status(200).json({ message: 'Login successful' });
      }
    );
});

app.post('/getCitizen', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  // Check if the user exists in the database
  pool.query(
    'SELECT * FROM citizen_info WHERE email = ?',
    [email],
    async (error, results) => {
      if (error) {
        console.error('Error checking user in the database:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      if (results.length === 0) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // Respond with a success message
      res.status(200).json({ data: results[0] });
    }
  );
});

app.post('/addEmployeeGrievance', (req, res) => {
  const email = req.body.email;
  const service = req.body.service;
  const query = req.body.query;
  const phoneNumber = req.body.phoneNumber;  

  const query1 = 'SELECT COUNT(*) AS count FROM employe_grievances';

  var count;
  pool.query(query1, (err, results) => {
    if (err) {
      console.error('Error executing query: ' + err.stack);
      res.status(500).send('Error executing query');
      return;
    }

    count = results[0].count;
    count = count + 1;
    var eqid = "Eqid" + count;

    pool.query(
      'INSERT INTO employe_grievances (Eqid, gmail, services, Query, phone_number, status)' +  
      'VALUES (?, ?, ?, ?, ?, ?);',
      [eqid, email, service, query, phoneNumber, "Pending"], // You should hash the password before saving it
      (error, results) => {
          if (error) {
          console.error('Error saving user to database:', error);
          return res.status(500).json({ error: 'Internal Server Error' });
          }
    
          res.status(200).json({ message: 'Grievance registered successfully' });
      })
  });
});

app.post('/addCitizenGrievance', (req, res) => {
  const email = req.body.email;
  const service = req.body.service;
  const query = req.body.query;
  const phoneNumber = req.body.phoneNumber;  

  const query1 = 'SELECT COUNT(*) AS count FROM citizen_grievances';

  var count;
  pool.query(query1, (err, results) => {
    if (err) {
      console.error('Error executing query: ' + err.stack);
      res.status(500).send('Error executing query');
      return;
    }

    count = results[0].count;
    count = count + 1;
    var eqid = "sqid" + count;

    pool.query(
      'INSERT INTO citizen_grievances (sqid, gmail, services, Query, phone_number, status)' +  
      'VALUES (?, ?, ?, ?, ?, ?);',
      [eqid, email, service, query, phoneNumber, "Pending"], // You should hash the password before saving it
      (error, results) => {
          if (error) {
          console.error('Error saving user to database:', error);
          return res.status(500).json({ error: 'Internal Server Error' });
          }
    
          res.status(200).json({ message: 'Grievance registered successfully' });
      })
  });
});

app.post('/login', async (req, res) => {
  const { email } = req.body;
  const { password } = req.body;
  const { loginas } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  if(loginas === "citizen") {
    console.log("CITIZEN");
    pool.query(
      'SELECT * FROM citizen_info WHERE email = ? AND password = ?',
      [email, password],
      async (error, results) => {
        if (error) {
          console.error('Error checking user in the database:', error);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
  
        if (results.length === 0) {
          return res.status(401).json({ error: 'Invalid email or password' });
        }

        console.log("RESULTS");
        console.log(results);
  
        // Respond with a success message
        res.status(200).json({ data: results[0] });
      }
    );
  }
  // Check if the user exists in the database

  else if(loginas === "employee") {
      console.log("EMPLOYEE");
      pool.query(
        'SELECT * FROM citizen_info WHERE email = ? & password = ?',
        [email, password],
        async (error, results) => {
          if (error) {
            console.error('Error checking user in the database:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
          }
    
          if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
          }
    
          // Respond with a success message
          res.status(200).json({ data: results[0] });
        }
      );
  } else {
    if(email === "admin@gmail.com" && password === "password") {
      res.status(200).json({ data: {
        "admin" : "admin"
      } });
    }
  }
 
});

app.post('/tax', async (req, res) => {
  const { department } = req.body;
    pool.query(
      'SELECT * FROM citizen_taxes WHERE department = ?',
      [department],
      async (error, results) => {
        if (error) {
          console.error('Error checking user in the database:', error);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
  
        if (results.length === 0) {
          return res.status(401).json({ error: 'Invalid email or password' });
        }
        // Respond with a success message
        res.status(200).json({ data: results[0] });
      }
    );
})

app.get('/getCitizenGrievances', async (req, res) => {
  const { department } = req.body;
    pool.query(
      'SELECT * FROM citizen_grievances',
      [department],
      async (error, results) => {
        if (error) {
          console.error('Error checking user in the database:', error);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
  
        if (results.length === 0) {
          return res.status(401).json({ error: 'Invalid email or password' });
        }
        // Respond with a success message
        res.status(200).json({ data: results });
      }
    );
})

app.get('/getEmployeeGrievances', async (req, res) => {
  const { department } = req.body;
    pool.query(
      'SELECT * FROM employe_grievances',
      [department],
      async (error, results) => {
        if (error) {
          console.error('Error checking user in the database:', error);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
  
        if (results.length === 0) {
          return res.status(401).json({ error: 'Invalid email or password' });
        }
        // Respond with a success message
        res.status(200).json({ data: results });
      }
    );
})

app.get('/getBudgetTable', async (req, res) => {
    pool.query(
      'SELECT * FROM budget',
      async (error, results) => {
        if (error) {
          console.error('Error checking user in the database:', error);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
  
        if (results.length === 0) {
          return res.status(401).json({ error: 'Invalid email or password' });
        }
        // Respond with a success message
        res.status(200).json({ data: results });
      }
    );
})

app.get('/getTaxTable', async (req, res) => {
  pool.query(
    'SELECT * FROM tax',
    async (error, results) => {
      if (error) {
        console.error('Error checking user in the database:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      if (results.length === 0) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
      // Respond with a success message
      res.status(200).json({ data: results });
    }
  );
})


