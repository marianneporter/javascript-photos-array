const randomPhotoElement = document.querySelector('.random-photo');
const addPhotoBtn = document.querySelector('.add-photo-btn');
const getNewPhotoBtn = document.querySelector('.get-new-photo-btn')
const photoCollection = document.querySelector('.photo-collection');
const selectedPhotos = document.querySelector('.selected-photos');
const addChangeEmailBtn = document.querySelector('.add-change-email-btn');
const emailEl = document.querySelector('.email');
const emailErrorMsg = document.querySelector(".email-error-message");
let currentUser = null;
const currentEmailEl = document.querySelector(".current-email");


fetchRandomPhoto()
    .then(res => {     
     //   console.log(res.urls.regular);
   //     randomPhotoElement.src = res.urls.regular;
   //     console.log(res);
        randomPhotoElement.src = res;
    });


addPhotoBtn.addEventListener('click', () => {
    console.log('add button clicked');
    createPhotoCollectionElement();
});

getNewPhotoBtn.addEventListener('click', () => {
    console.log('in get new photo handler');
    fetchRandomPhoto()
    .then(res => {     
     //   console.log(res.urls.regular);
   //     randomPhotoElement.src = res.urls.regular;
        console.log(res);
        randomPhotoElement.src = res;
    });
});

addChangeEmailBtn.addEventListener('click', () => {
    console.log('add change email button clicked');
    console.log('email is ' + emailEl.value);

    let validateCheck = validateEmail(emailEl.value);

    if (validateCheck.valid) {  
        console.log('clearing selected photos');
     
        selectedPhotos.innerHTML="";
        
        currentUser = new User(emailEl.value);
        users.push(currentUser);
        console.log(users);
        currentEmailEl.textContent = emailEl.value;
       
    } else {
        emailErrorMsg.textContent = validateCheck.message;
    }
});

emailEl.addEventListener('input', () => {
    console.log('inpit');
    emailErrorMsg.textContent = "";
});




function createPhotoCollectionElement() {

    currentUser.addPhoto(randomPhotoElement.src);

    console.log(users);
    let photoBox = document.createElement('div');
    let image = document.createElement('img');
    image.src = randomPhotoElement.src;
    image.classList.add('photo-box-img');

    photoBox.appendChild(image);
    selectedPhotos.appendChild(photoBox);
    
}

// function clearDisplayPhotos() {
//     let elementsToRemove = selectedPhotos.querySelectorAll("")
// }



function validateEmail(email) {
    if (email) {
        //email is valid
        return { valid: true, message: null }
    } else {
        // email invalid return error message
        return { valid: false, message: 'Please enter a valid email to start your collection' };
    }

}

