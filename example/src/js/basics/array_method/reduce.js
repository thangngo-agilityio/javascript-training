// reduce() method

var courses = [
  {
    id: 1,
    name: 'Javascript',
    coin: 100,
  },
  {
    id: 2,
    name: 'Javascript',
    coin: 200,
  },
  {
    id: 3,
    name: 'Javascript',
    coin: 300,
  },
  {
    id: 4,
    name: 'Javascript',
    coin: 400,
  },
  {
    id: 5,
    name: 'Javascript',
    coin: 500,
  }
]

var totalCoin = courses.reduce((total, course) => {
  return total + course.coin
}, 0) // initial value

console.log(totalCoin);

// Flat "flatten" array from Depth array
let depthArray = [1, 2, [3, 4], 5, 6, [7, 8, 9]];

var flatArray = depthArray.reduce((flatOutput, depthItem) => {
  return flatOutput.concat(depthItem);
}, [])

console.log(flatArray);