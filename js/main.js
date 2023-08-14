const randomPhotoElement = document.querySelector('.random-photo');
const addPhotoBtn = document.querySelector('.add-photo-btn');
const getNewPhotoBtn = document.querySelector('.get-new-photo-btn')
const photoCollection = document.querySelector('.photo-collection');
const photoCollectionHeading = document.querySelector('.photo-collection .heading');
const selectedPhotos = document.querySelector('.selected-photos');
const addEmailBtn = document.querySelector('.add-email-btn');
const changeEmailBtn = document.querySelector('.change-email-btn');
const currentSelectedEmail = document.querySelector('.current-selected-email');
const enterEmail = document.querySelector('.enter-email');
const currentEmail = document.querySelector('.current-email');
const emailEl = document.querySelector('.email-input');
const emailErrorMsg = document.querySelector(".email-error-message");

const apiService = new ApiService();
const appStateService = new AppStateService();

const emailRegex = /^([a-z\d\.-]+)@([a-z\d]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;

apiService.fetchRandomPhoto()
    .then(res => {
        randomPhotoElement.src = res;
    })

addPhotoBtn.addEventListener('click', () => {
    if (!emailEl.value) {
        emailErrorMsg.textContent = "Please Add an Email to Start Your Collection";
        return;
    }  
    appStateService.addPhotoForCurrentUser(randomPhotoElement.src);   

    if (appStateService.currentUserPhotoCount() === 1) {      
        photoCollectionHeading.innerHTML =  outputHeading();       
    }

    addPhotoCollectionElement(randomPhotoElement.src);

    apiService.fetchRandomPhoto()
    .then(res => {
        randomPhotoElement.src = res;
    })

});

getNewPhotoBtn.addEventListener('click', () => {   
    apiService.fetchRandomPhoto()
    .then(res => {          
        randomPhotoElement.src = res;
    });
});

addEmailBtn.addEventListener('click', () => {

    let validateCheck = validateEmail(emailEl.value);

    if (!validateCheck.valid) {
        emailErrorMsg.textContent = validateCheck.message;
        return;
    }

    //change heading to include selected email and invite user to change it
    enterEmail.style.display = "none";
    currentEmail.style.display = "block";
    currentSelectedEmail.textContent =  emailEl.value;

    // valid email display existing photos or empty collection with message 
    let existingPhotos = appStateService.getOrAddUser(emailEl.value);

    if (existingPhotos.length == 0) {
        selectedPhotos.textContent = `Your collection is empty! Select the current photo
                                              or click next to choose another....`;
    } else {
        existingPhotos.forEach(p => addPhotoCollectionElement(p));        
    }         
  
});

changeEmailBtn.addEventListener('click', () => {
    enterEmail.style.display = "block";
    currentEmail.style.display = "none";
    selectedPhotos.innerHTML = "";
    emailEl.value = "";
})

emailEl.addEventListener('input', () => {    
    emailErrorMsg.textContent = "";
});

function addPhotoCollectionElement(photoUrl) {
    let photoBox = document.createElement('div');
    let image = document.createElement('img');
    image.src = photoUrl;
    image.classList.add('photo-box-img');
    photoBox.appendChild(image);
    selectedPhotos.appendChild(photoBox);    
}

function validateEmail(email) {
    if (!email) {
        return { valid: false, message: 'Please enter your email'}
    };  

    if (!emailRegex.test(email)) {
        return { valid: false, message: 'Please enter a valid email to start your collection'}
    }
    return { valid: true, message: null };   
}

// function outputHeading() { 
    
//     if (!appStateService.currentUser) {
//         return `<h3>Please enter your email to start your collection</h3>`;
//     }
   
//     let outputHeading =    `
//             <h3>Your selected photos </h3>
//             <h4>email: <span class="current-email">${appStateService.currentUser.email}</span></h4>             
//         `;

//     if (appStateService.currentUserPhotoCount() ===  0) {
//         outputHeading += 
//            `<p>Your collection is empty! Select the current photo or click next to choose another....</p>`
//     }

//     return outputHeading;

// }

