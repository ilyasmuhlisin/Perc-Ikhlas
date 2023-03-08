const connectDB = require("../config/db");
connectDB();

const categoryData = require("./categories");
const productData = require("./products");
const reviewData = require("./reviews");
const userData = require("./users");
const orderData = require("./orders");
const familyData = require("./families");
const offlineData = require("./offlines");

const Category = require("../models/CategoryModel");
const Product = require("../models/ProductModel");
const Review = require("../models/ReviewModel");
const User = require("../models/UserModel");
const Order = require("../models/OrderModel");
const Offline = require("../models/OfflineOrdersModel");
const Family = require("../models/FamilyModel");

const importData = async () => {
  try {
    await Category.collection.dropIndexes();
    await Product.collection.dropIndexes();

    await Category.collection.deleteMany({});
    await Product.collection.deleteMany({});
    await Review.collection.deleteMany({});
    await User.collection.deleteMany({});
    await Order.collection.deleteMany({});
    await Family.collection.deleteMany({});
    await Offline.collection.deleteMany({});

    if (process.argv[2] !== "-d") {
      // relasi / memasukan data ke review di product
      await Category.insertMany(categoryData);
      const reviews = await Review.insertMany(reviewData);
      const sampleProducts = productData.map((product) => {
        reviews.map((review) => {
          product.reviews.push(review._id);
        });
        return { ...product };
      });
      await Product.insertMany(sampleProducts);
      // const families = await Family.insertMany(familyData);
      // const sampleUsers = userData.map((user) => {
      //   families.map((family) => {
      //     user.families.push(family._id);
      //   });
      //   return { ...user };
      // });
      await User.insertMany(userData);
      await Order.insertMany(orderData);
      await Offline.insertMany(offlineData);

      console.log("Seeder data imported successfully");
      process.exit();
      return;
    }
    console.log("Seeder data deleted successfully");
    process.exit();
  } catch (error) {
    console.error("Error while proccessing seeder data", error);
    process.exit(1);
  }
};
importData();
