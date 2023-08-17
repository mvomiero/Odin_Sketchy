
/* DEFAULT VALUES */

const DEFAULT_COLOR = '#333333' // color is in hexadecimal, so 3 components from 00 to FF
const DEFAULT_MODE = 'color'
const DEFAULT_SIZE = 16

/* VARIABLES (at te beginning = default values) */

let currentColor = DEFAULT_COLOR
let currentMode = DEFAULT_MODE
let currentSize = DEFAULT_SIZE

/* changing the current parameter to a new parameter */

function setCurrentColor(newColor) {
  currentColor = newColor
}

function setCurrentMode(newMode) {
  activateButton(newMode)
  currentMode = newMode
}

function setCurrentSize(newSize) {
  currentSize = newSize
}

/* DOM:
	get the elements from the DOM and store them in constants */

const colorPicker = document.getElementById('colorPicker')
const colorBtn = document.getElementById('colorBtn')
const rainbowBtn = document.getElementById('rainbowBtn')
const eraserBtn = document.getElementById('eraserBtn')
const clearBtn = document.getElementById('clearBtn')
const sizeValue = document.getElementById('sizeValue')
const sizeSlider = document.getElementById('sizeSlider')
const grid = document.getElementById('grid')

/* EVENTS:
	setting actions to the corresponding events */

colorPicker.oninput = (e) => setCurrentColor(e.target.value)
	// Arrow functions in js: = () =>
	// what is in the brackets is given as parameter to the function following the arrow 
colorBtn.onclick = () => setCurrentMode('color')
rainbowBtn.onclick = () => setCurrentMode('rainbow')
eraserBtn.onclick = () => setCurrentMode('eraser')
clearBtn.onclick = () => reloadGrid()
sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value)
sizeSlider.onchange = (e) => changeSize(e.target.value)

/* check if the mouse is up or down */

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

/* GRID EDITING */

function updateSizeValue(value) {
  sizeValue.innerHTML = `${value} x ${value}` // sizeValue is the id of the html element!
}

function reloadGrid() {
  clearGrid()
  setupGrid(currentSize)
}

function changeSize(value) {
  setCurrentSize(value)
  updateSizeValue(value)
  reloadGrid()
}

function clearGrid() {
  grid.innerHTML = ''
}

/* ACTIVATE BUTTON:
	this is to add a class "active" to the button that is selected. This way,
	it is possible to style it differently with css */
	
function activateButton(newMode) {
  if (currentMode === 'rainbow') {
    rainbowBtn.classList.remove('active')
  } else if (currentMode === 'color') {
    colorBtn.classList.remove('active')
  } else if (currentMode === 'eraser') {
    eraserBtn.classList.remove('active')
  }

  if (newMode === 'rainbow') {
    rainbowBtn.classList.add('active')
  } else if (newMode === 'color') {
    colorBtn.classList.add('active')
  } else if (newMode === 'eraser') {
    eraserBtn.classList.add('active')
  }
}

/* COLOR CHANGE */
function changeColor(e) {
	if (e.type === 'mouseover' && !mouseDown) return
	if (currentMode === 'rainbow') {
	  const randomR = Math.floor(Math.random() * 256)
	  const randomG = Math.floor(Math.random() * 256)
	  const randomB = Math.floor(Math.random() * 256)
	  e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
	} else if (currentMode === 'color') {
	  e.target.style.backgroundColor = currentColor
	} else if (currentMode === 'eraser') {
	  e.target.style.backgroundColor = '#fefefe'
	}
  }

/* GRID SETUP */
function setupGrid(size) {
	// those functions are calling the repeat CSS function
	grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
	grid.style.gridTemplateRows = `repeat(${size}, 1fr)`
  
	// creating div elements for every cell of the grid
	for (let i = 0; i < size * size; i++) {
	  const gridElement = document.createElement('div')
	  gridElement.classList.add('grid-element')
	  gridElement.addEventListener('mouseover', changeColor)
	  gridElement.addEventListener('mousedown', changeColor)
	  grid.appendChild(gridElement)
	}
  }

/* ONLOAD:
    these functions will be executed when all the elements of the page are loaded */

window.onload = () => {
  setupGrid(DEFAULT_SIZE)
  activateButton(DEFAULT_MODE)
}