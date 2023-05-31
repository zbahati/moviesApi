const commentsModule = {
  initializeComments: (data) => {
    const commentButtons = document.querySelectorAll('.comment');

    commentButtons.forEach((button) => {
      button.addEventListener('click', (event) => {
        const popup = document.querySelector('#popup-modal');
        const movieId = button.getAttribute('data-id');
        const relatedItem = data.find((item) => item.id === parseInt(movieId));

        popup.innerHTML = '';

        const popupMarkup = `
          <div class="img">
            <div class="movies-details-section">
              <img src="${relatedItem.image.original}" alt="movies images">
              <span id="close-btn">&#10005;</span>
              <div class="summary">
                <p>
                  Name: ${relatedItem.name} &nbsp;&nbsp;&nbsp; Genres: ${relatedItem.genres} <br>
                  Country: ${relatedItem.network.country.name} &nbsp;&nbsp;&nbsp; Language: ${relatedItem.language} <br>
                  Released Date: ${relatedItem.premiered} &nbsp;&nbsp;&nbsp; Status: ${relatedItem.status}<br>
                </p>
              </div>
            </div>
            <div class="description">
                <div class="comment-count">
                <p>Comment: <span id="comment-count-${movieId}">0</span> <p>
              </div>
              <div class="added-comment">
                <div class='comment-list-style' id="comment-list-${movieId}"></div>
              </div>
            </div>
            <div class="comment-section">
              <form id="form-${movieId}">
                <input type="text" name="name" placeholder="Your Name">
                <textarea name="message" placeholder="Your Insights"></textarea>
                <button type="submit">Comment</button>
              </form>
            </div>
          </div>`;

        popup.insertAdjacentHTML('beforeend', popupMarkup);

        popup.style.display = 'block';

        const closeBtn = document.querySelector('#close-btn');
        closeBtn.addEventListener('click', () => {
          popup.style.display = 'none';
        });

        const form = document.getElementById(`form-${movieId}`);
        form.addEventListener('submit', (event) => {
          event.preventDefault();

          const formData = new FormData(form);
          const name = formData.get('name');
          const message = formData.get('message');

          const commentData = {
            item_id: relatedItem.id,
            username: name,
            comment: message,
          };

          fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/SpsK74xULIr0Fmgge82L/comments/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(commentData),
          })
            .then((response) => {
              if (response.ok) {
                console.log('Comment added successfully!');
                commentsModule.updateCommentsCount(movieId);
                commentsModule.retrieveComments(movieId);
              } else {
                throw new Error(`Failed to add comment: ${response.status}`);
              }
            })
            .catch((error) => {
              console.error('Error adding comment:', error);
            });

          form.reset();
        });

        commentsModule.retrieveComments(movieId);
        commentsModule.updateCommentsCount(movieId);
      });
    });
  },

  retrieveComments: (movieId) => {
    const commentList = document.querySelector(`#comment-list-${movieId}`);

    fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/SpsK74xULIr0Fmgge82L/comments?item_id=${movieId}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`No comments exists`);
        }
      })
      .then((data) => {
        commentList.innerHTML = '';

        if (data.length > 0) {
          data.forEach((comment) => {
            const commentMarkup = `<div class='comment-style'><b>${comment.username}:</b> ${comment.comment}</div>`;
            commentList.insertAdjacentHTML('beforeend', commentMarkup);
          });
        } else {
          commentList.textContent = 'No comments found.';
        }
      })
      .catch((error) => {
        console.error('Error retrieving comments:', error);
      });
  },

  updateCommentsCount: (movieId) => {
    const commentCount = document.querySelector(`#comment-count-${movieId}`);

    fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/SpsK74xULIr0Fmgge82L/comments?item_id=${movieId}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`Error retrieving comment count: ${response.status}`);
        }
      })
      .then((data) => {
        commentCount.textContent = data.length;
      })
      .catch((error) => {
        console.error('Error retrieving comment count:', error);
      });
  },
};

export default commentsModule;
