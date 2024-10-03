const PageNotFound =()=>{
    return(
        <>
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-9xl font-bold text-indigo-600">404</h1>
            <h2 className="text-2xl md:text-3xl font-medium mt-4">
                Oops! Page not found.
            </h2>
            <p className="text-gray-600 mt-2 text-center">
                Sorry, the page you're looking for doesn't exist or has been moved.
            </p>
            <Link to="/Home/Dashboard" className="mt-6 px-6 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition duration-300">
                Go back home
            </Link>
         </div>
        
        </>
    )
}

export default PageNotFound;