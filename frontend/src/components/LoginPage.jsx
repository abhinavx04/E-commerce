import React,{useState} from 'react';

const LoginPage =() =>{
    const [email ,setEmail]=useState('');
    const [password ,setPassword]=useState('');
    const [error, setError]=useState('');


    const handleLogin =async(loginType) => {
        try{
            const response =await fetch ('http://localhost:5000/api/login',{
                method :'POST',
                headers: {
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({
                    email,
                    password,
                    loginType
                }),
            });

            if(!response.ok){
                const errorData = await response.json();
                throw new Error(errorData.message || 'An error Occured');
            }
            const data = await response.json();
            const { token , user } = data;


            // we are storing the token in localstorage to avoid relogin while refreshing
            localStorage.setItem('token',token);

            //Redirect based on the user type (admin or user)

            if(user.isAdmin){
                console.log('Redirect to admin dashboard');
            }
            else{
                // redirecting to user dashboard
                console.log('Redirect to user dashboard');
            }
        }catch(error){
            setError(error.message ||'an error occurred');
        }
    };
//first div outermost container
//2nd div container for loginPage
//3rd div contains title for login page
// form tag main element containing input fields and buttons
// 4th div contains the input field an styles them with rounded corners and a small window
//5th div containing email input field 

return (
    // CHANGED: Updated background to a subtle pattern more suitable for e-commerce
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8"
         style={{
           backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
           backgroundRepeat: 'repeat',
         }}
    >
      {/* CHANGED: Improved structure and styling of the login box */}
      <div className="max-w-md w-full space-y-8 bg-white rounded-xl shadow-2xl p-10">
      <div>
  <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 flex items-center justify-center">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
    </svg>
    BoltBazaar
  </h2>
  <p className="mt-2 text-center text-sm text-gray-600">
    Sign in to your account
  </p>
</div>
        <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </a>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div className="flex flex-col space-y-4">
            <button
              type="button"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => handleLogin('user')}
            >
              Sign in as Customer
            </button>
            <button
              type="button"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              onClick={() => handleLogin('admin')}
            >
              Sign in as Admin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


export default LoginPage;