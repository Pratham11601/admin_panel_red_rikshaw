
const fetchWithToken = async (url, options = {}) => {
       // Get the token from localStorage
       const token = localStorage.getItem('token');
     
       // If token is available, include it in the request headers
       if (token) {
         options.headers = {
           ...options.headers,
           Authorization: `Bearer ${token}`,
         };
       }
     
       try {
         const response = await fetch(url, options);
     
         // If the response is unauthorized (status 401), it indicates token expiration
         if (response.status === 401) {
           // Handle token expiration, log the user out or refresh token
           localStorage.removeItem('token');
           localStorage.setItem('isAuthenticated', 'false');
           window.location.href = '/login'; // Redirect to login page
           throw new Error('Token expired or unauthorized. Please log in again.');
         }
     
         // Check if the request was successful (status 200-299)
         if (!response.ok) {
           throw new Error('Something went wrong. Please try again later.');
         }
     
         // Parse and return the response data (assuming the response is JSON)
         return response.json();
       } catch (error) {
         console.error('Error in fetchWithToken:', error);
         throw error; // Rethrow the error to be handled by the calling function
       }
     };
     
     export default fetchWithToken;
     