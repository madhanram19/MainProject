const express = require("express");
const web3 = require("web3");
const router = express.Router();

router.get("/", async (req, res) => {
    const rest = web3.eth.accounts.create();
    console.log(rest);
    res.json({
        accounts: rest
    })
});

module.exports = router