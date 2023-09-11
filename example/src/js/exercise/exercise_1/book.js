function book() {
  var books = [{
      title: 'The Design of EveryDay Things',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlu-5sicFuHii8BAVf-lwWzS0D4bOJ00mHAQ&usqp=CAU',
      author: 'Don Norman',
      alreadyRead: false
    },
    {
      title: 'The Most Human Human',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeH769zgHJKVhSLXxcIsN8cB_NAlKGJenHiQ&usqp=CAU',
      author: 'Brian Christian',
      alreadyRead: true
    }
  ];

  let bookLength = books.length

  // for (let i = 0; i < bookLength; i++) {
  //   let bookP = document.createElement('p')
  //   let bookDescription = document.createTextNode(books[i].title + ' by ' + books[i].author)

  //   bookP.appendChild(bookDescription)
  //   document.body.appendChild(bookP)
  // }

  let bookDiv = document.querySelector('.book-list')
  let bookList = document.createElement('ul')
  for(let i = 0; i < bookLength; i++) {
    let bookItem = document.createElement('li')
    let bookImg = document.createElement('img')
    bookImg.src = books[i].img;
    bookItem.style.display = "flex"
    bookItem.style.flexDirection = "column"
    bookItem.appendChild(bookImg);
    let bookDescription = document.createTextNode(books[i].title + ' by ' + books[i].author)
    bookItem.appendChild(bookDescription);
    
    if (books[i].alreadyRead === true) {
      bookItem.style.color = 'green';
    }
    bookList.appendChild(bookItem)
  }
  bookDiv.appendChild(bookList)
}

export default book;