import mongoose from 'mongoose';
import Product from './models/productModel.js'; // Adjust the path as necessary

const uri = 'mongodb://localhost:27017/CMU'; // Your MongoDB connection string

const verifyProducts = async () => {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    
    const products = await Product.find({});
    console.log('Products in the database:', products);
    
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

verifyProducts();
