import './style.css';



import getImage from './modules/getmovies.js';
import likesModule from './modules/likes.js';
import commentsModule from './modules/comments.js';

getImage();

// Call the handleLike function from the likesModule
const thumbsUpButtons = document.querySelectorAll('.thumbsUpBtn');
thumbsUpButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const itemId = button.parentElement.parentElement.querySelector('.comment').getAttribute('data-id');
    likesModule.handleLike(itemId);
  });
});

// Call the initializeComments function from the commentsModule
commentsModule.initializeComments();