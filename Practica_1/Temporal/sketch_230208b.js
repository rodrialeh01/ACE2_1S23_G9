let serial; // variable for the serial object
let latestData = "waiting for data"; // variable to hold the data

function setup() {
  createCanvas(windowWidth, windowHeight);
  // serial constructor
  serial = new p5.SerialPort();
  // get a list of all connected serial devices
  serial.list();
  // serial port to use - you'll need to change this
  serial.open('COM3');
  // callback for when the sketchs connects to the server
  serial.on('connected', serverConnected);
  // callback to print the list of serial devices
  serial.on('list', gotList);
  // what to do when we get serial data
  serial.on('data', gotData);
  // what to do when there's an error
  serial.on('error', gotError);
  // when to do when the serial port opens
  serial.on('open', gotOpen);
  // what to do when the port closes
  serial.on('close', gotClose);
  
  consulta();
}

function serverConnected() {
  console.log("Connected to Server");
}

// list the ports
function gotList(thelist) {
  console.log("List of Serial Ports:");

  for (let i = 0; i < thelist.length; i++) {
    console.log(i + " " + thelist[i]);
  }
}

function gotOpen() {
  console.log("Serial Port is Open");
}

function gotClose() {
  console.log("Serial Port is Closed");
  latestData = "Serial Port is Closed";
}

function gotError(theerror) {
  console.log(theerror);
}

// when data is received in the serial buffer

function gotData() {
  let currentString = serial.readLine(); // store the data in a variable
  trim(currentString); // get rid of whitespace
  if (!currentString) return; // if there's nothing in there, ignore it
  console.log(currentString); // print it out
  latestData = currentString; // save it to the global variable
}

const consulta = () => {
  fetch(`http://localhost:3000/data`, {
  method: 'GET',
  headers:{
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',}})
  .then(res => console.log(res.json()))
  .catch(err => {
      console.error('Error:', err)
      alert("Ocurrio un error, ver la consola")
  });
};

function draw() {
  background(255, 255, 255);
  fill(0, 0, 0);
  textSize(50);
  let dataSensor = latestData.split('/');
  
  text("Sensor:", 10, 50);
  text(dataSensor[0], 180, 50); // print the data to the sketch
  
  textSize(80);
  text("Value:", 10, 140);
  text(dataSensor[1], 150, 140);
  
  
  //text(showMsg(), 400, 400);
  //console.log("asdf");
  

  // in this example, we are reciving a 0 and a 1
  // if the button is not pressed we get a 0
  if (latestData == 0) {
    ellipse(width / 2, height / 2, 100, 100);
  } else { // if it is pressed, we get a 1
    rectMode(CENTER);
    rect(width / 2, height / 2, 100, 100);
  }
}
