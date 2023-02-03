const express = require('express');
const router = express.Router();
const {
  loginUser,
  registerUser,
  updateTestArrived,
  updateTestScore,
  updateAttestation,
  updateTestStatus,
  preQuiz,
} = require('../Controllers/userController');

//register
router.post('/register', registerUser);

//Login
router.post('/login', loginUser);

// change test status
router.post('/testChange', updateTestArrived);

router.post('/testUpdateScore', updateTestScore);

router.post('/gotAttestation', updateAttestation);

router.post('/testStatus', updateTestStatus);

router.post('/preQuiz', preQuiz);

module.exports = router;
