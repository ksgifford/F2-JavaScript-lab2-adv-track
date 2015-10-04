'use strict';

// LAB 2: SORTING AND CAMPY SCI-FI

// Welcome to Lab 2 =)

// Be sure to read all the comments!

// All of the instructions are inline with the assignment below.
// Look for the word TODO in comments.  Each TODO will have a
// description of what is required.

// To run this file (in the terminal) use: node lab2.js

//*********************************************************
// SETUP
//*********************************************************

// We're going to use this special assert method again to
// test our code
function assert(expression, failureMessage) {
  if (!expression) {
    console.log('assertion failure: ', failureMessage);
  }
}

//*********************************************************
// PROBLEM 1: The Blob. 20 points
//*********************************************************

/* Dowington, PA had 1000 citizens on the night the blob escaped
 its meteorite. At first, the blob could only find and consume
 Pennsylvanians at a rate of 1/hour. However, each time it digested
 someone, it became faster and stronger: adding to its consumption
 rate by 1 person/hour.

    for the...      | starting rate of | persons consumed |
                    |  consumption     |    that hour     |
--------------------|------------------|------------------|
    first hour      |    1/hour        |        1         |
    second hour     |    2/hour        |        2         |
    third hour      |    3/hour        |        3         |
    fourth hour     |    4/hour        |        4         |

 TODO: First, make a constructor function, called Blob, that makes blobs.

 TODO: Next, create an instance of Blob named blob.

 TODO: Then, use a loop to calculate how long it took the blob to finish
 with Dowington.
*/
function Blob() {
  this.oozedPerHour = 1;
  this.totalConsumed = 0;
  this.hoursOozed = 0;
}

var blob = new Blob();

while (blob.totalConsumed < 1000) {
  blob.totalConsumed += blob.oozedPerHour;
  blob.hoursOozed++;
  blob.oozedPerHour++;
}

var hoursSpentInDowington; // TODO: assign me the value of the
                           // above calculation (how long it took
                           // the blob to eat Dowington)
hoursSpentInDowington = blob.hoursOozed;

// Now, write a method that takes a population for an arbitrary
// town, and the starting consumption rate, and returns the number
// of hours the blob needs to ooze its way through that town.

Blob.prototype.hoursToOoze = function(population, peoplePerHour) {
  // TODO: implement me based on the instructions above.
  // Be sure to then assign me to the Blob's prototype.
  var townPop = population;
  var oozedPerHour = peoplePerHour;
  var peopleOozed = 0;
  var hoursOozed = 0;

  while (peopleOozed < townPop) {
    peopleOozed += oozedPerHour;
    hoursOozed++;
    oozedPerHour++;
  }
  return hoursOozed;
};

assert(blob.hoursToOoze(0, 1) === 0, 'no people means no time needed.');
assert(blob.hoursToOoze(1000, 1) === hoursSpentInDowington,
  'hoursSpentInDowington should match hoursToOoze\'s result for 1000');

// TODO: write three more assertions like the two above, testing out
// the hoursToOoze method.

assert(blob.hoursToOoze(995, 1) === hoursSpentInDowington,
  'hoursSpentInDowington should match the result for 995. The blob can ooze 1000 people in the same number of hours as 995.');
assert(blob.hoursToOoze(100, 25) === 4,
  'It\'s a small town, and this blob is fast.');
assert(blob.hoursToOoze(1000, 2) === hoursSpentInDowington - 1,
  'If the blob can ooze one additional person per hour to start, it can finish an hour earlier.');

//*********************************************************
// PROBLEM 2: Universal Translator. 20 points
//*********************************************************

var hello = {
  klingon: 'nuqneH',  // home planet is Qo'noS
  romulan: 'Jolan\'tru', // home planet is Romulus
  'federation standard': 'hello' // home planet is Earth
};

// TODO: define a constructor that creates objects to represent
// sentient beings. They have a home planet, a language that they
// speak, and method (that you'll place on the prototype) called
// sayHello.

function SentientBeing(planet, language) {
  // TODO: specify a home planet and a language
  // you'll need to add parameters to this constructor
  this.planet = planet;
  this.language = language;
}

// sb is a SentientBeing object
SentientBeing.prototype.sayHello = function(sb) {
    // TODO: say hello prints out (console.log's) hello in the
    // language of the speaker, but returns it in the language
    // of the listener (the sb parameter above).
    // use the 'hello' object at the beginning of this exercise
    // to do the translating
    console.log(hello[this.language]);
    return hello[sb.language];

    //TODO: put this on the SentientBeing prototype
  };

// TODO: create three subclasses of SentientBeing, one for each
// species above (Klingon, Human, Romulan).
function Human() {
  this.language = 'federation standard';
}
Human.prototype = new SentientBeing();

function Klingon() {
  this.language = 'klingon';
}
Klingon.prototype = new SentientBeing();

function Romulan() {
  this.language = 'romulan';
}
Romulan.prototype = new SentientBeing();

assert((new Human()).sayHello(new Klingon()) === 'nuqneH',
  'the klingon should hear nuqneH');

// TODO: write five more assertions, to complete all the possible
// greetings between the three types of sentient beings you created above.
assert((new Human()).sayHello(new Romulan()) === 'Jolan\'tru',
  'the romulan should hear Jolan\'tru');
assert((new Romulan()).sayHello(new Klingon()) === 'nuqneH',
  'the klingon should hear nuqneH');
assert((new Romulan()).sayHello(new Human()) === 'hello',
  'the human should hear hello');
assert((new Klingon()).sayHello(new Human()) === 'hello',
  'the human should hear hello');
assert((new Klingon()).sayHello(new Romulan()) === 'Jolan\'tru',
  'the romulan should hear Jolan\'tru');

//*********************************************************
// PROBLEM 3: Sorting. 20 points.
//
// Implement the following functions. Write at least 2
// assertions for each one (the assertions are how you
// will test your code)
//*********************************************************

function lastLetterSort(stringArray) {
  function byLastLetter(a, b) {
    //TODO: implement me. sort the strings in alphabetical
    // order using their last letter
    // Read this about how the sort function works:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    // this byLastLetter function is a "compare function"
    // And check out the "comparing strings" section  here:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
    if ((a[a.length - 1]) < (b[b.length - 1])) {
      return -1;
    } else if ((a[a.length - 1]) > (b[b.length - 1])) {
      return 1;
    } else {
      return 0;
    }
  }
  stringArray.sort(byLastLetter);
}

var strArray01 = ['Georgia', 'Ox', 'Xerxes', 'Mississippi', 'Fubar'];
var strArray02 = ['Anna', 'Bobby', 'Charlie', 'Daniel', 'Erasmus'];
lastLetterSort(strArray01);
lastLetterSort(strArray02);

assert(strArray01.join() === 'Georgia,Mississippi,Fubar,Xerxes,Ox',
'The function is not sorting properly by last letter.');
assert(strArray02.join() === 'Anna,Charlie,Daniel,Erasmus,Bobby',
'The function is not sorting properly by last letter.');

function sumArray(numberArray) {
  var sum = 0;
  // TODO: implement me using forEach
  function arraySum(value) {
    sum += value;
  }
  numberArray.forEach(arraySum);
  return sum;
}

assert(sumArray([1, 2, 3, 4, 5]) === 15,
  'The function should return 15.');
assert(sumArray([5, 10, 0, 0, 20]) === 35,
  'The function should return 35.');

function sumSort(arrayOfArrays) {
  arrayOfArrays.sort(function(a, b) {
    // TODO: implement me using sumArray
    //  order the arrays based on the sum of the numbers
    //  inside each array
    return sumArray(a) - sumArray(b);
  });
}

var multiArray01 = [[0, 1, 3, 150], [1, 5, 10], [5, 10, 50]];
var multiArray02 = [[1, 11, 1000], [100, 5], [10, 2, 1]];
sumSort(multiArray01);
sumSort(multiArray02);

assert(multiArray01.join(' | ') === '1,5,10 | 5,10,50 | 0,1,3,150',
  'The function is not sorting the nested arrays properly.');
assert(multiArray02.join(' | ') === '10,2,1 | 100,5 | 1,11,1000',
  'The function is not sorting the nested arrays properly.');

//*********************************************************
// PROBLEM 4: Cleanup: 10 points
// Makes sure this file passes jshint and jscs
//
// ./node_modules/.bin/grunt jshint
// ./node_modules/.bin/grunt jscs
//*********************************************************
