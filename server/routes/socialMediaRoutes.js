import express from 'express';
const router = express.Router();
import SocialMedia from '../models/SocialMedia.js';
import auth from '../middleware/auth.js';

// Get all social media posts (public)
router.get('/', async (req, res) => {
  try {
    const socialMediaPosts = await SocialMedia.find({ isVisible: true })
      .sort({ date: -1 })
      .limit(req.query.limit ? parseInt(req.query.limit) : 10);
    
    res.json(socialMediaPosts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get all social media posts (admin)
router.get('/all', auth, async (req, res) => {
  try {
    const socialMediaPosts = await SocialMedia.find()
      .sort({ date: -1 });
    
    res.json(socialMediaPosts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Add new social media post
router.post('/', auth, async (req, res) => {
  const { platform, postUrl, imageUrl, content, likes, comments } = req.body;

  try {
    const newSocialMedia = new SocialMedia({
      platform,
      postUrl,
      imageUrl,
      content,
      likes: likes || 0,
      comments: comments || 0
    });

    const socialMedia = await newSocialMedia.save();
    res.json(socialMedia);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Update social media post
router.put('/:id', auth, async (req, res) => {
  const { platform, postUrl, imageUrl, content, likes, comments, isVisible } = req.body;

  // Build social media object
  const socialMediaFields = {};
  if (platform) socialMediaFields.platform = platform;
  if (postUrl) socialMediaFields.postUrl = postUrl;
  if (imageUrl) socialMediaFields.imageUrl = imageUrl;
  if (content) socialMediaFields.content = content;
  if (likes !== undefined) socialMediaFields.likes = likes;
  if (comments !== undefined) socialMediaFields.comments = comments;
  if (isVisible !== undefined) socialMediaFields.isVisible = isVisible;

  try {
    let socialMedia = await SocialMedia.findById(req.params.id);

    if (!socialMedia) return res.status(404).json({ msg: 'Social media post not found' });

    socialMedia = await SocialMedia.findByIdAndUpdate(
      req.params.id,
      { $set: socialMediaFields },
      { new: true }
    );

    res.json(socialMedia);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Delete social media post
router.delete('/:id', auth, async (req, res) => {
  try {
    let socialMedia = await SocialMedia.findById(req.params.id);

    if (!socialMedia) return res.status(404).json({ msg: 'Social media post not found' });

    await SocialMedia.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Social media post removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

export default router;
