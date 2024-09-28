import { useEffect, useState } from "react";
import ApiConfig from '../../Consants/ApiConfig'
const Demo=()=>{
    const [data,setData]=useState([]);

    useEffect(() => {
		const fetchDrivers = async () => {

			try {
			  fetch(ApiConfig.getDriversEndpoint())
				.then((response) => response.json())
				.then((data) => {  
				//   setTotalDriver(data.totalUsers);
                setData(data.data);

			  })
			} catch (error) {
				console.error('Error fetching Rides Data', error);
			}
		};
	
		fetchDrivers();
			
	
	}, []);
    return(
        <>
            {
                data.map((driver,index)=>(
                    <h1 className="text-black">driver.id</h1>
                ))
            }
        </>
    )
}
export default Demo;