// Modifying Attributes

const img = document.querySelector('img')

// console.log(img.hasAttribute('src'));
// console.log(img.getAttribute('src'));
// console.log(img.removeAttribute('src'));

img.setAttribute('src', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu3EMsr-8AjBp-m_febOvDMpIQowfMaMwhDw&usqp=CAU')

console.log(img);

// Modifying Classes

// const div = document.querySelector('div');

// div.className = 'warning';

// const activeDiv = document.querySelector('.active');

// activeDiv.classList.add('hidden');
// activeDiv.classList.remove('hidden');
// activeDiv.classList.toggle('hidden')
// activeDiv.classList.replace('active', 'warning')


// Modifying Styles

const div = document.querySelector('div')

div.setAttribute('style', 'text-align: center')

div.style.height = '100px';
div.style.width = '100px';
div.style.border = '2px solid black'

div.style.borderRadius = '50%';
div.style.display = 'flex';
div.style.justifyContent = 'center';
div.style.alignItems = 'center';