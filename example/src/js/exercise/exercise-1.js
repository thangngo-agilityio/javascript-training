const myBody = document.querySelector('body')

// Change body style so it has a font family "Arial, sans-serif"
myBody.setAttribute('style', 'font-family: Arial, sans-serif')

// Replace each of span with my infor
const nickname = document.getElementById('nickname')
nickname.innerHTML = 'Thang Ngo';
const favorites = document.getElementById('favorites')
favorites.innerHTML = 'Football';
const hometown = document.getElementById('hometown')
hometown.innerHTML = 'Da Nang';

// Iterate through each li and change the class to "list-item" and add style color red
const myDiv = document.querySelector('.exercise');
const myUl = myDiv.querySelector('ul');
const myLi = myUl.getElementsByTagName('li');

for( let i = 0; i < myLi.length; i++) {
  myLi[i].className = 'list-item';
  myLi[i].setAttribute('style', 'color: red')
}

// Create img tag and set src attribute
const myImg = document.createElement('img')
myImg.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlu-5sicFuHii8BAVf-lwWzS0D4bOJ00mHAQ&usqp=CAU';
myDiv.appendChild(myImg)