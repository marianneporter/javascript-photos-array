const randomPhotoElement = document.querySelector('.random-photo');
const addPhotoBtn = document.querySelector('.add-photo-btn');
const getNewPhotoBtn = document.querySelector('.get-new-photo-btn')
const photoCollection = document.querySelector('.photo-collection');
const photoCollectionHeading = document.querySelector('.photo-collection .heading');
const selectedPhotos = document.querySelector('.selected-photos');
const addChangeEmailBtn = document.querySelector('.add-change-email-btn');
const emailEl = document.querySelector('.email');
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
        console.log('going to change html count ===1');
        photoCollectionHeading.innerHTML =  outputHeading();       
    }

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
        addChangeEmailBtn.innerText="Change Email";     
        selectedPhotos.innerHTML="";
        let existingPhotos = appStateService.getOrAddUser(emailEl.value);
        photoCollectionHeading.innerHTML =  outputHeading();
               existingPhotos.forEach(p => addPhotoCollectionElement(p));             
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
    if (!email) {
        return { valid: false, message: 'Please enter your email'}
    };  

    if (!emailRegex.test(email)) {
        return { valid: false, message: 'Please enter a valid email to start your collection'}
    }
    return { valid: true, message: null };   
}

function outputHeading() { 
    
    if (!appStateService.currentUser) {
        return `<h3>Please enter you email to start your collection</h3>`;
    }
   
    let outputHeading =    `
            <h3>Your selected photos </h3>
            <h4>email: <span class="current-email">${appStateService.currentUser.email}</span></h4>             
        `;

    if (appStateService.currentUserPhotoCount() ===  0) {
        outputHeading += 
           `<p>Your collection is empty! Select the current photo or click next to choose another....</p>`
    }

    return outputHeading;

}

