const randomPhotoElement = document.querySelector('.random-photo');
const addPhotoBtn = document.querySelector('.add-photo-btn');
const getNewPhotoBtn = document.querySelector('.get-new-photo-btn')
const photoCollection = document.querySelector('.photo-collection');
const selectedPhotos = document.querySelector('.selected-photos');
const addChangeEmailBtn = document.querySelector('.add-change-email-btn');
const emailEl = document.querySelector('.email');
const emailErrorMsg = document.querySelector(".email-error-message");
const currentEmailEl = document.querySelector(".current-email");

const apiService = new ApiService();
const appStateService = new AppStateService();

apiService.fetchRandomPhoto()
    .then(res => {
        randomPhotoElement.src = res;
    })

addPhotoBtn.addEventListener('click', () => {
    console.log(emailEl.value);

    if (!emailEl.value) {
        emailErrorMsg.textContent = "Please Add an Email to Start Your Collection";
        return;
    }

    appStateService.addPhotoForCurrentUser(randomPhotoElement.src);
    addPhotoCollectionElement(randomPhotoElement.src);
});

getNewPhotoBtn.addEventListener('click', () => {   
    apiService.fetchRandomPhoto()
    .then(res => {          
        randomPhotoElement.src = res;
    });
});

addChangeEmailBtn.addEventListener('click', () => {

    let validateCheck = validateEmail(emailEl.value);

    if (validateCheck.valid) {      
     
        selectedPhotos.innerHTML="";

        let existingPhotos = appStateService.getOrAddUser(emailEl.value);
        existingPhotos.forEach(p => addPhotoCollectionElement(p));
        currentEmailEl.textContent = emailEl.value;
       
    } else {
        emailErrorMsg.textContent = validateCheck.message;
    }
});

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
    if (email) {
        //email is valid
        return { valid: true, message: null }
    } else {
        // email invalid return error message
        return { valid: false, message: 'Please enter a valid email to start your collection' };
    }

}

