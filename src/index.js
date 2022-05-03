import './js/main.js'
import './styles/main.scss'

var req = require.context("./images/uploads", false, /\.(?:ico|gif|png|jpg|jpeg|webp|svg)$/i);
req.keys().forEach(function(key){
    req(key);
});

//import WebpackLogo from './images/webpack-logo.svg'

/*
// Create SVG logo node
const logo = document.createElement('img')
logo.src = WebpackLogo

// Create heading node
const greeting = document.createElement('h1')
greeting.textContent = HelloWorld()

// Append SVG and heading nodes to the DOM
const app = document.querySelector('#root')
app.append(logo, greeting)*/
