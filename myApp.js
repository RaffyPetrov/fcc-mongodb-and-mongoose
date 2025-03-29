require('dotenv').config();
const mongoose = require("mongoose");
const { Schema } = mongoose;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

//#1 Install and setup mongoose
// const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

//#2 Create a Model
const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFoods: [String]
})

const Person = mongoose.model('Person', personSchema)

// 3. Create and Save a Record of a Model
const createAndSavePerson = (done) => {
  const person = new Person({
    name: 'Brian',
    age: 26,
    favoriteFoods: ['Rice', 'Beans', 'Oat'],
  });
  person.save((err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

// 4. Create Many Records with model.create()
const arrayOfPeople = [
  { name: 'Adam', age: 24, favoriteFoods: ['indomie noodle'] },
  { name: 'Sola', age: 36, favoriteFoods: ['roasted yam'] },
  { name: 'Colins', age: 48, favoriteFoods: ['Red wine'] },
];

var createManyPeople = function(arrayOfPeople, done) {

  Person.create(arrayOfPeople, (err, people) => {
    if (err) {
      console.log(err);
    } else {
      done(null, people);
    }
    
  });
};

// 5. Use model.find() to Search Your Database
const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, personFound) => {
    if (err) return console.log(err);
    done(null, personFound);
  });
};


// 6. Use model.findOne() to Return a Single Matching Document from Your Database
const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, singleFood) => {
    if (err) return console.log(err);
    done(null, singleFood);
  });
};

// 7. Use model.findById() to Search Your Database By _id
const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if (err) return console.log(err);
    done(null, data);
  });
};

// 8. Perform Classic Updates by Running Find, Edit, then Save
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, (err, person) => {
    if (err) return console.log(err);

    //Array.push() method to add "hamburger" to the list of the person's favoriteFoods
    person.favoriteFoods.push(foodToAdd);

    //and inside the find callback - save() the updated Person.
    person.save((err, updatedPerson) => {
      if (err) return console.log(err);
      done(null, updatedPerson);
    });
  });
};


//9. Perform New Updates on a Document Using model.findOneAndUpdate()
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    (err, updatedDoc) => {
      if (err) return console.log(err);
      done(null, updatedDoc);
    }
  );
};

//10. Delete One Document Using model.findByIdAndRemove
const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => {
    if (err) return console.log(err);
    done(null, data);
  })
 
};


// 11. Delete Many Documents with model.remove()
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  
  Person.remove({ name: nameToRemove }, (err, dataToRemove) => {
    if (err) return console.log(err);
    done(null, dataToRemove);
  });

};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
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