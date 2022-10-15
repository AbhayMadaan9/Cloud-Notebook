// getting-started.js
const mongoose = require('moongoose');

main().catch(err => console.log(err));
main().then(()=> console.log("we are conneted to mongodb server"))
async function main() {
  await mongoose.connect('mongodb://localhost:27017/abhay',{
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}

module.exports = main()