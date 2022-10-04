console.log('Client side javascript file loaded.');

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data);
//     })
// })



// fetch('http://localhost:8080/weather?address=boston').then((response) => {
//     response.json().then((data) => {
//         console.log(data);
//     })
// })



const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

// messageOne.textContent = 'From javascript 1';
// messageTwo.textContent = 'From javascript 2';

weatherForm.addEventListener('submit',(e) => {
    e.preventDefault();

    const location = search.value;
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch('/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                // console.log(data.error)
                messageTwo.textContent = data.error;
            } else {
                // console.log(data.location);
                // console.log(data.forecastData.summary)
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecastData.summary;
            }
        })
    })

    // console.log(location)
});



