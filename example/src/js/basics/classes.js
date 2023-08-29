// Classes

class Course {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
  getName() {
    return this.name;
  }

  getPrice() {
    return this.price;
  }
}

const phpCourse = new Course("php", 1000);
const jsCourse = new Course("JS", 2000);

console.log(phpCourse.getName);
console.log(jsCourse);
