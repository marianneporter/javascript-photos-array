const baseURL = 'https://picsum.photos';

const fetchRandomPhoto = async () => {
    
    const response = await fetch(`https://picsum.photos/600/400/?random`);  

    console.log(response);    

    if (response.status === 200) {
         return response.url;
    } 

    if (response.status === 404) {
        return 'Cannot find a random photo '
    } 

    return 'An error has occurred - please try later'
 
}  

// const fetchPhoto = async (id) => {
    
//     const response = await fetch(`${baseURL}horses/${id}`,
//                                   { method: 'GET',
//                                            headers: {
//                                             'Content-Type': 'application/json',
//                                             'Authorization': getAuthHeaderValue()}} )                                 
    

//     if (response.status === 200) {
//         return  await response.json()
//     } 

//     if (response.status === 404) {
//         return 'The horse you are looking for could not be found'
//     } 

//     return 'An error has occurred - please try later'
 
// }  