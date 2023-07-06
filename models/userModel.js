const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
  },
  appliedPositions: [{
    jobs: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    }, 
    appliedAt:{
      type: Date,
      default: Date.now()
    }
  }
  ],
});

userSchema.methods.matchPassword = async function (entered){
  return await bcrypt.compare(entered,this.password);
}

userSchema.pre("save",async function(next){
  if(!this.isModified){
    next();
  }
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password,salt);
});


const User = mongoose.model('User', userSchema);

module.exports = User;
