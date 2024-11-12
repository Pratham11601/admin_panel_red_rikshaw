
class ApiConfig {
    // Base URL swagger 
    
    static BASE_URL = "http://ec2-3-110-123-252.ap-south-1.compute.amazonaws.com/";
   

  
    
    // API Endpoints

    //login
    // static getLogin() {
      
    //   return `${this.BASE_URL}/api/adminpanel/dashboard`;
    // }

    //dashboard
    static getDashboardData() {
      
      return `${this.BASE_URL}/api/adminpanel/dashboard`;
    }

    //passengers
    static getPassengersEndpoint() {
      
      return `${this.BASE_URL}/api/adminpanel/passengers-getAll?page=1&limit=15`;
    }
    
    //Rides as per passenger
    static getPassengerRidesEndpoint(passengerId) {
      return `${this.BASE_URL}/api/adminpanel/passenger-rides/${passengerId}?page=1&limit=15`;
    }

    //drivers
    static getDriversEndpoint() {
      
      return `${this.BASE_URL}/api/adminpanel/drivers-getAll?page=1&limit=15`;
    }
    //Rides as per driver
    static getDriverRidesEndpoint(driverId) {
      
      return `${this.BASE_URL}/api/adminpanel/driver-rides/${driverId}?page=1&limit=15`;
    }

    //Rides
    static getAllRidesEndpoint(){
      return `${this.BASE_URL}/api/adminpanel/rides-getall?page=1&limit=15`
    } 


    //Transactions
    static getTransactionsEndPoint() {
      
      return `${this.BASE_URL}/api/walletTranfer/get-all?page=1&limit=15`;
    }    

    //Transaction History
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
    static getChargesEndpoint() {
      return `${this.BASE_URL}/api/Charges`;
    }

    static putChargesEndpoint() {
      return `${this.BASE_URL}/api/charges/edit`;
    }


//Advertisement
static getAdvertisementEndpoint() {
  return `${this.BASE_URL}/api/advertisement/getByCategory`;
}

static postAdvertisementEndpoint() {
  return `${this.BASE_URL}/api/advertisement/upload-ads`;
}

static deleteAdvertisementEndpoint(id) {
  return `${this.BASE_URL}/api/advertisement/delete/${id}`;
}

//Benefis
static getBenefitsEndpoint() {
  return `${this.BASE_URL}/api/benifits/fetchForAdmin`;
}

static postBenefitsEndpoint() {
  return `${this.BASE_URL}/api/benifits/create`;
}

static putBenefitsEndpoint(id) {
  return `${this.BASE_URL}/api/benifits/put/${id}`;
}

static deleteBenefitsEndpoint(id) {
  return `${this.BASE_URL}/api/benifits/delete/${id}`;
}


//Delete Users
static getDeletedUsersEndpoint() {
  return `${this.BASE_URL}/api/adminpanel/delete-user`;
}



    
}

  export default ApiConfig;
  