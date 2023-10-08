const randomPhotoElement = document.querySelector('.random-photo');
const addPhotoBtn = document.querySelector('.add-photo-btn');
const getNewPhotoBtn = document.querySelector('.get-new-photo-btn')
const photoCollection = document.querySelector('.photo-collection');
const photoCollectionHeading = document.querySelector('.photo-collection .heading');
const selectedPhotos = document.querySelector('.selected-photos');
const addEmailBtn = document.querySelector('.add-email-btn');
const addAnotherEmailBtn = document.querySelector('.add-another-email-btn');
const currentSelectedEmail = document.querySelector('.current-selected-email');
const enterEmail = document.querySelector('.enter-email-startup');
const currentEmail = document.querySelector('.current-email');
const emailEl = document.querySelector('.email-input');
const emailErrorMsg = document.querySelector(".email-error-message");
const userSelect = document.querySelector(".user-select");
const userCollections = document.querySelector(".user-collections");

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
   
    // valid email display existing photos or empty collection with message 

    setStateForCurrentUser(emailEl.value);  
    
    addPhotoBtn.disabled = false;
    getNewPhotoBtn.disabled = false;
  
});

addAnotherEmailBtn.addEventListener('click', () => {
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

userSelect.addEventListener('change', () => { 
    setStateForCurrentUser(userSelect.value);
})

function setStateForCurrentUser(emailForDisplay) {
    currentSelectedEmail.textContent =  emailForDisplay; 
    selectedPhotos.innerHTML = "";  

    let existingPhotos = appStateService.getOrAddUser(emailForDisplay);

    if (existingPhotos.length == 0) {   
        addMsgToCollectionHeading(`Your collection is empty! Select the current photo
                                                             or click next to choose another....`);
    } else {
        addMsgToCollectionHeading(`Add more to your collection here...`);
    
        for (let i = existingPhotos.length -1 ; i >= 0; i--) {
            
            addPhotoCollectionElement(existingPhotos[i]);
        }     
    };

    setupUserSelect();
}


function addPhotoCollectionElement(photoUrl) {
    let photoBox = document.createElement('div');
    photoBox.classList.add('photo-box');
    let image = document.createElement('img');
    image.src = photoUrl;
    image.classList.add('photo-box-img');
    photoBox.append(image);  
    selectedPhotos.prepend(photoBox);    
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
    photoCollectionHeading.append(headingPara);
}

function setupUserSelect() {
    let optionsToRemove = userSelect.querySelectorAll('option:not(:first-child)');
    optionsToRemove.forEach(o => o.remove());

    let usersForSelect = appStateService.getNonCurrentUsers();   
    if (usersForSelect.length < 1) {
        return;
    }

   
    userCollections.style.display = "block";

    usersForSelect.forEach(u => {
        let optionEl = document.createElement('option');
       
        optionEl.value = u.email;
        optionEl.innerHTML = u.email;
        userSelect.appendChild(optionEl);
    })

    
}
