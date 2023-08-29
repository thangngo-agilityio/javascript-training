// tổng 2 số
function sum(a, b) {
  return a + b;
}
console.log(sum(3, 2));

// show message
function showMessage() {
  console.log('Message 2');
}

showMessage();

// Expression function

let showMessage2 = function() {
  console.log('Expression function');
}

// Arrow function
let showMessage3 = () => {
  console.log('Arrow function');
}