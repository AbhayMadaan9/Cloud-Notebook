// getting-started.js
const mongoose = require('mongoose');


async function main() {
  await mongoose.connect('mongodb://localhost:27017/Notebook')
  .catch(err => console.log(err))
  .then(()=> console.log("we are conneted to mongodb server"))

  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}

module.exports = main()