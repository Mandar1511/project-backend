const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['student', 'recruiter'],
    default: 'student',
    required: true
  },
  education: {
    institution: {
      type: String
    },
    graduationYear: {
      type: String
    },
    major: {
      type: String
    }
  },
  company:{
    type: String, //for recruiters
  },
  skills: [String],
  socialMedia: {
    linkedIn: {
      type: String
    },
    github: {
      type: String
    }
  },
    resume: {
    filename: {
      type: String
    },
    path: {
      type: String
    }
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
