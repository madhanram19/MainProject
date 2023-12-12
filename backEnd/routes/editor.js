const Content = require('../model/contentModel');

require('dotenv').config();

var express = require('express');
var router = express.Router();

//CREATE CONTENTS
router.get('/create', async (req, res) => {
  try {
    console.log(req.body);
    const { content = 'About Us', editorData = 'test data' } = req.body;

    const existingContent = await Content.find({
      content: { $eq: content?.toLowerCase() },
    });

    if (existingContent.length > 0) {
      res.status(400).json({ message: 'Content already exists!' });
      return;
    }

    const contents = [
      { content: 'About Us', editorData: 'test data' },
      { content: 'Privacy Policy', editorData: 'test data' },
      { content: 'Terms and Conditions', editorData: 'test data' },
    ];

    contents.forEach(async (data) => {
      const newContent = new Content({
        ...data,
      });
      await newContent.save();
    });

    res.status(200).json({ message: 'Content Added Successfully!' });
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Something went wrong', error: error.message });
  }
});

//GET ALL CONTENTS
router.get('/getcontents', async (req, res) => {
  try {
    Content.find({})
      .then((data) => res.json({ data }))
      .catch((err) => res.json(err));
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Something went wrong', error: error.message });
  }
});

//GET CONTENT BY ID
router.get('/getcontent/:id', async (req, res) => {
  try {
    const ID = req.params.id;

    Content.findOne({ _id: ID })
      .then((data) => res.json({ data }))
      .catch((err) => res.json(err));
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Something went wrong', error: error.message });
  }
});

//UPDATE CONTENT
router.post('/updatecontent/:id', async (req, res) => {
  try {
    const contentId = req.params.id;
    console.log(contentId);

    const updatedContent = req.body.updatedData;
    console.log(updatedContent);

    await Content.findOneAndUpdate(
      { _id: contentId },
      {
        $set: {
          editorData: updatedContent,
        },
      },
      { new: true }
    );

    res.status(200).json({ message: 'Content updated successfully' });
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Something went wrong', error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { content, editorData } = req.body;

    const existingContent = await Content.find({
      content: { $eq: content?.toLowerCase() },
    });

    if (existingContent.length > 0) {
      res.status(400).json({ message: 'Content already exists!' });
      return;
    }

    const newContent = new Content({
      content,
      editorData,
    });
    await newContent.save();

    res.status(200).json({ message: 'Content Added Successfully!' });
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Something went wrong', error: error.message });
  }
});

module.exports = router;
