/*******************************************************************/
/* controls app state, list of users and reference to current user */
/*******************************************************************/
class AppStateService {
    constructor() {
        this.users = [];
        this.currentUser = null;
        this.randomPhoto = null;
    }

    addNewUser(email) {
        this.currentUser = new User(email);
        this.users.push(this.currentUser);       
    }

    getOrAddUser(email) {
        this.currentUser = this.users.find(u => u.email === email);      
       
        if (this.currentUser) {
            return this.currentUser.photos;
        }

        this.addNewUser(email);

        return [];       
    }

    addPhotoForCurrentUser(photo) {
        this.currentUser.addPhoto(photo);
    }

    currentUserPhotoCount() {         
        return this.currentUser.photos.length;    
    }

    // get non duplicate random photo frm api
    async getNewRandomPhoto() {
      
        let photoNeeded = true;
        let newRandomPhoto;

        do {
            newRandomPhoto = await apiService.fetchRandomPhoto();          

            if (this.currentUser) {           

                if (this.currentUser.photos.includes(newRandomPhoto)) {                   
                    photoNeeded = true; 
                  
                } else {
                    photoNeeded = false;
                }
            } else {

                photoNeeded = false;
               
            }

        } while (photoNeeded);

        this.randomPhoto = newRandomPhoto;

        return newRandomPhoto;
    }
}

