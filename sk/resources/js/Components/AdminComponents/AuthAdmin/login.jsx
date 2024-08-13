import React, {  useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import ApiService from '../../Services/ApiService';
import { AppContext } from '../../Context/AppContext';

const login = () => {

    const {token, setToken} = useContext(AppContext);
    const[form , setForm] = useState({
        email: '',
        password: '',

      });
      const [errors, setErrors] = useState({});
      const navigate = useNavigate();


      const HandleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await ApiService.post('/admin/login', form);

            if (response.status === 200) { // Check if the response status is 200 (OK)
                const token = response.data.token;
                localStorage.setItem("token", token);
                setToken(token);
                navigate('/admin/dashboard');
            }

        } catch (error) {
            console.log('Error during login:', error.response?.data || error.message);

            if (error.response?.status === 422) {
                setForm({
                    email: '',
                    password: ''
                });
                setErrors(error.response.data.errors);
            } else if (error.response?.status === 401) { // Handle incorrect password
                setErrors({ global: 'Incorrect email or password. Please try again.' });
            } else {
                setErrors({ global: 'An unexpected error occurred during login.' });
            }
        }
    }


  return (
    <>
        <section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      {/* <a href="#" className="flex items-center mb-10 text-4xl font-semibold text-green-500 dark:text-green">

          SK CONNECT ADMIN
      </a> */}
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Admin Login
              </h1>
              <form className="space-y-4 md:space-y-6" >
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="email@gmail.com" required="" value={form.email} onChange={(event) => {setForm({...form, email: event.target.value})}}/>
                      {errors.email && <span  className='text-xs text-red-600'>{errors.email}</span>}
                  </div>

                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" name="password"  placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" value={form.password} onChange={(event) => {setForm({...form, password: event.target.value})}}/>
                      {errors.password && <span  className='text-xs text-red-600'>{errors.password}</span>}
                  </div>
                  <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input  aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                      </div>
                  </div>
                  <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={HandleSubmit}>Login</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400" >
                      Already have an account? <Link to="/admin/register" className="font-medium text-blue-500 hover:underline dark:text-primary-500">Login here</Link>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
    </>
  )
}

export default login
