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

// get initial photo for app
appStateService.getNewRandomPhoto()
    .then(res => {
        randomPhotoElement.src = appStateService.randomPhoto;
    })

addPhotoBtn.addEventListener('click', async () => {
    if (!emailEl.value) {
        emailErrorMsg.textContent = "Please Add an Email to Start Your Collection";
        return;
    }  
   
    if (window.innerWidth < 768) { 
        addMsgToCollectionHeading("Your Collection...")
    } else { 
        addMsgToCollectionHeading("Your Collection")
    }
   

    addPhotoBtn.disabled = true;
    getNewPhotoBtn.disabled = true;
    appStateService.addPhotoForCurrentUser(appStateService.randomPhoto);   

    addPhotoCollectionElement(appStateService.randomPhoto);

    let newRandomPhoto = await appStateService.getNewRandomPhoto();

    addPhotoBtn.disabled = false;
    getNewPhotoBtn.disabled = false;
    
    randomPhotoElement.src = appStateService.randomPhoto;   

});

getNewPhotoBtn.addEventListener('click', () => {   
    appStateService.getNewRandomPhoto()
    .then(res => {          
        randomPhotoElement.src = appStateService.randomPhoto;
    });
});

addEmailBtn.addEventListener('click', () => {
  
    let validateCheck = validateEmail(emailEl.value);

    if (!validateCheck.valid) {
        emailErrorMsg.textContent = validateCheck.message;
        return;
    }

    emailEl.value = validateCheck.formattedEmail;
    //change heading to include selected email and invite user to change it
    enterEmail.style.display = "none";
    currentEmail.style.display = "block";
    currentSelectedEmail.textContent =  emailEl.value;

    // valid email display existing photos or empty collection with message 
    let existingPhotos = appStateService.getOrAddUser(emailEl.value);

    if (existingPhotos.length == 0) {   
        addMsgToCollectionHeading(`Your collection is empty! Select the current photo
                                                             or click next to choose another....`);
    } else {
        addMsgToCollectionHeading(`Add more to your collection here...`);
        existingPhotos.forEach(p => addPhotoCollectionElement(p));        
    };
    
    addPhotoBtn.disabled = false;
    getNewPhotoBtn.disabled = false;
  
});

changeEmailBtn.addEventListener('click', () => {
    enterEmail.style.display = "block";
    currentEmail.style.display = "none";
    selectedPhotos.innerHTML = "";
    emailEl.value = "";
    addMsgToCollectionHeading("Add a new email and see your photo selections for it here!");  
    addPhotoBtn.disabled = true;
    getNewPhotoBtn.disabled = true;
})

emailEl.addEventListener('input', () => {    
    emailErrorMsg.textContent = "";
});

function addPhotoCollectionElement(photoUrl) {
    let photoBox = document.createElement('div');
    photoBox.classList.add('photo-box');
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

    email = email.toLowerCase();

    if (!emailRegex.test(email)) {
        return { valid: false, message: 'Please enter a valid email to start your collection'}
    }
    return { valid: true, message: null, formattedEmail: email };   
}

function addMsgToCollectionHeading(msg) {
    photoCollectionHeading.innerHTML = "";
    let headingPara = document.createElement('p');
    headingPara.textContent = msg;
    headingPara.classList.add('dynamic-message');
    photoCollectionHeading.appendChild(headingPara);
}
