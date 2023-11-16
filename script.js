document.addEventListener('DOMContentLoaded', function () {
  const fetchButton = document.getElementById('fetchButton');
  const clearButton = document.getElementById('clearButton');
  const userInfoContainer = document.querySelector('.users-list');

  fetchButton.addEventListener('click', function () {
    fetch('https://randomuser.me/api')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const user = data.results[0];
        const fullName = `${user.name.first} ${user.name.last}`;
        const email = user.email;
        const imageUrl = user.picture.large;
        const city = user.location.city;
        const country = user.location.country;
        const postcode = user.location.postcode;

        const userDiv = document.createElement('div');
        userDiv.classList.add('user');
        userDiv.innerHTML = `
                          <div class="user-info">
                              <img src="${imageUrl}" alt="User Image">
                              <p><strong>Name:</strong> ${fullName}</p>
                              <p><strong>Email:</strong> ${email}</p>
                              <p><strong>City:</strong> ${city}</p>
                              <p><strong>Country:</strong> ${country}</p>
                              <p><strong>Postcode:</strong> ${postcode}</p>
                          </div>
                      `;
        userInfoContainer.appendChild(userDiv);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        userInfoContainer.innerHTML = '<p>Error fetching data</p>';
      });
  });
  clearButton.addEventListener('click', function () {
    userInfoContainer.innerHTML = '';
  });
});
