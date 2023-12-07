import { faker } from "@faker-js/faker";
import dotenv from "dotenv";
import { Category } from "./models/Category";
import { Proudct } from "./models/Product";
import { User } from "./models/User";
import { Order } from "./models/Order";
import { databaseConnection } from "./config/DatabaseConnection";
import { categories } from "./data/Category";
// import { products } from "./data/Product";
import users from "./data/User";
import bcrypt from "bcrypt";

const seedData = async () => {
  dotenv.config();
  await databaseConnection();

  await Category.deleteMany();
  await Proudct.deleteMany();
  await User.deleteMany();
  await Order.deleteMany();

  const addedCategories: any[] = [];
  for (const category of categories) {
    const savedCategory = await Category.create({
      type: category.type,
      imageUrl: category.src,
    });
    addedCategories.push(savedCategory);
  }

  const addedProducts: any[] = [];
  addedCategories.forEach(async (category) => {
    for (let i = 0; i < 50; i++) {
      const product = await Proudct.create({
        categoryId: category._id,
        name: faker.commerce.productName(),
        price: 5,
        imageUrl: faker.image.imageUrl(),
        description: faker.lorem.sentence(),
      });
      addedProducts.push(product);
    }
  });

  const addedUsers: any[] = [];
  for (const user of users) {
    const savedUser = await User.create({
      fullName: user.name,
      username: user.email,
      password: await bcrypt.hash(user.password.toString(), 10),
      isAdmin: user.isAdmin,
    });

    addedUsers.push(savedUser);
  }

  const order1 = await Order.create({
    userId: addedUsers[0]._id,
    items: addedProducts.slice(0, 5).map((product) => ({
      productId: product._id,
      name: product.name,
      quantity: 2,
      price: product.price,
    })),
    shippingDetails: {
      fullName: faker.name.fullName(),
      address: faker.address.streetAddress(),
      city: faker.address.city(),
    },
    totalPrice: addedProducts
      .slice(0, 5)
      .reduce((total, product) => total + product.price, 0),
    totalQuantity: 5,
  });

  const order2 = await Order.create({
    userId: addedUsers[0]._id,
    items: addedProducts.slice(5, 10).map((product) => ({
      productId: product._id,
      name: product.name,
      quantity: 2,
      price: product.price,
    })),
    shippingDetails: {
      fullName: faker.name.fullName(),
      address: faker.address.streetAddress(),
      city: faker.address.city(),
    },
    totalPrice: addedProducts
      .slice(0, 5)
      .reduce((total, product) => total + product.price, 0),
    totalQuantity: 5,
  });
};

seedData();
