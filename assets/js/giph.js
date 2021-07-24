const GIPHY_API_KEY = 'UaQ3Vxn4SERcaTLCW4wI1i6SZjKmG9g9';

function displayGiph() {
  var giphPanelEl = document.getElementById("giph-view");

  //format: http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=5
  fetch('https://api.giphy.com/v1/gifs/search?q=football&api_key=' + GIPHY_API_KEY + '&limit=5')
    .then(response => response.json())
    .then(json => {
      json.data
        .map(gif => gif.images.fixed_height.url)
        .forEach(url => {
          let img = document.createElement('img')
          img.src = url
          giphPanelEl.appendChild(img)
        })
    })
    .catch(error => giphPanelEl.appendChild = error);
}