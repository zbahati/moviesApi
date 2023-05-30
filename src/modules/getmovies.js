const getImage = () => {

  
  const imageContainer = document.querySelector('.movies-banners');
  fetch('https://api.tvmaze.com/shows?page=2')
    .then((response) => response.json())
    .then((data) => {
      data.forEach((element) => {
        const markup = `<div class="movie-section">
          <div class="img-card">
            <img src="${element.image.medium}" alt="movies image">
          </div>
          <div class="img-description">
            <div class="movies-name">
              <h3>${element.name}</h3>
              <div class="action">
                <button type="button" data-id="${element.id}" class="comment">Comment</button>
                <span>
                  <i class="fa-regular fa-thumbs-up thumbsUpBtn"></i>
                  <small class="counter">0</small>
                </span>
              </div>
            </div>
          </div>
        </div>`;
        imageContainer.insertAdjacentHTML('beforeend', markup);
      });

      const commentButtons = document.querySelectorAll('.comment');

      commentButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
          const popup = document.querySelector('#popup-modal');
          const commentId = event.target.getAttribute('data-id');
          const relatedItem = data.find((item) => item.id === parseInt(commentId, 10));
          const relatedImage = relatedItem.image.original;
          popup.innerHTML = '';
          const popupMarkup = `
            <div class="img">
              <div class="movies-details-section">
                <img src="${relatedImage}" alt="movies image">
                <span id="close-btn">&#10005;</span>
                <div class="summary">
                  <p>
                    Name: ${relatedItem.name} &nbsp;&nbsp;&nbsp; Genres: ${relatedItem.genres} <br>
                    Country: ${relatedItem.network?.country?.name} &nbsp;&nbsp;&nbsp; Language: ${relatedItem.language} <br>
                    Released Date: ${relatedItem.premiered} &nbsp;&nbsp;&nbsp; Status: ${relatedItem.status}<br>
                  </p>
                </div>
              </div>
              <div class="description">
                <div class="added-comment">
                  <p>Name: Bahati</p>
                  <p>Comments: This is the comment</p>
                </div>
              </div>
              <div class="comment-section">
                <form id="comment-form-${relatedItem.id}">
                  <input type="text" placeholder="Your Name">
                  <textarea placeholder="Your Insights"></textarea>
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

          const commentForm = document.getElementById(`comment-form-${relatedItem.id}`);
          commentForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const name = commentForm.querySelector('input[type="text"]').value;
            const comment = commentForm.querySelector('textarea').value;

            // postComment(relatedItem.id, name, comment);

            // Clear input fields after submitting
            commentForm.reset();
          });
        });
      });

      const thumbsUpButtons = document.querySelectorAll('.thumbsUpBtn');
      const counters = document.querySelectorAll('.counter');

      thumbsUpButtons.forEach((button, index) => {
        const counter = counters[index];
        let count = parseInt(counter.textContent); // Initialize the count from the current counter value

        button.addEventListener('click', () => {
          count++;
          

          
          const itemId = data[index]?.id; // Use the item's ID from the API response

          fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/SpsK74xULIr0Fmgge82L/likes/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ item_id: itemId }),
          })
            .then((response) => {
              if (response.ok) {
                console.log('Like recorded successfully!');
                // Update the total likes count
                updateTotalLikes(itemId);
                fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/SpsK74xULIr0Fmgge82L/likes/')
                .then((response) => response.json())
                .then((data) => {
                  // Extract the likes value from the response
                  const likes = data[0]?.likes || 0;
              
                  // Display the likes count in the browser
                  const counter = document.querySelector('.counter');
                  counter.innerHTML = likes.toString();
                })
                .catch((error) => {
                  console.error('Error retrieving data:', error);
                });
                
                // Handle the response or perform any necessary actions
              } else {
                console.error('Failed to record like:', response.status);
                // Handle the error appropriately
              }
            })
            .catch((error) => {
              console.error('Error recording like:', error);
              // Handle the error appropriately
            });
        });
      });

      const updateTotalLikes = (itemId) => {
        const totalLikesElement = document.getElementById(`total-likes-${itemId}`);


        fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/SpsK74xULIr0Fmgge82L/likes/`)
          .then((response) => {
            if (response.ok) {
              return response.json();
            
            } else {
              throw new Error(`Error retrieving total likes: ${response.status}`);
            }
          })
          .then((data) => {
            const itemLikes = data.find((item) => item.item_id === itemId);
            if (itemLikes && totalLikesElement) {
              const totalLikes = itemLikes.likes;
              totalLikesElement.textContent = totalLikes;
            } else {
              // If the item is not found in the likes data, create a new entry with 1 like
              fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/SpsK74xULIr0Fmgge82L/likes/`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ item_id: itemId, likes: 1 }),
              })
                .then((response) => {
                  if (response.ok) {
                    console.log('New item likes recorded successfully!');
                    // Handle the response or perform any necessary actions
                  } else {
                    console.error('Failed to record new item likes:', response.status);
                    // Handle the error appropriately
                  }
                })
                .catch((error) => {
                  console.error('Error recording new item likes:', error);
                  // Handle the error appropriately
                });
            }
          })
          .catch((error) => {
            console.error('Error retrieving total likes:', error);
            // Handle the error appropriately
          });
      };
    });
};

export default getImage;