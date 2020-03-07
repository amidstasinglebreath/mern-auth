const express = require('express');
const router = express.Router();
const Messages = require("../models/Messages");

const queryNLP = require("./NLPAPI");

//get request from the root route
router.get('/', (req, res) => {
    res.send('Server is running...');
});

router.get("/api/chat", (req, res) => {
    console.log("api/chat");
  Messages.find({})
    .then(msg => {
      res.json(msg);
      console.log(res.json());
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.get("/api/nlp", (req, res) => {
    queryNLP(req.query.chat)
    .then(ans => {
        console.log(ans);
        res.json(ans);
    })
})

module.exports = router;