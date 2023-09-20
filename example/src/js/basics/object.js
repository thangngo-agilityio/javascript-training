// Object
var emailKey = 'email'

var myInfo = {
  name: 'Thang ngo',
  age: 24,
  address: 'Da Nang, VN',
  [emailKey]: 'thangngo@asnet.com.vn',
  getName: function () {
    return this.name
  }
  // Function --> Phương thức / method
  // Other --> Thuộc tính / property
}

// delete myInfo.age
// delete myInfo.address

// console.log(myInfo.getName);

// Object constructor

function User(firstName, lastName, avatar) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.avatar = avatar;

  this.getName = function () {
    return `${this.firstName} ${this.lastName}`
  }
}

let author = new User('Thang', 'Ngo', 'Avatar');

let user = new User('Linh', 'Le', 'Avatar')

// console.log(author.getName());
// console.log(user.getName());

// object prototype

User.prototype.className = 'Asnet';
User.prototype.getClassName = function() {
  return this.className
}

console.log(user.getClassName());