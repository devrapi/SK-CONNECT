import React, { useState ,useContext} from 'react'
import ApiService from '../../Services/ApiService';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../Context/AppContext';
const register = () => {

    const {token, setToken} = useContext(AppContext);
    const[form , setForm] = useState({
      name: '',
      email: '',
      password: '',
      password_confirmation: ''
    });
    const [errors, setErrors] = useState({});
    const[validate , setValidate] = useState("");
    const navigate = useNavigate();


    const HandleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await ApiService.post('/register', form);

            const token = response.data.token;
              localStorage.setItem("token" ,token);
              setToken(token);
              navigate('/index');

        } catch (error) {
            console.log('Error during registration:', error.response?.data || error.message);

            if (error.response?.status === 422) {
                setForm({ name: '',
                    email: '',
                    password: '',
                    password_confirmation: ''});
                setErrors(error.response.data.errors);

            }else if(error.response?.status === 400){

                    setValidate(error.response.data.message);
            }

            else {
                setErrors({ global: 'An unexpected error occurred during registration.' });
            }


        }
    }

  return (
    <>
<div className="flex items-center justify-center h-[80vh]">
<div className="relative flex flex-col p-6 text-gray-700 bg-white shadow-xl rounded-xl bg-clip-border ">
    <h4 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
      Sign Up
    </h4>
    <p className="block mt-1 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
      Enter your details to register.
    </p>
    <form className="max-w-screen-lg mt-8 mb-2 w-80 sm:w-96">
      <div className="flex flex-col gap-6 mb-4">
        <div className="relative h-11 w-full min-w-[200px]">
          <input
            className="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200 text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-green-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            placeholder=" " value={form.name} onChange={(event) => {setForm({...form, name: event.target.value})}}
          />
           {errors.name && <span  className='text-xs text-red-600'>{errors.name}</span>}
           {validate && <span  className='text-xs text-red-600'>{validate}</span>}
          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-green-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-green-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-green-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Name
          </label>
        </div>
        <div className="relative h-11 w-full min-w-[200px]">
          <input
            className="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200 text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-green-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            placeholder=" " value={form.email} onChange={(event) => {setForm({...form, email: event.target.value})}}
          />
           {errors.email && <span  className='text-xs text-red-600'>{errors.email}</span>}
          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-green-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-green-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-green-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Email
          </label>
        </div>
        <div className="relative h-11 w-full min-w-[200px]">
          <input
            type="password"
            className="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200 text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-green-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            placeholder=" " value={form.password} onChange={(event) => {setForm({...form, password: event.target.value})}}
          />
           {errors.password && <span className='text-xs text-red-600'>{errors.password}</span>}
          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-green-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-green-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-green-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Password
          </label>
        </div>
        <div className="relative h-11 w-full min-w-[200px]">
          <input
            type="password"
            className="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200 text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-green-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 "
            placeholder=" " value={form.password_confirmation} onChange={(event) => {setForm({...form, password_confirmation: event.target.value})}}
          />
           {errors.password && <span className='mb-2 text-xs text-red-600'>{errors.password}</span>}
          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-green-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-green-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-green-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Confirm Password
          </label>
        </div>
      </div>

      <div className="inline-flex items-center ">
        <label
          className="relative -ml-2.5 flex cursor-pointer items-center rounded-full p-3"
          htmlFor="checkbox"
          data-ripple-dark="true"
        >
          <input
            type="checkbox"
            className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:bg-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
            id="checkbox"
          />
          {/* <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5"
              viewBox="0 0 20 20"
              fill="currentColor"
              strokeWidth="currentColor"
              stroke-width="1"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </span> */}
        </label>
        <label
          className="mt-px font-light text-gray-700 cursor-pointer select-none"
          htmlFor="checkbox"
        >
          <p className="flex items-center font-sans text-sm antialiased font-normal leading-normal text-gray-700">
            I agree the
            <a
              className="font-semibold transition-colors hover:text-blue-500"
              href="#"
            >
              &nbsp;Terms and Conditions
            </a>
          </p>
        </label>
      </div>
      <button
        className="mt-6 block w-full select-none rounded-lg bg-green-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        type="button"
        data-ripple-light="true"
        onClick={HandleSubmit}
      >
        Register
      </button>
      <p className="block mt-4 font-sans text-base antialiased font-normal leading-relaxed text-center text-gray-700">
        Already have an account?
        <a
          className="font-semibold text-green-500 transition-colors hover:text-blue-700"
          href="#"
        >
          Sign In
        </a>
      </p>
    </form>

  </div>




</div>
    </>
  )
}

export default register
