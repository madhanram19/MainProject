const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const nodemailer = require("nodemailer");
const randomstring = require('randomstring');
var express = require('express');
const User = require('../model/UserModel');
const Wallet = require('../model/WalletModel');
const Address = require('../model/AddressModel');
const Otp = require('../model/OtpModel');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const kycModal = require('../model/KycModel');
const BankAccountModal = require('../model/BankModel');
const contact = require('../model/contactmodel');

const {
  generateAccessToken,
  generateRefreshToken,
  authenticateUser,
} = require('../middleware');
const { log } = require('util');
var router = express.Router();
require('dotenv').config();

/* Register New User */
router.post('/register', async (req, res) => {
  const { name, email, password, otp } = req.body;
  console.log(req.body);
  const user = await Otp.findOne({ email });
  console.log(user);
  if (!user || user?.otp !== otp)
    return res.status(401).json({ message: 'Invalid Otp' });

  // const hashedPassword = await bcrypt.hash(password, 10);

  // const createUser = {
  //   name, password, email
  // }
  const newUser = new User({
    name,
    email,
    password,
  });

  const wallet = new Wallet({
    amount: 0,
    email,
  });

  const address = new Address({
    name,
    email,
  });

  try {
    await newUser.save();
    // // what if other fails,  need to update it error case later
    await wallet.save();
    await address.save();

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Error registering user' });
  }
});

// Login User
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  console.log({ user });

  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  // const isPasswordValid = await bcrypt.compare(password, user.password);

  // if (!isPasswordValid) {
  //   return res.status(401).json({ message: "Invalid username or password" });
  // }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  res.json({ id: user._id, accessToken, refreshToken });
});

// Refresh Access Token
router.post('/refresh', (req, res) => {
  const refreshToken = req.body.refreshToken;
  console.log('sdm');

  if (!refreshToken) {
    return res.status(401).json({ message: 'Invalid refresh token' });
  }

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET_KEY,
    (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid refresh token' });
      }

      const accessToken = generateAccessToken({ email: decoded.email });
      console.log(accessToken, 'accessToken');
      return res.status(200).json({ accessToken });
    }
  );
});

// Generate a random 4-digit OTP
const generateOTP = () => {
  return randomstring.generate({
    length: 4,
    charset: 'numeric',
  });
};

// Nodemailer setup
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "emailId",
//     pass: "password/app permission password",
//   },
// });

// Express route to send OTP via email
router.post('/send-otp', async (req, res) => {
  const email = req.body.email;

  const user = await Otp.findOne({ email });
  if (user?.email === email) {
    return res.status(401).json({ message: 'User Already Exists' });
  }

  // Generate OTP
  const otp = generateOTP();

  // Email configuration
  // const mailOptions = {
  //   from: process.env.NODE_MAILER_AUTH_EMAIL,
  //   to: email,
  //   subject: "Your OTP for Verification",
  //   text: `Your OTP is: ${otp}`,
  // };

  // Send the email
  // transporter.sendMail(mailOptions, async (error, info) => {
  //   if (error) {
  //     console.log({ error });
  //     return res.status(500).json({ message: "Error sending OTP via email" });
  //   }

  const updateOtp = new Otp({
    email,
    otp,
  });

  try {
    await updateOtp.save();
    return res.status(201).json({ message: 'OTP sent successfully' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Error While Sending Otp' });
  }
  // });
});

// Get User Details
router.get('/my-profile', authenticateUser, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });

    if (!user) {
      return res.status(401).json({ message: 'User Not Found' });
    }
    return res.status(201).json({ user });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: 'Unable to retrieve user data.please try again' });
  }
});

// Update User data
router.post('/update-profile', authenticateUser, async (req, res) => {
  try {
    console.log(req.body);
    const updatedUser = await User.findOneAndUpdate(
      { email: req.user.email },
      req.body,
      {
        new: true,
      }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json({
      message: 'Profile updated successfully',
      user: updatedUser,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: 'Unable to update user data.please try again' });
  }
});

// Login User
router.put('/change-password', authenticateUser, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    if (!user) {
      return res.status(401).json({ message: 'User Not Found' });
    }
    return res.status(201).json({ user });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: 'Unable to Update Password. please try again' });
  }
});
//Forget Passoword

router.post('/forgetPassword', async (req, res) => {
  // console.log(req.body);
  try {
    const { email } = req.body;
    const getUserData = await User.findOne({ email: email });
    console.log(getUserData);
    if (!getUserData) {
      return res.status(401).json({ message: 'User Not Found' });
    }
    const generateOTP = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    await User.updateOne({ email }, { $set: { 'otp.code': generateOTP } });
    const updateOtpData = await User.findOne({ email });
    res.status(200).json(updateOtpData);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
//reset password
router.post('/resetpassword', async (req, res) => {
  try {
    const { password, id } = req.body;
    // const hashPassword = await bcrypt.hash(password, 10);
    await User.updateOne({ _id: id }, { $set: { password: password } });
    res.status(200).json({ message: 'Password Updated' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal Error' });
  }
});
// New USer
router.post('/Userdetails', async (req, res) => {
  console.log(req.body);
  try {
    const { id } = req.body;
    const getUserDetails = await User.findOne({ _id: id });
    res.status(200).json({ message: 'FetchData Success', getUserDetails });
  } catch (err) {
    res.status(500).json({
      message: ' Error Generating Profile Details',
      error: err.message,
    });
  }
});

// profile Upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'public', 'images')); // Files will be stored in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Images Only!');
    }
  },
}).single('profileImg');

router.post('/Imageupload', async (req, res) => {
  upload(req, res, async (err) => {
    console.log('hii');
    if (err) {
      res
        .status(400)
        .json({ message: 'Image upload failed ...', error: err.message });
    }
    try {
      const {
        id,
        profileImg,
        Name,
        email,
        DOB,
        country,
        city,
        state,
        phoneno,
        zipCode,
      } = req.body;

      const getUserData = await User.updateOne(
        { _id: id },
        {
          $set: {
            profileImg:
              typeof profileImg === 'string'
                ? profileImg
                : path.join('images/', req.file.filename),
            name: Name,
            DOB: DOB,
            phoneNo: phoneno,
            country: country,
            city: city,
            zipCode: zipCode,
            country: country,
            state: state,
          },
        }
      );
      // console.log(getUserData);

      res.status(201).json({ message: 'Profile Updated' });
    } catch (error) {
      res.status(400).json({ message: 'Upload Failed', error: error.message });
    }
  });
});

// Change Password
router.post('/Changepassword', async (req, res) => {
  try {
    const { id } = req.body;
    const { oldPassword, newPassword } = req.body.userPassword;
    const userData = await User.findOne({ _id: id });

    if (!(userData.password === oldPassword)) {
      return res.status(404).json({ message: 'old Password Invalid' });
    }

    await User.updateOne({ _id: id }, { $set: { password: newPassword } });
    res.status(200).json({ message: 'Password Updated' });
  } catch (err) {
    res
      .status(500)
      .json({ message: ' Change Password Error', error: err.message });
  }

  // try {
  //   const { id } = req.body
  //   const { Oldpassword, NewPassword } = req.body.userPassword
  //   const userData = await User.findOne({ _id: id })
  //   const decryptPassword = await bcrypt.compare(Oldpassword, userData.password)
  //   if (!decryptPassword) {
  //     return res.status(401).json({ message: 'OldPassword is InVaild' })
  //   }
  //   const encryptPassword = await bcrypt.hash(NewPassword, 10)
  //   await User.updateOne({ _id: id }, { $set: { Password: encryptPassword } })
  //   res.status(200).json({ message: 'password Updated' })

  // } catch (err) {
  //   res.status(500).json({ message: 'Error Generating Change Password', error: err.message })
  // }
});

const storages = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'public', 'images')); // Files will be stored in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const uploads = multer({
  storage: storages,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Images Only!');
    }
  },
});

router.post('/kycupload', async (req, res) => {
  uploads.fields([{ name: 'aadharFront' }, { name: 'aadharBack' }])(
    req,
    res,
    (err) => {
      if (err) {
        return res
          .status(400)
          .json({ message: 'Please Upload Image', error: err.message });
      }
      try {
        const { aadharName, aadharNumber, selectCountry, id } = req.body;
        const errorStatus = [
          'aadharName',
          'aadharNumber',
          'selectCountry',
          'aadharFront',
          'aadharBack',
        ].map((data) => ({ field: data }));

        const kycUpdate = {
          aadharName,
          aadharNumber,
          selectCountry,
          aadharFront: path.join('images/', req.files.aadharFront[0].filename),
          aadharBack: path.join('images/', req.files.aadharBack[0].filename),
          userId: id,
          errorStatus,
        };
        kycModal
          .create(kycUpdate)
          .then((data) =>
            res.status(201).json({ message: 'kyc updated', kycDetails: data })
          )
          .catch((err) =>
            res
              .status(404)
              .json({ mesage: 'Data not Updated', error: err.message })
          );
      } catch (error) {
        res
          .status(500)
          .json({ message: 'Image upload Failed', error: error.message });
      }
    }
  );
});

router.post('/kycfetching', async (req, res) => {
  try {
    const { id } = req.body;
    const kycDetails = await kycModal.findOne({ userId: id });
    res.status(200).json({ message: 'SuccessFully Fetching Data', kycDetails });
  } catch (err) {
    res.status(500).json({
      message: 'Error Generating kycDetails Added',
      error: err.message,
    });
  }
});

router.post('/Add', async (req, res) => {
  try {
    const { id } = req.body;
    const { accountName, IFSCCode, accountNumber, selectBank, selectCountry } =
      req.body.bankDetails;

    // createAddBank Object
    const createBankAccount = {
      accountName,
      accountNumber,
      IFSCCode,
      selectBank,
      selectCountry,
      userId: id,
    };
    const bankAddDetails = await BankAccountModal.create(createBankAccount);
    res
      .status(201)
      .json({ message: 'Bank Account Details Added', bankAddDetails });
  } catch (err) {
    res.status(500).json({
      message: ' Error Generatinng Bank Account Update',
      error: err.message,
    });
  }
});

router.post('/Addfetching', async (req, res) => {
  try {
    const { id } = req.body;
    const bankDetails = await BankAccountModal.findOne({ userId: id });
    res
      .status(200)
      .json({ message: 'SuccessFully Fetching Data', bankDetails });
  } catch (err) {
    res.status(500).json({
      message: 'Error Generating kycDetails Added',
      error: err.message,
    });
  }
});
router.post('/contactus', async (req, res) => {
  try {
    const { id } = req.body;
    const { Name, email, Number, selectOption, textArea } =
      req.body.contactDetails;

    // createcontactus Object

    const createcontactus = {
      Name,
      email,
      Number,
      selectOption,
      textArea,
      userId: id,
    };
    const contactusDetails = await contact.create(createcontactus);
    res
      .status(201)
      .json({ message: 'Contact Us Details Added', contactusDetails });
  } catch (err) {
    res.status(500).json({
      message: ' Error Generatinng Contact Us Update',
      error: err.message,
    });
  }
});

module.exports = router;
