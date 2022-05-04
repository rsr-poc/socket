let socket;
let color = '#000';
let strokeWidth = 4;
let canvas;
let colorPicker;
let selectedColor;
const MIN_STROKE_WIDTH = 1;
const MAX_STROKE_WIDTH = 10;

function setup() {
  // Creating canvas
  canvas = createCanvas(windowWidth / 1.7, windowHeight / 1.05);
  centerCanvas();
  canvas.background(255, 255, 255);

  selectedColor = select('#selected-color');
  selectedColor.html(color);

  colorPicker = select('#color-btn');
  colorPicker.changed(changeColorEvent);

  // Start the socket connection
  socket = io.connect('/draw');

  socket.on('connect', () => {
    const usersList = select('#users');
    const user = createElement('li', socket.id);
    user.parent(usersList);
  });

  // Callback function
  socket.on('mouse', (data) => {
    stroke(data.color);
    strokeWeight(data.strokeWidth);
    line(data.x, data.y, data.px, data.py);
  });

  socket.on('state', (data) => {
    const { state, users } = data;

    users.forEach((user) => {
      const usersList = select('#users');
      const userElement = createElement('li', user);
      userElement.parent(usersList);
    });

    state.forEach((draw) => {
      stroke(draw.color);
      strokeWeight(draw.strokeWidth);
      line(draw.x, draw.y, draw.px, draw.py);
    });
  });

  socket.on('color', (data) => {
    console.log(data);
  });

  const strokeWidthPicker = select('#stroke-width-picker');

  // Adding a mousePressed listener to the button
  strokeWidthPicker.changed(() => {
    const errorMessage = select('#stroke_width_error');
    const width = parseInt(strokeWidthPicker.value());

    if (width >= MIN_STROKE_WIDTH && width <= MAX_STROKE_WIDTH) {
      strokeWidth = width;
      errorMessage.hide();
      strokeWidthPicker.style('border', 'none');
    } else {
      strokeWidthPicker.style('border', '2px solid red');
      errorMessage.html('Deve ser entre 1 e 10!');
    }
  });
}

function windowResized() {
  centerCanvas();
  canvas.resizeCanvas(windowWidth / 2, windowHeight / 2, false);
}

function centerCanvas() {
  const x = (windowWidth - width) / 2;
  const y = (windowHeight - height) / 2;
  canvas.position(x, y);
}

function mouseDragged() {
  // Draw
  stroke(color);
  strokeWeight(strokeWidth);
  line(mouseX, mouseY, pmouseX, pmouseY);

  // Send the mouse coordinates
  sendmouse(mouseX, mouseY, pmouseX, pmouseY);
}

// Sending data to the socket
function sendmouse(x, y, pX, pY) {
  const data = {
    x: x,
    y: y,
    px: pX,
    py: pY,
    color: color,
    strokeWidth: strokeWidth,
  };

  socket.emit('mouse', data);
}

function changeColorEvent() {
  console.log('changed color');
  if (/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(colorPicker.value())) {
    color = colorPicker.value();
    console.log(color);
  }

  selectedColor.html(color);
  selectedColor.style('color', color);
  socket.emit('change-color', color);
}
