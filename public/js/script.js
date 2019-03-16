
//Form selectors
const weatherForm = document.querySelector('form');
const weatherFormInput = document.querySelector('#weatherInputLocation');

//Display Selectors
const displayLocation = document.querySelector('.weather-display-location');
const displayInfo = document.querySelector('.weather-display-info');

//Form on submit
weatherForm.addEventListener('submit', (e) => {

    e.preventDefault();

    //Get a location
    const location = weatherFormInput.value;

    //Concatenate that location to form the url
    const url = `http://localhost:3000/weather?address=${location}`;

    //Loading
    displayLocation.textContent = 'Loading...';
    displayInfo.textContent = '';

    //Fecth that URl, our API calls are set up on app.js
    fetch(url).then((response) =>{
        response.json().then((data) =>{
            if(data.error){
                displayLocation.textContent = data.error;
            } else {
                displayLocation.textContent = data.location;
                displayInfo.textContent = data.forecastData;
            }

        })
    })
});

