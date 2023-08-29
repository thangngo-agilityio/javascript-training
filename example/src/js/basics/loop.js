// For loop

//  Tạo số ngẫu nhiên với loop
function getRandNumbers (min, max, length) {
  let arr = [];
  for(let i = 1; i < length; i++) {
    arr[i] = Math.random() * (max - min) + min
  }
  return arr
}

// console.log(getRandNumbers(2, 3, 10));

// Tính tổng các số trong mảng
function getTotal(arr) {
  let sum = 0;
  for(let i = 0; i < arr.length; i++) {
    sum += arr[i]
  }
  return sum
}

// console.log(getTotal([1, 2, 3]));

// lấy phần tử trong mảng
let myArray = [
  'Javascript',
  'PHP',
  'Java',
  'React'
]
// for (let i = 0; i < myArray.length; i++) {
//   console.log(myArray[i]);
// }


// For/in loop
for (var key in myArray) {
  console.log(myArray[key]);
}

