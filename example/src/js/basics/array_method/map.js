// map() method

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
// change element of array
// let newCourse = courses.map((course, index) => {
//   return {
//     id: course.id,
//     name: `course: ${course.name}`,
//     coin: course.coin,
//     coinText: `price: ${course.coin}`,
//     index: index
//   }
// })

// console.log(newCourse);

// Split array
let newCourse = courses.map((course) => {
  return `<h2>${course.name}</h2>`;
})

console.log(newCourse.join(''));