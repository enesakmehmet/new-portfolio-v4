import mongoose from 'mongoose';

const socialMediaSchema = new mongoose.Schema({
  platform: {
    type: String,
    required: true,
    enum: ['instagram', 'twitter', 'linkedin', 'github', 'facebook', 'youtube', 'other']
  },
  postUrl: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  likes: {
    type: Number,
    default: 0
  },
  comments: {
    type: Number,
    default: 0
  },
  isVisible: {
    type: Boolean,
    default: true
  }
});

export default mongoose.model('SocialMedia', socialMediaSchema);
