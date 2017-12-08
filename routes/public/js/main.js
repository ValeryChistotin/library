// =============================
//   Load Books
// =============================

var booksElement = document.getElementById('books');

fetch('file', {
    method: 'GET'
}).then(function (response) {
    return response.json();
  }).then(function (books) {
      books.books.forEach(function(item){
        var img = document.createElement('img'),
          title = document.createElement('h4'),
          author = document.createElement('p');

        title.className = 'title';

        img.src = item.cover;
        title.textContent = item.title;
        author.textContent = item.author;

        var bookWrapper = document.createElement('div'),
          bookAboutWrapper = document.createElement('div'),
          rightsWrapper = document.createElement('div');

        bookWrapper.className = 'book';
        bookAboutWrapper.className = 'book-about';
        rightsWrapper.className = 'rights';

        // ===============
        //   Rate
        // ===============

        var ratingWrapper = document.createElement('div');
        ratingWrapper.className = 'rating';

        for(var i = 5; i--;){
          var ratingItemWrapper = document.createElement('label');
          ratingItemWrapper.className = 'rating-item fa fa-star';
          ratingItemWrapper.setAttribute('data-rate', i + 1);
          ratingWrapper.appendChild(ratingItemWrapper);
        }

        rightsWrapper.appendChild(title);
        rightsWrapper.appendChild(author);
        bookAboutWrapper.appendChild(rightsWrapper);
        bookAboutWrapper.appendChild(ratingWrapper);
        bookWrapper.appendChild(img);
        bookWrapper.appendChild(bookAboutWrapper);
        booksElement.appendChild(bookWrapper);
      })
    });

// =============================
//   Search
// =============================

function currentWidth(){
  window.addEventListener('resize', function(){
    containerWidth = container.getBoundingClientRect().width;
  })
  return containerWidth;
}

var books = document.getElementById('books'),
  search = document.getElementById('search'),
  container = document.querySelector('.container'),
  containerWidth = container.getBoundingClientRect().width;

var titles = document.getElementsByClassName('rights');
search.addEventListener('input', function(e){
  newNotification('Search');

  var booksCount = 0;
  Array.from(titles).forEach(function(item){
    var itemName = item.firstElementChild.textContent,
      bookWidth = 216;
    if(~itemName.indexOf(e.target.value)){
      containerWidth = currentWidth();
      booksCount++;
      books.style.width = (bookWidth * booksCount) <= containerWidth && bookWidth * booksCount + 'px';
      item.parentNode.parentNode.style.display = 'flex';
    } else item.parentNode.parentNode.style.display = 'none';
  })
})

// =============================
//   Rate
// =============================

setTimeout(function(){
  var rateContainer = document.getElementsByClassName('rating');
  Array.from(rateContainer).forEach(function(mainRating){
    mainRating.addEventListener('click', function(e){
      newNotification('Rate');
      e.preventDefault();

      if(!e.target.classList.contains('active')){
        Array.from(mainRating.children).forEach(function(item){
          item.classList.remove('active');
        });
        e.target.classList.add('active');
      }
    })
  })
}, 1000)

// =============================
//   Most Popular
// =============================

var mostPopular = document.getElementById('popular'),
  childrenItems = document.getElementsByClassName('rating-item');

mostPopular.addEventListener('click', function(e){
  newNotification('Most Popular');
  e.preventDefault();

  console.log(containerWidth);
  var bookWidth = 216,
    booksCount = 0;

  Array.from(childrenItems).forEach(function(item){
    if(item.classList.contains('active') && item.getAttribute('data-rate') == 5){
      booksCount++;
      item.parentNode.classList.add('on');
      item.parentNode.parentNode.parentNode.style.display = 'flex';
      books.style.width = (bookWidth * booksCount) <= containerWidth && bookWidth * booksCount + 'px';
    } else if(!item.parentNode.classList.contains('on')) item.parentNode.parentNode.parentNode.style.display = 'none'
  })
})

// =============================
//   New Book
// =============================

var open = document.getElementById('open');
open.addEventListener('click', function(e){
  newNotification('New Book');
  e.preventDefault();

  var modal = document.getElementById('modal'),
    scrollHeight = Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight);

  modal.style.height = scrollHeight + 'px';

  modal.parentNode.classList.add('open');
  modal.parentNode.style.zIndex = 1;
  setTimeout(function(){
    modal.classList.add('open');
  }, 350);

  document.body.addEventListener('click', function(e){
    var target = e.target;
    if(target.classList.contains('open')){
      modal.classList.remove('open');
      modal.parentNode.classList.remove('open');
      setTimeout(function(){
        modal.parentNode.style.zIndex = -1;
      }, 400);
    }
  })
})

var close = document.getElementById('close');
close.addEventListener('click', function(e){
  e.preventDefault();

  var modal = document.getElementById('modal');

  modal.classList.remove('open');
  modal.parentNode.classList.remove('open');
  setTimeout(function(){
    modal.parentNode.style.zIndex = -1;
  }, 400);
})

// =============================
//   Notifications
// =============================

var lastAction = '',
  textCount = 2;

function newNotification(action){
  var notifications = document.getElementById('notifications'),
    notificationWrapper = document.createElement('div'),
    actionWrapper = document.createElement('span'),
    noteWrapper = document.createElement('div'),
    icon = document.createElement('i'),
    note = document.createElement('p'),
    time = document.createElement('p'),
    date = new Date().getTime(),
    interval,
    timePassed,
    minutes = 0,
    counter = document.createElement('div');

  counter.className = 'notifications-count';

  if(lastAction === action){
    lastAction = action;
    counter.textContent = textCount++;
    notifications.appendChild(counter);
    if(textCount > 3) notifications.removeChild(notifications.children[notifications.children.length - 2]);
  } else {
    textCount = 2;
    lastAction = action;

    notificationWrapper.className = 'notification';
    noteWrapper.className = 'note';
    time.className = 'time';
    icon.className = 'fa fa-clock-o';
    actionWrapper.textContent = action;

    note.appendChild(actionWrapper);
    note.appendChild(document.createTextNode(' Action'));
    interval = setInterval(function(){
      timePassed = Math.round((new Date().getTime() - date) / 1000);
      if(timePassed >= 60){
        time.textContent = ++minutes + ' minutes ago';
        date = new Date().getTime();
      } else if(!minutes) time.textContent = timePassed + ' seconds ago';
    }, 1000);

    noteWrapper.appendChild(note);
    noteWrapper.appendChild(time);
    notificationWrapper.appendChild(icon);
    notificationWrapper.appendChild(noteWrapper);
    notifications.appendChild(notificationWrapper);
  }
}