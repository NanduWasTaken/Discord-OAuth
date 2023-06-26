const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  // Access the access_token and user_profile from the session as needed
  if (!req.session.profile) {
    res.send('not logged in') 
  } else {
  const { access_token, profile } = req.session;
  
  // Handle the authenticated user and render the dashboard
  
  res.send(profile);
  }
});

module.exports = router;
