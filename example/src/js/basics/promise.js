// Promise

const users = [{
    id: 1,
    name: 'Thang Ngo'
  },
  {
    id: 2,
    name: 'Linh Le'
  },
  {
    id: 3,
    name: 'Thanh Loc'
  },
  {
    id: 4,
    name: 'Tuan Loc'
  },
]

const comments = [{
    id: 1,
    user_id: 1,
    content: 'learn JS',
  },
  {
    id: 2,
    user_id: 2,
    content: 'Learn promise'
  }
]

function getComments() {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(comments)
    }, 1000)
  })
}

function getUsersByIds(userIds) {
  return new Promise(function (resolve) {
    var result = users.filter(function (user) {
      return userIds.includes(user.id)
    });
    setTimeout(function () {
      resolve(result)
    }, 1000)
  }, 1000)
}

getComments()
  .then(function (comments) {
    var userIds = comments.map(function (comment) {
      return comment.user_id;
    });

    return getUsersByIds(userIds).then(function (users) {
      return {
        users: users,
        comments: comments
      }
    })
  })
  .then(function (data) {
    var commentBlock = document.getElementById('comment_block');

    var html = '';

    data.comments.forEach(comment => {
      var user = data.users.find(function (user) {
        return user.id === comment.user_id;
      });
      html += `<li>${user.name}: ${comment.content}</li>`;
    });

    commentBlock.innerHTML = html;
  })