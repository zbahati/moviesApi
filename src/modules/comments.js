const getComments = async (movieId) => {
  try {
    const response = await fetch(
      `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/SpsK74xULIr0Fmgge82L/comments?item_id=${movieId}`,
    );
    const comments = await response.json();

    const commentList = document.getElementById(`comment-list-${movieId}`);
    if (commentList) {
      commentList.innerHTML = '';

      if (comments.length === 0) {
        const noCommentMarkup = '<p>No comments yet.</p>';
        commentList.insertAdjacentHTML('beforeend', noCommentMarkup);
      } else {
        comments.forEach((comment) => {
          const markup = `
            <div class="comment">
              <span class="comment-username">${comment.username}: </span>
              <span class="comment-message">${comment.comment}</span>
            </div>`;

          commentList.insertAdjacentHTML('beforeend', markup);
        });
      }
    } else {
      console.error('Comment list element not found');
    }
  } catch (error) {
    console.error('Error fetching comments:', error);
  }
};

const getCommentCount = async (movieId) => {
  try {
    const response = await fetch(
      `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/SpsK74xULIr0Fmgge82L/comments?item_id=${movieId}`,
    );
    const comments = await response.json();

    const commentCount = document.getElementById(`comment-count-${movieId}`);
    if (commentCount) {
      commentCount.textContent = comments.length;
    } else {
      console.error('Comment count element not found');
    }
  } catch (error) {
    console.error('Error fetching comment count:', error);
  }
};
const initializeComments = () => {
  const commentButtons = document.querySelectorAll('.comment');
  commentButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const movieId = button.getAttribute('data-id');
      getComments(movieId);
      getCommentCount(movieId);
    });
  });
};

module.exports = { initializeComments, getComments, getCommentCount };