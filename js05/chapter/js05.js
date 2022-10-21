"use strict";
/*    JavaScript 7th Edition
      Chapter 5
      Chapter Case

      Application to generate a slide show
      Author: Isabelle Samaniego
      Date:   October 22, 2022

      Filename: js05.js
*/

window.addEventListener("load", createLightbox);

function createLightbox() {
    // Lightbox Container
    let lightBox = document.getElementById("lightbox");

    // Parts of the lightbox
    let lbTitle = document.createElement("h1");
    let lbCounter = document.createElement("div");
    let lbPrev = document.createElement("div");
    let lbNext = document.createElement("div");
    let lbPlay = document.createElement("div");
    let lbImages = document.createElement("div");

    /* The appendChild() method always places the node at the end of 
    the parent node’s children. To insert a node at a different 
    position—such as at the beginning of the child list—use the 
    insertBefore() method. */

    // Design the lightbox title
    lightBox.appendChild(lbTitle); // Define the id for the lbTitle node
    lbTitle.id = "lbTitle";
    lbTitle.textContent = lightboxTitle; // Add the lightbox title


    // Design the lightbox slide counter
    lightBox.appendChild(lbCounter);
    lbCounter.id = "lbCounter";
    let currentImg = 1; // Set initial value
    lbCounter.textContent = currentImg + " / " + imgCount; // currentImg displays current image and count of all images


    // Design the lightbox previous slide button
    lightBox.appendChild(lbPrev);
    lbPrev.id = "lbPrev";
    lbPrev.innerHTML = "&#9664;";
    lbPrev.onclick = showPrev; // add event handler


    // Design the lightbox next slide button
    lightBox.appendChild(lbNext);
    lbNext.id = "lbNext";
    lbNext.innerHTML = "&#9654;";
    lbNext.onclick = showNext; // add event handler


    // Design the lightbox Play-Pause button
    lightBox.appendChild(lbPlay);
    lbPlay.id = "lbPlay";
    lbPlay.innerHTML = "&#9199;";
        let timeID; // initialize timeID
        lbPlay.onclick = function() {
            // showNext();
            // timeID = window.setInterval(showNext, 1500);
            if (timeID) {
                
                // Stop the slideshow
                window.clearInterval(timeID);
                timeID = undefined;
                } else {
                
                    // Start the slideshow
                showNext();
                timeID = window.setInterval(showNext, 1500);
            }
        }


    // Design the lightbox images container
    lightBox.appendChild(lbImages);
    lbImages.id = "lbImages";


    // Add images from the imgFiles array to the container
    for (let i = 0; i < imgCount; i++) {
        let image = document.createElement("img");

        image.src = imgFiles[i];
        image.alt = imgCaptions[i];
        image.onclick = createOverlay; // call the createOverlay() when any image is clicked
        lbImages.appendChild(image);
    }


    // Function to move forward through the image list
    function showNext() {
        lbImages.appendChild(lbImages.firstElementChild); // firstElementChild moves the first image to the end of the list
        (currentImg < imgCount) ? currentImg++ : currentImg = 1; // 1 increases the image count until the last is reached
        lbCounter.textContent = currentImg + " / " + imgCount; //updates the text in the image counter box
    }

    // Function to move backward through the image list
    function showPrev() {
        lbImages.insertBefore(lbImages.lastElementChild, // moves the last image to the start of the list
        lbImages.firstElementChild);
        (currentImg > 1) ? currentImg-- : currentImg = imgCount; // decreases the image count by 1 until the first image is reached
        lbCounter.textContent = currentImg + " / " + imgCount; // updates the text in the image counter box
    }

    function createOverlay() {
        let overlay = document.createElement("div");
        overlay.id = "lbOverlay";

        // Add the figure box to the overlay
        let figureBox = document.createElement("figure");
        overlay.appendChild(figureBox);

        // Add the image to the figure box
        let overlayImage = this.cloneNode("true"); // copy the image that called the function
        figureBox.appendChild(overlayImage); // append the copied image to the figure box

        // Add the caption to the figure box
        let overlayCaption = document.createElement("figcaption");
        overlayCaption.textContent = this.alt; // display the value of the alt attribute as the fig caption
        figureBox.appendChild(overlayCaption); // append the caption to the figure box

        // Add a close button to the overlay
        let closeBox = document.createElement("div"); // create an element for the close button
        closeBox.id = "lbOverlayClose";
        closeBox.innerHTML = "&times;"; // displays the X symbol in the close button

        closeBox.onclick = function() { // when the close button is clicked, it removes the overlay from the doc body
            document.body.removeChild(overlay);
        }

        overlay.appendChild(closeBox);

        document.body.appendChild(overlay); // append the close button to the overlay
    }

}




window.addEventListener("load", setupGallery);

function setupGallery() {
   let imageCount = imgFiles.length;
   let galleryBox = document.getElementById("gallery");
   let currentSlide = 1;
   let runShow = true;
   let showRunning;
   
   let galleryTitle = document.createElement("h1");
   galleryTitle.id = "galleryTitle";
   galleryTitle.textContent = slidesTitle;
   galleryBox.appendChild(galleryTitle);
   
   let slideCounter = document.createElement("div");
   slideCounter.id = "slideCounter";
   slideCounter.textContent = currentSlide + "/" + imageCount;
   galleryBox.appendChild(slideCounter);
   
   let leftBox = document.createElement("div");
   leftBox.id = "leftBox";
   leftBox.innerHTML = "&#9664;";
   leftBox.onclick = moveToLeft;   
   galleryBox.appendChild(leftBox);
   
   let rightBox = document.createElement("div");
   rightBox.id = "rightBox";
   rightBox.innerHTML = "&#9654;";  
   rightBox.onclick = moveToRight;   
   galleryBox.appendChild(rightBox);
   
   let playPause = document.createElement("div");
   playPause.id = "playPause";
   playPause.innerHTML = "&#9199;";
   playPause.onclick = startStopShow;
   galleryBox.appendChild(playPause);
   
   let slideBox = document.createElement("div");
   slideBox.id = "slideBox";
   galleryBox.appendChild(slideBox);
   
   
   for (let i = 0; i < imageCount; i++) {
      let image = document.createElement("img");
      image.src = imgFiles[i];
      image.alt = imgCaptions[i];
      image.onclick = createModal;
      slideBox.appendChild(image);
   }
   

   
   
   function moveToRight() {
      let firstImage = slideBox.firstElementChild.cloneNode("true");
      firstImage.onclick = createModal;
      slideBox.appendChild(firstImage);
      slideBox.removeChild(slideBox.firstElementChild);
      currentSlide++;
      if (currentSlide > imageCount) {
         currentSlide = 1;
      }
      slideCounter.textContent = currentSlide + " / " + imageCount;
   }
   
   function moveToLeft() {
      let lastImage = slideBox.lastElementChild.cloneNode("true");
      lastImage.onclick = createModal;
      slideBox.removeChild(slideBox.lastElementChild);
      slideBox.insertBefore(lastImage, slideBox.firstElementChild);
      currentSlide--;
      if (currentSlide === 0) {
         currentSlide = imageCount;
      }
      slideCounter.textContent = currentSlide + " / " + imageCount;      
   }  
   
   function startStopShow() {
      if (runShow) {
         showRunning = window.setInterval(moveToRight, 2000);
         runShow = false;
      } else {
         window.clearInterval(showRunning);
         runShow = true;
      }
   }
   
   function createModal() {
      let modalWindow = document.createElement("div");
      modalWindow.id = "activeModal";
      let figureBox = document.createElement("figure");
      modalWindow.appendChild(figureBox);
      
      let modalImage = this.cloneNode("true");
      figureBox.appendChild(modalImage);
      
      let figureCaption = document.createElement("figcaption");
      figureCaption.textContent = modalImage.alt;
      figureBox.appendChild(figureCaption);
      
      let closeBox = document.createElement("div");
      closeBox.id = "modalClose";
      closeBox.innerHTML = "&times;";
      closeBox.onclick = function() {
         document.body.removeChild(modalWindow);
      }
      
      modalWindow.appendChild(closeBox);
      
      document.body.appendChild(modalWindow);
   }
   
}