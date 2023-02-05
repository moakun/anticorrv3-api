const User = require('../Models/User');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.TOKEN_SECRET, { expiresIn: '1d' });
};

// update test status
const updateTestStatus = async (req, res) => {
  const { userName, firstName, lastName, finishedTest, companyName } = req.body;

  try {
    await User.updateOne(
      { userName, firstName, lastName, companyName },
      { $set: { finishedTest: true } }
    );
    res
      .status(200)
      .json({ userName, firstName, lastName, companyName, finishedTest });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//update test score
const updateTestScore = async (req, res) => {
  const { userName, firstName, lastName, score, companyName } = req.body;
  try {
    await User.updateOne(
      { userName, firstName, lastName, companyName },
      { $set: { score: score } }
    );
    res.status(200).json({ userName, firstName, companyName, lastName, score });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// update test status
const updateTestArrived = async (req, res) => {
  const { userName, firstName, lastName, arrivedTest, companyName } = req.body;

  try {
    await User.updateOne(
      { userName, firstName, lastName, companyName },
      { $set: { arrivedTest: true } }
    );
    res
      .status(200)
      .json({ userName, firstName, lastName, arrivedTest, companyName });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// update attestation status
const updateAttestation = async (req, res) => {
  const { userName, firstName, lastName, gotAttestation, companyName } =
    req.body;

  try {
    await User.updateOne(
      { userName, firstName, lastName, companyName },
      { $set: { gotAttestation: true } }
    );
    res
      .status(200)
      .json({ userName, firstName, lastName, gotAttestation, companyName });
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

// question avant stage
const preQuiz = async (req, res) => {
  const {
    userName,
    firstName,
    companyName,
    lastName,
    dispositif,
    engagement,
    identification,
    formation,
    procedure,
    dispositifAlert,
    certifierISO,
    mepSystem,
    intention,
  } = req.body;

  try {
    await User.updateOne(
      { userName, firstName, lastName, companyName },
      {
        $set: {
          dispositif: dispositif,
          engagement: engagement,
          identification: identification,
          formation: formation,
          procedure: procedure,
          dispositifAlert: dispositifAlert,
          certifierISO: certifierISO,
          mepSystem: mepSystem,
          intention: intention,
        },
      }
    );
    res.status(200).json({
      userName,
      firstName,
      lastName,
      companyName,
      dispositif,
      engagement,
      identification,
      formation,
      procedure,
      dispositifAlert,
      certifierISO,
      mepSystem,
      intention,
    });
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
  preQuiz,
  updateTestArrived,
  updateTestScore,
  updateAttestation,
  updateTestStatus,
};
