// const express = require("express");
// const multer = require("multer");
// const { authenticateUser } = require("../middleware");
// const User = require("../model/UserModel");
// const router = express.Router();
// require("dotenv").config();

// const storage = multer.diskStorage({
//     destination: "./upload",
//     filename: function (req, file, cb) {
//         console.log({ file });
//         return cb(null, file.originalname);
//     },
// });

// var upload = multer({ storage: storage });

// router.post("/", upload.array("images", 2), async (req, res) => {
//     console.log(req.body, req.files);
//     try {
//         const userId = req.body.userId;
//         // const { name, aadhar, dob, frontProof, backProof } = req.body.kycDetails;

//         // console.log(req.file);

//         const result = await User.findByIdAndUpdate(
//             { _id: userId },
//             {
//                 $set: {
//                     "kyc.aadhaar": aadhar,
//                     "kyc.name": name,
//                     "kyc.dob": dob,
//                     "kyc.frontProof": path.join("uploads/", frontProof.filename),
//                     "kyc.backProof": path.join("uploads/", backProof.filename),
//                     "kyc.isApproved": false,
//                 },
//             },
//             { new: true }
//         );

//         if (result) {
//             res.status(200).json({
//                 message: "KYC details added/updated successfully",
//                 data: result,
//             });
//         } else {
//             res.status(404).json({ message: "User not found" });
//         }
//     } catch (error) {
//         console.log(error);
//         return res
//             .status(400)
//             .json({ message: "Registration failed", error: error.message });
//     }
// });

// module.exports = router;