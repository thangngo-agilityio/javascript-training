// Inline Event Handler Attribute

// const changeText = () => {
//   const p = document.querySelector('p');

//   p.textContent = "I changed because of an inline event handler"
// }


// Event handler properties

// const changeText = () => {
//   const p = document.querySelector('p');

//   p.textContent = "I changed because of an event handler property";
// }

// const button = document.querySelector('button');
// button.onclick = changeText

// Event handler properties

const changeText = () => {
  const p = document.querySelector('p');

  p.textContent = "I changed because of an event listener"
}

const button = document.querySelector('button');
button.addEventListener('click', changeText)