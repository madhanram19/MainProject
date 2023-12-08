
const UserModel = require('../model/UserModel')
const speakEasy = require("@levminer/speakeasy");
const jwt = require("jsonwebtoken");
const qrCode = require("qrcode");
// Access Dotenv
require("dotenv").config();

const getTwoFactorAuthentication = async (req, res) => {
  try {
    const { id } = req.body;
    console.log(id);
    // console.log(req.body, "secret");
    const secretCode = speakEasy.generateSecret();
    await UserModel.updateOne(
      { _id: id },
      { $set: { temp_secret: secretCode } }
    );
    const twoFactorAuthData = await UserModel.findOne({ _id: id });

    console.log(twoFactorAuthData);
    // generating QrCode Img Src
    qrCode.toDataURL(
      twoFactorAuthData.temp_secret.otpauth_url,
      function (err, data) {
        if (err) {
          return res.status(404).json({ message: "Generating QrCode Error" });
        }
        res.status(200).json({
          message: "Generate TwoFactorAuth",
          twoFactorAuthData,
          qrCodeImgSrc: data,
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something Went Wrong" });
  }
};

const verifyTwoFactorAuthentication = async (req, res) => {
  try {
    const { id, token } = req.body;
    console.log(req.body);
    const getUser = await UserModel.findOne({ _id: id });

    const { base32: secret } = getUser.temp_secret;
    console.log(secret);
    // res.status(200).json({ message: 'Generate TwoFactorAuth', secretCode })
    let tokenValidates = speakEasy.totp.verify({
      secret,
      encoding: "base32",
      token,
    });

    let qrCodeVerify = speakEasy.totp.verify({
      secret: getUser.temp_secret.ascii,
      encoding: "ascii",
      token,
    });
    if (!qrCodeVerify) {
      return res.status(401).json({ message: "Authentication Invalid" });
    }
    if (!tokenValidates) {
      return res.status(401).json({ message: "Authentication Invalid Token" });
    }
    const jwtToken = jwt.sign(
      { id: getUser._id },
      process.env.ACCESS_TOKEN_SECRET_KEY,
      { expiresIn: "1h" }
    );
    await UserModel.updateOne(
      { _id: id },
      {
        $set: {
          temp_secret: null,
          secret: getUser.temp_secret,
          twoFactorAuth: true,
        },
      }
    );
    const updateUser = await UserModel.findOne({ _id: id });
    res.status(200).json({
      message: "Authentication Verified",
      twoFactorAuth: updateUser.twoFactorAuth,
      token: jwtToken,
      updateUser

    });
  } catch (error) {
    res.status(500).json({ message: "Error Generating Authencation " });
  }
};

const disableTwoFactorAuthentication = async (req, res) => {
  try {
    const { id } = req.body;
    await UserModel.updateOne(
      { _id: id },
      { $set: { secret: null, twoFactorAuth: false } }
    );
    res.status(200).json({ message: "Disabled Your Authetication" });
  } catch (error) {
    res.status(500).json({ message: "Error Disable Your Authentication" });
  }
};

module.exports = {
  getTwoFactorAuthentication,
  verifyTwoFactorAuthentication,
  disableTwoFactorAuthentication,
};
