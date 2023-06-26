const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  
  const { profileId } = req.session;
 
  if (!req.session.profileId) {
    res.send('not logged in') 
  } else {
  
  
  res.send(profileId);
  }
});

module.exports = router;
