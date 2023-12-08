const adminschema = require('../modelsadmin/adminschema')
const jwt = require('jsonwebtoken');
const speakEasy = require('@levminer/speakeasy')
const bcrypt = require('bcrypt')
const qrCode = require('qrcode')

router.post('/adminlogin', async (req, res) => {
    const { email, password, pattern } = req.body;
    const loginAdmin = await adminschema.findOne({
        email: email,
    });
    // console.log(loginAdmin.authVerify);
    if (!loginAdmin) res.status(404).json({ message: "Please enter Correct Email" });
    const patternverify = JSON.stringify(pattern);
    try {
        const decodedPwd = await bcrypt.compare(password, loginAdmin.password)
        if (!decodedPwd) {
            return res.status(404).json({ message: "please enter correct password" });
        } else if (loginAdmin.pattern !== patternverify) {
            return res.status(404).json({ message: "please enter correct pattern" });
        } else {
            const adminId = loginAdmin._id
            const token = jwt.sign({ adminId: loginAdmin._id }, 'secretKey', { expiresIn: "1h" });
            return res.status(200).json({
                message: `Admin Login sucesssfully 
       `, adminId, token, authVerify: loginAdmin.authVerify
            });
        }
    } catch (error) {
        console.log(error, 'adminlogin error');
    }
});

router.post('/adminlogin/twoFactorGetCode', async (req, res) => {

    try {
        const { id } = req.body
        console.log(id)
        // checking Already Verified User
        const secretCode = speakEasy.generateSecret()

        await adminschema.updateOne({ _id: id }, { $set: { temp_secret: secretCode } })
        const twoFactorAuthData = await adminschema.findOne({ _id: id })

        // generating QrCode Img Src
        qrCode.toDataURL(twoFactorAuthData.temp_secret.otpauth_url, function (err, data) {
            if (err) {
                return res.status(404).json({ message: 'Generating QrCode Error' })
            }
            res.status(200).json({ message: 'Generate TwoFactorAuth', authCode: secretCode.base32, qrCodeImgSrc: data, twoFactorAuthData })
        })

    } catch (error) {
        res.status(500).json({ message: 'Error Generating TwoFactor Secret', error: error.message })
    }
});


router.post('/adminlogin/twoFactorVerify', async (req, res) => {
        try {
            const { id, token } = req.body
            console.log(id, token);
            const getUser = await adminschema.findOne({ _id: id })
            const { base32: secret } = getUser.temp_secret

            let tokenValidates = speakEasy.totp.verify({
                secret,
                encoding: "base32",
                token,
            })

            let qrCodeVerify = speakEasy.totp.verify({
                secret: getUser.temp_secret.ascii,
                encoding: 'ascii',
                token
            })
            if (!qrCodeVerify) {
                return res.status(401).json({ message: 'Authentication Invalid' })
            }
            if (!tokenValidates) {
                return res.status(401).json({ message: 'Authentication Invalid Token' })
            }

            await adminschema.updateOne({ _id: id }, { $set: { temp_secret: null, secret: getUser.temp_secret, authVerify: true } })
            const updateUser = await adminschema.findOne({ _id: id })
            res.status(200).json({ message: 'Authentication Verified', twoFactorAuth: updateUser.twoFactorAuth, })

        } catch (err) {
            res.status(500).json({ message: 'Error Generating Authencation verify ', error: err.message })
        }
});
    
router.post('/adminlogin/disableTwoFactor', async (req, res) => {
    try {
        const { id } = req.body
        await adminschema.updateOne({ _id: id }, { $set: { secret: null, authVerify: false } })
        res.status(200).json({ message: 'Disabled Your Authetication' })

    } catch (error) {
        res.status(500).json({ message: 'Error Disable Your Authentication', error: error.message })
    }
});


router.post('/changepassword', async (req, res) => {


    const { oldPassword, newPassword } = req.body.data
    const { id } = req.body
    const loginexists = await adminschema.findOne({ _id: id })
    const adminpswdecrypt = await bcrypt.compare(oldPassword, loginexists.password)
    const newpassworddata = await bcrypt.compare(newPassword, loginexists.password)

    try {
        if (!adminpswdecrypt) {
            return res.status(401).json({ message: 'password mis-match' })
        }
        else if (newpassworddata) {
            return res.status(401).json({ message: 'both old and new password same!' })
        }
        else {
            const encryptnewpassword = await bcrypt.hash(newPassword, 10)
            await adminschema.updateOne({ _id: id }, {
                $set: { password: encryptnewpassword }
            })
            return res.status(200).json({ message: 'Admin Password changed sucessfully!' });
        }
    }

    catch (error) {
        console.error(error.message);
        res.status(500).send('network error');
    }

});

router.post('/oldPattern', async (req, res) => {
    const pattern = JSON.stringify(req.body.oldpattern);
    try {
        const handleOldPassword = await adminschema.findOne({
            _id: req.body.adminId
        })
        if (pattern === handleOldPassword.pattern) {
            return res.status(200).json({ message: 'pattern valid successfully' })
        }
        else {
            return res.status(401).json({ message: ' invalid pattern' })
        }
    }
    catch (error) {
        console.log(error, 'admin changepattern error');
    }
});

router.post('/newPattern', async (req, res) => {
    // console.log(req.body);
    const { newpattern, adminId } = req.body;
    const pattern = JSON.stringify(newpattern);

    try {
        const exisistPattern = await adminschema.findOne({
            _id: adminId,
        });

        if (pattern === exisistPattern.pattern) {
            return res.status(409).json({ message: "Already exisist Pattern " });
        }
        await adminschema.updateOne({ _id: adminId },
            { $set: { pattern: pattern } });
        res.status(200).json({ message: "NewPattern Updated sucessfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

router.post('/forgetPassword/verifyEmail', async(req, res) => {
    // console.log(req.body);
    try {
        const { email } = req.body
        const adminData = await adminschema.findOne({ email })
        if (!adminData) {
            return res.status(401).json({ message: 'User Not Found' })
        }
        res.status(200).json({ message: 'Email Verified', adminData })
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error', error: err.message })
    }

});

router.post('/login/loginTwoFactorVerify', async (req, res) => {
    // console.log(req.body);
    try {
        const { id, token } = req.body
        console.log(id, token);
        const getUser = await adminschema.findOne({ _id: id })

        let tokenValidates = speakEasy.totp.verify({
            secret: getUser.secret.base32,
            encoding: "base32",
            token,
        })

        let qrCodeVerify = speakEasy.totp.verify({
            secret: getUser.secret.ascii,
            encoding: 'ascii',
            token
        })
        if (!qrCodeVerify) {
            return res.status(401).json({ message: 'Authentication Invalid' })
        }
        if (!tokenValidates) {
            return res.status(401).json({ message: 'Authentication Invalid Token' })
        }
        res.status(200).json({ message: 'Authentication Verified', })

    } catch (err) {
        res.status(500).json({ message: 'Error Generating Authencation verify ', error: err.message })
    }
});

router.post('/setpassword', async (req, res) => {
    // console.log(req.body.password);
    try {
        const { password, id } = req.body
        const changePassword = await bcrypt.hash(password, 10)
        await adminschema.updateOne({ _id: id }, { $set: { password: changePassword } })
        res.status(200).json({ message: 'Password Updated' })
    } catch (err) {
        res.status(500).json({ message: "Internal Error", error: err.message })
    }
});

router.post('/setpattern', async (req, res) => {
    const { newpattern, id } = req.body;
    const patt = JSON.stringify(newpattern);

    try {
        const exisistPattern = await adminschema.findOne({
            _id: id,
        });

        if (patt === exisistPattern.pattern) {
            return res.status(409).json({ message: "Already exisistPattern " });
        }
        await adminschema.updateOne({ _id: id }, { $set: { pattern: patt } });
        res.status(200).json({ message: "NewPattern Updated" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});