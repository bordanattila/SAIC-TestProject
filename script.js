//  Slideshow

// Create index for slide
let slideIndex = 1;

showSlides(slideIndex);

// Control for next and previous
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Control for thumbnail image
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    // Get the images for the slide show
    let slides = document.getElementsByClassName("slide-show");
    //  Get the navigation dots of the slide show
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}


// Drag and drop option 1
const dropZone = document.getElementById("drag-drop-container");

// Create randomized list of steps
const procedure = [
    "Place skillet on stove.",
    "Preheat skillet over medium heat.",
    "Generously butter one side of a slice of bread.",
    "Place bread butter-side-down onto skillet.",
    "Add 1 slice of cheese on top.",
    "Butter a second slice of bread on one side and place butter-side-up on top of sandwich.",
    "Grill until lightly browned and flip over.",
    "Continue grilling until cheese is melted.",
];

const randomList = [];

createRandomList();

function createRandomList() {
    [...procedure]
        // Return array of objects with a process step as value and random number as sort
        .map(process => ({ value: process, sort: Math.random() }))
        // Sort the object by random number
        .sort((process, order) => process.sort - order.sort)
        // Map back the sorted array with just the values
        .map(process => process.value)
        // Create HTML elements out of the random array
        .forEach((step, index) => {
            const randomItem = document.createElement("div");

            randomItem.setAttribute("draggable", "true");
            randomItem.setAttribute("class", "draggable");

            randomItem.innerText = `
    ${step}
    `;

            randomList.push(randomItem);

            dropZone.appendChild(randomItem);
        });
};


// Drag and drop functionality of option 1

const container = document.getElementById("drag-drop-container");
const items = document.querySelectorAll(".draggable");

let draggedItem = null;

// Add event listeners to each item
items.forEach(item => {
    item.addEventListener("dragstart", () => {
        draggedItem = item;
        setTimeout(() => {
            item.style.display = "none";
        }, 0);
    });

    item.addEventListener("dragend", () => {
        setTimeout(() => {
            draggedItem.style.display = "block";
            draggedItem = null;
        }, 0);
    });
});

// Event listener for drag over
container.addEventListener("dragover", e => {
    e.preventDefault();
});

// Add event listener to container to allow drop
container.addEventListener("drop", e => {
    e.preventDefault();
    const dropTarget = e.target;
    if (dropTarget.classList.contains("draggable")) {
        container.insertBefore(draggedItem, dropTarget);
    } else {
        container.appendChild(draggedItem);
    }
    // Call check order every time an item is dropped
    checkOrder();
});

// Check the order of step on every drop event
function checkOrder() {
    const currentOrder = [];
    // Get the draggable elements
    const dropItems = document.getElementsByClassName("draggable");
    // Loop through the list of elements
    for (let i = 0; i < dropItems.length; i++) {
        // Push the inner text of the element in an array
        currentOrder.push(dropItems[i].innerText);
    }

    for (let i = 0; i < dropItems.length; i++) {
        // If element is not in the right place in the order remove class "right" and exit the function
        // otherwise add class to it to indicate correct placement
        if (dropItems[i].innerText.trim() !== procedure[i]) {
            dropItems[i].classList.remove("right")
        }
        else {
            (dropItems[i].innerText.trim() === procedure[i])
            dropItems[i].classList.add("right")
        }
    }
    // Give feedback to user on successful completion
    let correct = 0
    for (let i = 0; i < dropItems.length; i++) {
        if (dropItems[i].className === "draggable right") {
            correct++
        }
        if (correct === 8) {
            alert("Congratulations! You have placed the items in the correct order.");
        }
    }
}

// Drag and drop option 2
const imageZone = document.getElementById("drag-and-drop-container2")

// Create randomized list of images
const images = [
    "01a_pan_off.png",
    "01b_pan_on.png",
    "02_butter_bread.png",
    "03a_bread_in_pan.png",
    "03b_cheese_on_bread.png",
    "04_buttered_bread_on_top.png",
    "05_flip.png",
    "06_melted_cheese.png",
];

const randomImages = [];

createRandomImages();

function createRandomImages() {
    [...images]
        // Return array of objects with a process step as value and random number as sort
        .map(process => ({ value: process, sort: Math.random() }))
        // Sort the object by random number
        .sort((process, order) => process.sort - order.sort)
        // Map back the sorted array with just the values
        .map(process => process.value)
        // Create HTML elements out of the random array
        .forEach((img, index) => {
            const randomImage = document.createElement("img");

            randomImage.setAttribute("draggable", "true");
            randomImage.setAttribute("class", "drag-item");
            randomImage.setAttribute("ondragstart", "dragstart_handler(event)");
            randomImage.setAttribute("src", `./assets/${img}`);
            randomImage.setAttribute("id", `drag-item${index}`)

            randomImages.push(randomImage);

            imageZone.appendChild(randomImage)
        });
};

function dragstart_handler(ev) {
    // Add the target element"s id to the data transfer object
    ev.dataTransfer.setData("application/my-app", ev.target.id);
    // Only copy the image
    ev.dataTransfer.effectAllowed = "copy";
}

function dragover_handler(ev) {
    ev.preventDefault();
}

function drop_handler(ev) {
    ev.preventDefault();

    // Get the id of the target, make a copy and add the moved element to the target container
    const data = ev.dataTransfer.getData("application/my-app");
    const copyImg = document.createElement("img");
    const original = document.getElementById(data);
    copyImg.src = original.src

    // Append element 
    ev.target.appendChild(copyImg);
    // Check placement of correct image
    checkPlacement();
}

const dropTarget = document.getElementById("drop-item2");

// Counter for correct answers
let counter = 0;

function checkPlacement() {
    // Get the step shown
    const stepDisplayed = document.getElementById("drop-item1");
    const stepShown = stepDisplayed.innerText;
    // Get the name of the image placed in the hot spot
    const imageText = dropTarget.innerHTML.trim().split(" ");
    const innerHTMLLength = imageText.length;
    const imageSource = imageText[innerHTMLLength - 1];
    const imageSourceSplit = imageSource.split("/");
    const imageName = imageSourceSplit[7].slice(0, -2);
    // Check if correct image is placed
    if (imageName === images[counter] && stepShown === procedure[counter]) {
        // If correct let user know and display the next step
        dropTarget.innerText = "Correct"
        counter++
        stepDisplayed.innerText = procedure[counter]
    } else {
        // Inform user when incorrect image is placed
        dropTarget.innerText = "Sorry, that's not the right image."
        return
    }
    // When all placed correctly give feedback to the user
    if (counter === 8) {
        stepDisplayed.innerText = "Congratulations! You have placed the items in the correct order.";
        stepDisplayed.classList.add("good")
    }
}

// Reload page to reset drag and drop to try again
function reloadPage() {
    location.reload()
}
