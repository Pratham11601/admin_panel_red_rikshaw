
class ApiConfig {
    // Base URL swagger 
    
    static BASE_URL = "http://ec2-3-110-123-252.ap-south-1.compute.amazonaws.com/";
   

  
    
    // API Endpoints

    //login
    // static getLogin() {
      
    //   return `${this.BASE_URL}/api/adminpanel/dashboard`;
    // }

    static getLogin(){
      return `${this.BASE_URL}/api/admin/login`
    }

    //dashboard
    static getDashboardData() {
      
      return `${this.BASE_URL}/api/adminpanel/dashboard`;
    }

    //Search user
    static getSearchUserEndpoint(phone) {
      return `${this.BASE_URL}/api/adminpanel/search/${phone}`;
    }

    //passengers
    static getPassengersEndpoint() {
      
      return `${this.BASE_URL}/api/adminpanel/passengers-getAll?page=1&limit=15`;
    }
    
    //Rides as per passenger
    static getPassengerRidesEndpoint(passengerId) {
      return `${this.BASE_URL}/api/adminpanel/passenger-rides/${passengerId}?page=1&limit=15`;
    }
    

    //Block passenger or driver
static putBlockStatus(id) {
  return `${this.BASE_URL}/api/adminpanel/block-status/${id}`;
}


//edit passenger details
static putEditPassengerDetails(id){
  return `${this.BASE_URL}/api/adminpanel/edit-passenger/${id}`
}

//edit driver details
static putEditDriverDetails(id) {
  return `${this.BASE_URL}/api/adminpanel/edit-driver/${id}`;
}


    //drivers
    static getDriversEndpoint() {
      
      return `${this.BASE_URL}/api/adminpanel/drivers-getAll?page=1&limit=15`;
    }
    //Rides as per driver
    static getDriverRidesEndpoint(driverId) {
      
      return `${this.BASE_URL}/api/adminpanel/driver-rides/${driverId}?page=1&limit=15`;
    }
    //transactionhistory as per driver
    static getDriverTransactionHistoryEndpoint(driverId,currentPage,itemsPerPage){
      return `${this.BASE_URL}/api/adminpanel/transactions-history?userId=${driverId}&page=${currentPage}&limit=${itemsPerPage}`;
    }

    static patchVehicleDetails(userId){
      return `${this.BASE_URL}/api/drivers/edit-vehicles-details/${userId}`;
    }

    //Rides
    // static getAllRidesEndpoint(){
    //   return `${this.BASE_URL}/api/adminpanel/rides-getall?page=1&limit=15`
    // }
    static getAllRidesEndpoint(currentPage,itemsPerPage){
      return `${this.BASE_URL}/api/adminpanel/rides-getall?page=${currentPage}&limit=${itemsPerPage}`
    } 


    //Transactions
    
    static getTransactionsEndPoint(currentPage) {
      
      return `${this.BASE_URL}/api/adminpanel/all-transactions?page=${currentPage}&limit=10`;
    }

    
    

    //Transaction History
    static getTransactionHistoryEndPoint() {
      
      return `${this.BASE_URL}/api/adminpanel/transactionshistory?page=1&limit=10`;
    }



    //Transaction Request
    static getTransactionRequestEndPoint() {
      
      return `${this.BASE_URL}/api/adminpanel/transactionsRequest?page=1&limit=15`;
    }

    static putTransactionRequestEndPoint() {
      
      return `${this.BASE_URL}/api/adminpanel/transactionsRequest-update`;
    }
//  static putTransactionRequestEndPoint(id) {
//     return `${this.BASE_URL}/api/adminpanel/transaction-request/${id}`;
//   }


    //Privacy&Policy
    static getPrivacyPolicyEndpoint() {
      
      return `${this.BASE_URL}/api/privacypolicy/getAll`;
    }
    static postPrivacyPolicyEndpoint() {
      
      return `${this.BASE_URL}/api/privacypolicy/post`;
    }

    static putPrivacyPolicyEndpoint(id) {
      
      return `${this.BASE_URL}/api/privacypolicy/edit/${id}`;
    }

    static deletePrivacyPolicyEndpoint(id) {
      
      return `${this.BASE_URL}/api/privacypolicy/delete/${id}`;
    }

    //Terms&Conditions

static postTermsAndConditionEndpoint() {
  return `${this.BASE_URL}/api/terms/post`;
}

static putTermsAndConditionEndpoint(id) {
  return `${this.BASE_URL}/api/terms/edit/${id}`;
}

static getTermsAndConditionEndpoint() {
  return `${this.BASE_URL}/api/terms/getAll`;
}

static deleteTermsAndConditionEndpoint(id) {
  return `${this.BASE_URL}/api/terms/delete/${id}`;
}
    //charges
    static getChargesEndpoint() {
      return `${this.BASE_URL}/api/charges`;
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

static deleteAdvertisementEndpoint() {
  return `${this.BASE_URL}/api/advertisement/delete`;
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
  return `${this.BASE_URL}/api/adminpanel/getAllDeleted`;
}

static postAddMoneyEndpoint() {
  return `${this.BASE_URL}/api/adminpanel/add-money`;
}



//How it works
// static getHowItWorksEndpoint() {
//   return `${this.BASE_URL}/api/howItWorks/fetch`;
// }

static getHowItWorksEndpoint(userType, type) {
  return `${this.BASE_URL}/api/howItWorks/fetchByTypeAndUser/${userType}/${type}`;
}

static postHowItWorksEndpoint() {
  return `${this.BASE_URL}/api/howItWorks/create`;
}

static putHowItWorksEditEndpoint(id) {
  return `${this.BASE_URL}/api/howItWorks/edit/${id}`;
}


static deleteHowItWorksEndpoint(id) {
  return `${this.BASE_URL}/api/howItWorks/delete/${id}`;
}

    
}

  export default ApiConfig;
  