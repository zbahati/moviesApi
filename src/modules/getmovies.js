export const getImage = () => {
  const imageContainer = document.querySelector(".movies-banners");
  fetch("https://api.tvmaze.com/shows?page=0")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((element) => {
        console.log(element);
        const markup = `<div class="movie-section">
        <div class="img-card">
      <img src="${element.image.medium}" alt="">
  </div>
  <div class="img-description">
      <div class="movies-name">
          <h3>${element.name}</h3>
          <div class="action">
              <button type="button" data-id="${element.id}" class="comment">Comment</button>
              <button  type="button" data-id="${element.id}" class="Reservation">Reservation</button>
          </div>
      </div>

  </div>
  </div>`;
        imageContainer.insertAdjacentHTML("beforeend", markup);
        const getComent = () => {
          const comment = document.querySelectorAll(".comment");
          for (let i = 0; i < comment.length; i++) {
            comment[i].addEventListener("click", (event) => {
              const popup = document.querySelector("#popup-modal");

              const commentid = event.target;
              const movieId = commentid.getAttribute("data-id");
              const relatedItem = data.find(
                (item) => item.id === parseInt(movieId)
              );
              const relatedImage = relatedItem.image.original;
              popup.innerHTML = "";
              const popupMarkup = `
        <div class="img">
          <div class="movies-details-section">
            <img src="${relatedImage}" alt="movies images">
            <div class="summary">
              <p class="summary">
                Name: ${relatedItem.name} <br>
                Genres: ${relatedItem.genres} <br>
                Country: ${relatedItem.network.country.name} <br>
                Language: ${relatedItem.language} <br>
                Released Date : ${relatedItem.premiered} <br>
                Status: ${relatedItem.status}<br>
              </p>
            </div>
          </div>  

          <div class="comment-section">
              <form id="form">
                  <input type="text" placeholder=" Your Name">
                  <input type="text" placeholder=" Your Insight">
                  <button type="submit">Send comment</button>
              </form>
          </div>

        </div>
        <div class="description">
            <div class="added-comment">
                <p>Name : Bahati</p>
                <p>Comments : This is the comments</p>
            </div>
        </div>`;
              popup.insertAdjacentHTML("beforeend", popupMarkup);
            });
          }
        };

        getComent();
      });
    });
};
