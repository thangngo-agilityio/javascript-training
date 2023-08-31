// find method

var courses = [{
    id: 1,
    name: 'Javascript',
    coin: 100,
  },
  {
    id: 2,
    name: 'ReactJS',
    coin: 200,
  },
  {
    id: 3,
    name: 'PHP',
    coin: 300,
  },
  {
    id: 4,
    name: 'Python',
    coin: 400,
  },
  {
    id: 5,
    name: 'DotNet',
    coin: 500,
  }
]

function getNameCourse(arr) {
  return arr.find(item => item.name === 'Python')
}

console.log(getNameCourse(courses));