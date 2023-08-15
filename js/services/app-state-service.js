/*******************************************************************/
/* controls app state, list of users and reference to current user */
/*******************************************************************/
class AppStateService {
    constructor() {
        this.users = [];
        this.currentUser = null;
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
        console.log('in add photo for current user');
        console.log('current user is ' + JSON.stringify(this.currentUser));
        this.currentUser.addPhoto(photo);
    }

    currentUserPhotoCount() {     
      
        return this.currentUser.photos.length;
    
    }
}

