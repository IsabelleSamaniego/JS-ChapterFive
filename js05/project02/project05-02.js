"use strict";
/*    JavaScript 7th Edition
      Chapter 5
      Project 05-02

      Project to move images between a photo bucket and photo list.
      Author: Isabelle Samaniego
      Date:   October 22, 2022

      Filename: project05-02.js
*/

// 3. declare variables
let images = document.getElementsByTagName("img");
let photoBucket = document.getElementById("photo_bucket");
let photoList = document.getElementById("photo_list");


// 4. create for loop for images
for (let i = 0; i < images.length; i++) {
    
    // 5. insert onclick event that runs an anonymous function when image is clicked
    images[i].onclick = function() {

        // 6.a. if parent element of clicked image has an id = photo_bucket
        if (this.parentElement.id == "photo_bucket"){

            // 6.a.i. create an element node named newItem for the li element
            let newItem = document.createElement("li");

            // 6.a.ii. append newItem to the photoList object
            photoList.append(newItem);

            // 6.a.iii. append the image to the newItem object using the appendChild() method
            newItem.appendChild(this);

        } else {

            // 6.b.i. declare oldItem variable to the parent element
            let oldItem = this.parentElement;

            // 6.b.ii. append the clicked image to photoBucket object
            photoBucket.append(this);

            // 6.b.iii. remove oldItem from the parent element of oldItem using the removeChild() method.
            oldItem.parentElement.removeChild(oldItem);

        }
    };
}