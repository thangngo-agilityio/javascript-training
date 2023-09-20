// Callback

Array.prototype.map2 = function(callback) {
  var output = []
  var arrLength = this.length

  for (let i = 0; i < arrLength; i++) {
    var result = callback(this[i], i);
    output.push(result);
  }
  return output
}

var courses = [
  'Javascript',
  'PHP',
  'ReactJS'
]

var htmls = courses.map2(function(course) {
  return `<h2>${course}</h2>`
})

console.log(htmls.join(''));