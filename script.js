const imageContainer = document.querySelector('#image-container');
const loadicon = document.querySelector('#loadicon');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

let photosArray = [];

// Unsplash API 

const count = 30;

const accessKey = '1Kn_jtfDN4AvLrBsE7t8XyVuodD1BIecln-FMM7u9Bs';

const username = 'randyrizo';

const unsplashUrl = `https://api.unsplash.com/photos/random/?client_id=${accessKey}&username=${username}&count=${count}`;


// check if image has loaded. 

function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loadicon.hidden = true;

    }
}

// Helper function

function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// create elements for links and photos

function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach((photo) => {
        // create anchor tag to link to unsplash
        const item = document.createElement('a');
        //item.setAttribute('href', photo.links.html);
        //item.setAttribute('target', '_blank');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        // create img for photo
        const img = document.createElement('img');
        //img.setAttribute('src', photo.urls.regular);
        //img.setAttribute('alt', photo.alt_description);
        //img.setAttribute('title', photo.alt_description);
        setAttributes(img,{
            src: photo.urls.regular, 
            alt: photo.alt_description, 
            title: photo.alt_description,
        });
        // Event listener to check when each photo is loaded 
        img.addEventListener('load', imageLoaded)
        // place img tag into a tag
        item.appendChild(img);
        imageContainer.appendChild(item);

    });
}

// Get photos from API 

async function getPhotos() {
    try {
        const response = await fetch(unsplashUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        // catch error 
    }
}

// event listener for scrolling effect 
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});



// on Load 

getPhotos();
