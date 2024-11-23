
     
const fetchWithToken = async (url, options = {}) => {
  try {
    const token = localStorage.getItem('token');
    
    // Include token in the request headers if available
    const headers = {
      ...options.headers,
      Authorization: token ? `Bearer ${token}` : undefined,
    };

    const response = await fetch(url, { ...options, headers });

    // Handle response errors
    if (!response.ok) {
      const errorMessage = await response.text(); // Get error message from response body
      console.error(`Error fetching data: ${response.status} - ${errorMessage}`);
      
      // Handle 401 (unauthorized)
      if (response.status === 401) {
        console.warn('Unauthorized: Token may have expired.');
        localStorage.removeItem('token');
        localStorage.setItem('isAuthenticated', 'false');
        window.location.href = '/login';
      }
      
      // Handle 500 (internal server error)
      if (response.status === 500) {
        console.error('Internal Server Error: Please try again later.');
      }
      
      throw new Error(`Error fetching data: ${errorMessage}`);
    }

    // Return the JSON data from the response
    return await response.json();
  } catch (error) {
    console.error('Error in fetchWithToken:', error.message);
    throw new Error('Something went wrong. Please try again later.');
  }
};

export default fetchWithToken;


