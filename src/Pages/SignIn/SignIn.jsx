import React from 'react'
import { FcGoogle } from 'react-icons/fc'

const SignIn = () => {
  return (
    <div className='signIn flex h-svh font-nunito'>
      <div className="signInLeft h-full w-1/2 flex justify-center items-center">
        <div className="signUpLeftComp flex flex-col justify-center items-start">
          <h1 className="text-[34px] font-bold text-authFontColor">Login to your account</h1>
          <div className='flex gap-x-3 border-gray-200 border-1 border-solid rounded-2xl px-15 py-4 my-5 cursor-pointer'>
            <span className='text-2xl'><FcGoogle/></span>
            <p className='text-sm text-authFontColor'>Login with google</p>
          </div>
          <form action="#" className='flex flex-col gap-y-10 my-4'>
            <div className="relative">
              <input type="email" id='email' name='email' className="block px-7.5 pb-2.5 pt-4 w-[368px] h-[70px] text-xl text-gray-900 bg-transparent rounded-lg border-1 border-gray-200 appearance-none  dark:focus:border-gray-200 focus:outline-none focus:ring-0 focus:border-gray-500 focus:border-2 peer" required/>
              <label htmlFor="email" className="absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform translate-y-3 top-2 z-10 origin-[0] bg-white px-8 peer-focus:px-2 peer-focus:text-gray-400 peer-focus:dark:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-80 peer-focus:ms-5 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Your Email</label>
            </div>
            <div className="relative">
              <input type="password" id='password' name='password' className="block px-7.5 pb-2.5 pt-4 w-[368px] h-[70px] text-xl text-gray-900 bg-transparent rounded-lg border-1 border-gray-200 appearance-none dark:focus:border-gray-200 focus:outline-none focus:ring-0 focus:border-gray-500 focus:border-2 peer" required/>
              <label htmlFor="password" className="absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform translate-y-3 top-2 z-10 origin-[0] bg-white px-8 peer-focus:px-2 peer-focus:text-gray-400 peer-focus:dark:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-80 peer-focus:ms-5 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Password</label>
            </div>
            <button className='w-106 h-20 bg-mainColor rounded-lg font-semibold text-white text-xl cursor-pointer'>Login to continue</button>
          </form>
          <p className="text-center mt-8 text-authFontColor">
              Don't have an account?{" "}
              <span className="text-mainColor cursor-pointer font-bold">
                Sign Up
              </span>
            </p>
        </div>
      </div>
      <div className="signInRight h-full w-1/2 bg-center bg-cover bg-no-repeat"></div>
    </div>
  )
}

export default SignIn