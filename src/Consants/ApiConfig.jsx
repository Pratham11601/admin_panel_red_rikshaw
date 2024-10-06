
class ApiConfig {
    // Base URL swagger 
    
    static BASE_URL = "http://ec2-3-110-123-252.ap-south-1.compute.amazonaws.com/";
  
    // API Endpoints

    //dashboard
    static getDashboardData() {
      
      return `${this.BASE_URL}/api/adminpanel/dashboard`;
    }

    //passengers
    static getPassengersEndpoint() {
      
      return `${this.BASE_URL}/api/adminpanel/passengers-getAll?page=1&limit=15`;
    }

    //drivers
    static getDriversEndpoint() {
      
      return `${this.BASE_URL}/api/adminpanel/drivers-getAll?page=1&limit=15`;
    }

    //Rides
    static getAllRidesEndpoint() {
      
      return `${this.BASE_URL}/api/adminpanel/rides-getAll?page=1&limit=15`;
    }

    //Transaction Request
    static getTransactionHistoryEndPoint() {
      
      return `${this.BASE_URL}/api/adminpanel/transactionshistory?page=1&limit=10`;
    }
    //Transaction Request
    static getTransactionRequestEndPoint() {
      
      return `${this.BASE_URL}/api/adminpanel/transactionsRequest?page=1&limit=15`;
    }
    //Privacy&Policy
    static getPrivacyPolicyEndpoint() {
      
      return `${this.BASE_URL}/api/privacypolicy/getAll`;
    }

    //Terms&Conditions
    static postTermsAndConditionEndpoint() {
        return `${this.BASE_URL}/api/terms/post`;
    }
    static putTermsAndConditionEndpoint(id) {
      return `${this.BASE_URL}/api/terms/edit/${id}`;
    }
    static getTermsAndConditionEndpont() {
        return `${this.BASE_URL}/api/terms/getAll`;
    }

    //charges
    static putChargesEndpont() {
      return `${this.BASE_URL}/api/Charges`;
  }

  static getChargesEndpont() {
    return `${this.BASE_URL}/api/Charges`;
  }


//Advertisement
static getAdvertisementEndpont() {
  return `${this.BASE_URL}/api/advertisement/getByCategory?category=driver`;
  }

static postAdvertisementEndpont() {
    return `${this.BASE_URL}/api/advertisement/driver`;
    }

static deleteAdvertisementEndpont() {
      return `${this.BASE_URL}/api/advertisement/delete`;
      }
}
  
  export default ApiConfig;
  