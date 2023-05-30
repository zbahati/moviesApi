const form = document.getElementById('form');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const destructedFormData = [...formData];
  const destructedName = destructedFormData[0][1];
  const destructedMessage = destructedFormData[1][1];

  const destructedObject = {
    "item_id": 1,
    'username': destructedName,
    'comment': destructedMessage
  };

  fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/49tSqWTAEA8mjSDTlvqe/comments/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'  // Corrected the capitalization
    },
    body: JSON.stringify(destructedObject)
  })
    .then(response => response.json())
    .then(data => console.log(data));
});