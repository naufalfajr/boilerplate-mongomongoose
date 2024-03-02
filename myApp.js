require('dotenv').config();
let mongoose;
try {
  mongoose = require("mongoose");
} catch (e) {
  console.log(e);
}

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
let personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]
})
let Person = new mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  let naufalFajri = new Person({name: "Naufal Fajri", age: 24, favoriteFoods: ["Nasi Goreng", "Sate", "Bakso"]});
  naufalFajri.save((err, data) => {
    if (err) return console.error(err);
    done(null, data);
    console.log(data);
  });
};

// let arrayOfPeople = [
//   {name: "Cinta", age: 24, favoriteFoods: ["Nasi Pecel", "Durian", "Bakso"]},
//   {name: "Auliya Daffa", age: 23, favoriteFoods: ["Matcha", "Dimsum", "Nugget"]},
//   {name: "Rangga", age: 25, favoriteFoods: ["Bakso", "Soto", "Mie"]}
// ];
const createManyPeople = (arrayOfPeople, done) => {  
  Person.create(arrayOfPeople, (err, people) => {
    if (err) return console.error(err);
    done(null, people);
    console.log(people);
  });
};

// let personName = "Naufal Fajri";
const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
    console.log(data);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
    console.log(data);
  })
};

const findPersonById = (personId, done) => {
  Person.findById({_id: personId}, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
    console.log(data);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, pers) => {
    if (err) return console.error(err);
    pers.favoriteFoods.push(foodToAdd);
    pers.save((err, data) => {
      if (err) return console.error(err);
      done(null, data);
      console.log(data);
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
    console.log(data);
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, data) => {
    if (err) console.error(err);
    done(null ,data);
    console.log(data);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find()
  .where({favoriteFoods: foodToSearch})
  .sort({name: 'asc'})
  .limit(2)
  .select({age: 0})
  .exec((err, data) => {
    if (err) return console.error(err);
    done(null, data);
    console.log(data);
  })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
