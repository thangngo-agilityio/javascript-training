// Finding HTML Element by id
const element = document.getElementById("intro");

// Finding HTML Elements by tag name
const element1 = document.getElementsByTagName("p");

const x = document.getElementById("main");
const y = x.getElementsByTagName("p");

console.log(y);

// Finding HTML Elements by Class Name
const getClassName = document.getClassName("intro")


// Finding HTML Elements by CSS Selectors
const querySelector = document.querySelector("p.intro");