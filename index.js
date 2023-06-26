const express = require('express');
const session = require('express-session');
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const tenYears = 10 * 365 * 24 * 60 * 60 * 1000;
const connect = require('./db')

const app = express();
const port = 3000;

app.use(session({
  secret: 'youskkskskskkrsecrzjksksksmezmjtksjjsmsjey',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: tenYears
  }
}));

app.use('/auth', authRoutes);
app.use('/', dashboardRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

connect()
  	