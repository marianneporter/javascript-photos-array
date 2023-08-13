class ApiService {
    constructor() {
        this.baseURL = "https://picsum.photos"
    } 

    async fetchRandomPhoto() {
        const response = await fetch(`https://picsum.photos/600/400/?random`);  
    
        if (response.status === 200) {
             return response.url;
        } 
    
        if (response.status === 404) {
            return 'Cannot find a random photo '
        } 
    
        return 'An error has occurred - please try later'        
    }
}

