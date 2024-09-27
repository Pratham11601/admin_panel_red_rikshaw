
class ApiConfig {
    // Base URL swagger 
    
    static BASE_URL = "http://ec2-3-110-123-252.ap-south-1.compute.amazonaws.com/";
  
    // API Endpoints
    static getDriversEndpoint() {
      
      return `${this.BASE_URL}/api/adminpanel/drivers-getAll`;
    }
    static getAllRidesEndpoint() {
      
      return `${this.BASE_URL}/api/adminpanel/rides-getAll`;
    }
    static getPrivacyPolicyEndpoint() {
      
      return `${this.BASE_URL}/api/privacypolicy/getAll`;
    }
  
    static postTermsAndConditionEndpoint() {
        return `${this.BASE_URL}/api/terms/post`;
    }
    
    static putTermsAndConditionEndpoint(id) {
      return `${this.BASE_URL}/api/terms/edit/${id}`;
  }

    static getTermsAndConditionEndpont() {
        return `${this.BASE_URL}/api/terms/getAll`
    }

  }
  
  export default ApiConfig;
  