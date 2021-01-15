const mongoose = require("mongoose");

console.log(process.argv.length);
if (process.argv.length < 3) {
  console.log("Please provide the password");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://Fullstackopen:${password}@cluster0.j9qv6.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 5) {
  const name = process.argv[3];
  const number = process.argv[4];
  const newPerson = new Person({
    name: name,
    number: number,
  });

  newPerson.save().then((result) => {
    console.log(`Successfully saved ${newPerson.name} with number ${number}`);
    mongoose.connection.close();
  });
} else {
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person);
    });
    mongoose.connection.close();
  });
}
