const likesModule = {
  handleLike: (itemId) => {
    fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/SpsK74xULIr0Fmgge82L/likes/`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`Error fetching likes data: ${response.status}`);
        }
      })
      .then((data) => {
        const itemLikes = data.find((item) => item.item_id === itemId);
        const totalLikesElement = document.getElementById(`total-likes-${itemId}`);
        const totalLikes = itemLikes ? itemLikes.likes || 0 : 0;
        totalLikesElement.textContent = totalLikes;

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
              likesModule.updateTotalLikes();
            } else {
              throw new Error(`Failed to record like: ${response.status}`);
            }
          })
          .catch((error) => {
            console.error('Error recording like:', error);
          });
      })
      .catch((error) => {
        console.error('Error retrieving likes data:', error);
      });
  },

  updateTotalLikes: () => {
    fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/SpsK74xULIr0Fmgge82L/likes/`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`Error retrieving total likes: ${response.status}`);
        }
      })
      .then((likesData) => {
        const totalLikesElements = document.querySelectorAll('.counter');
        totalLikesElements.forEach((likesElement) => {
          const itemId = likesElement.getAttribute('id').split('-')[2];
          const itemLikes = likesData.find((item) => item.item_id === itemId);
          const totalLikes = itemLikes ? itemLikes.likes || 0 : 0;
          likesElement.textContent = totalLikes;
        });
      })
      .catch((error) => {
        console.error('Error retrieving total likes:', error);
      });
  },
};

export default likesModule;
