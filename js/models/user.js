class User {
    constructor(email) {
        this.email = email;
        this.photos = [];       
    }

    addPhoto(photoUrl) {
        this.photos.unshift(photoUrl);
    }
}