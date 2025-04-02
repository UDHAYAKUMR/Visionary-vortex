import mongoose from 'mongoose';
import Product from './models/productModel.js'; // Adjust the path as necessary
import products from './data/products.js'; // Import the product data

const uri = 'mongodb://localhost:27017/CMU'; // Your MongoDB connection string

const checkProducts = async () => {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    
    // Clear existing products
    await Product.deleteMany({});

    // Insert new products
    const productsWithUserId = products.map(product => ({
        ...product,
        user: '67e2d1b734258bfb42e0df98' // Admin User ID
    }));
    await Product.insertMany(productsWithUserId);

    console.log('Products have been added to the database:', products);
    
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

checkProducts();
