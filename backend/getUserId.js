import mongoose from 'mongoose';
import User from './models/userModel.js'; // Adjust the path as necessary

const uri = 'mongodb://localhost:27017/CMU'; // Your MongoDB connection string

const getUserId = async () => {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    
    const user = await User.findOne({ email: 'admin@example.com' });
    if (user) {
      console.log('Admin User ID:', user._id);
    } else {
      console.log('Admin User not found.');
    }
    
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error fetching user ID:', error);
  }
};

getUserId();
