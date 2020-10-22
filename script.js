const wsUrl = "wss://echo.websocket.org/";
const but = document.querySelector('.btn');
const geo = document.querySelector('.geo');

const chat = document.querySelector('.chat');

let socket;
    
socket = new WebSocket(wsUrl);
socket.onopen = function(evt) {
    console.log("CONNECTED");
  };

but.addEventListener('click', sendMessage);
geo.addEventListener('click', geoFindMe);

async function geoFindMe() {
  let  location, coord = '';

  if(!navigator.geolocation) {
    location = 'Geolocation is not supported by your browser';
    alert(location);
  } else {
    await navigator.geolocation.getCurrentPosition(success, error);
  }

  function success(position) {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;
    // console.log(latitude, longitude);
    location = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    coord = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
    socket.send(location);
    outputGeoToScreen(location, 'client');
  }

  function error() {
    location = 'Unable to retrieve your location';
    alert(location);
  }
}

function sendMessage() {
	const input = document.querySelector('.input').value;
	const output = '';
	outputToScreen(input, 'client');

  	socket.onclose = function(evt) {
    console.log("DISCONNECTED");
  };
  	socket.onmessage =  function(evt) {
    const output =  evt.data;
    // console.log("message", output);
    outputToScreen(output, 'server');
  };
  	socket.onerror = function(evt) {
    const output = 'ERROR: ' + evt.data;
    console.log(outputToScreen);
  };
	socket.send(input);	
}

function outputToScreen(inp, klass) {
	// console.log("mess", inp);
  let card = `
      <div class=${klass}>${inp}</div>
      `;
  	chat.innerHTML += card;
}

function outputGeoToScreen(inp, klass) {
  // console.log("mess", inp);
  let card = `
      <div class=${klass}><a href = ${inp}>${inp}</a></div>
      `;
    chat.innerHTML += card;
}
