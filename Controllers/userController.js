const User = require('../Models/User');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.TOKEN_SECRET, { expiresIn: '1d' });
};

// update test status
const updateTestStatus = async (req, res) => {
  const { userName, finishedTest } = req.body;

  try {
    await User.updateOne({ userName }, { $set: { finishedTest: true } });
    res.status(200).json({ userName, finishedTest });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//update test score
const updateTestScore = async (req, res) => {
  const { userName, score } = req.body;
  try {
    await User.updateOne({ userName }, { $set: { score: score } });
    res.status(200).json({ userName, score });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// update test status
const updateTestArrived = async (req, res) => {
  const { userName, arrivedTest } = req.body;

  try {
    await User.updateOne({ userName }, { $set: { arrivedTest: true } });
    res.status(200).json({ userName, arrivedTest });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// update attestation status
const updateAttestation = async (req, res) => {
  const { userName, gotAttestation } = req.body;

  try {
    await User.updateOne({ userName }, { $set: { gotAttestation: true } });
    res.status(200).json({ userName, gotAttestation });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// login
const loginUser = async (req, res) => {
  const { firstName, lastName, userName, companyName, password } = req.body;

  try {
    const user = await User.login(
      firstName,
      lastName,
      userName,
      companyName,
      password
    );
    const token = createToken(user._id);
    res.status(200).json({ firstName, lastName, userName, companyName, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// register
const registerUser = async (req, res) => {
  const { firstName, lastName, userName, companyName, password } = req.body;
  try {
    const user = await User.register(
      firstName,
      lastName,
      userName,
      companyName,
      password
    );

    //create token
    const token = createToken(user._id);

    res.status(200).json({ firstName, lastName, userName, companyName, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  loginUser,
  registerUser,
  updateTestArrived,
  updateTestScore,
  updateAttestation,
  updateTestStatus,
};
