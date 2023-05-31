
const getComment = () => {
  const commentButtons = document.querySelectorAll('.comment');

  commentButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const popup = document.querySelector('#popup-modal');
      const movieId = button.getAttribute('data-id');
      const relatedItem = data.find((item) => item.id === parseInt(movieId));

      // Clear popup content
      popup.innerHTML = '';

      // Create popup markup
      const popupMarkup = `
        <div class="img">
          <div class="movies-details-section">
            <img src="${relatedItem.image.original}" alt="movies images">
            <span id="close-btn">&#10005;</span>
            <div class="summary">
              <p>
                Name: ${relatedItem.name} &nbsp;&nbsp;&nbsp; Genres: ${relatedItem.genres} <br>
                Country: ${relatedItem.network.country.name} &nbsp;&nbsp;&nbsp; Language: ${relatedItem.language} <br>
                Released Date : ${relatedItem.premiered} &nbsp;&nbsp;&nbsp; Status: ${relatedItem.status}<br>
              </p>
            </div>
          </div>
          <div class="description">
            <div class="added-comment">
              <p>Name : Bahati</p>
              <p>Comments : This is the comments</p>
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

      // Append popup markup to the popup container
      popup.insertAdjacentHTML('beforeend', popupMarkup);

      // Display popup
      popup.style.display = 'block';

      // Close popup when close button is clicked
      const closeBtn = document.querySelector('#close-btn');
      closeBtn.addEventListener('click', () => {
        popup.style.display = 'none';
      });

      // Handle form submission
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
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            // Handle the response data as needed
          })
          .catch((error) => {
            console.error('Error posting comment:', error);
          });
      });
    });
  });
};

getComment();