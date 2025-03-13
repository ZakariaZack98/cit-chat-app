import React, { useState } from "react";
import { SignUpData } from "../../lib/lib";

const SignUp = () => {
  const signUpData = SignUpData();
  
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');

  const handleEmail = (input) => {
    setEmail(input);
  }
  const handleFullName = (input) => {
    setFullName(input);
  }
  const handlePassword = (input) => {
    setPassword(input);
  }

  return (
    <div className="signUpPage flex justify-center items-center">
      <div className="signUpLeft w-1/2 h-svh font-nunito flex justify-center items-center">
        <div className="flex flex-col justify-center items-start">
        <h1 className="text-[34px] font-bold text-authFontColor">
          Get started with easily register
        </h1>
        <p className="opacity-45 text-xl my-3">
          Free register and you can enjoy it
        </p>
        <form action="#" className="py-5">
          {signUpData?.map((item) => {
            return (
              <div className="relative my-6" key={item.name}>
                <input
                  type={
                    item.name === "email"
                      ? "email"
                      : item.name === "password"
                      ? "password"
                      : "text"
                  }
                  id={
                    item.name === "email"
                      ? "email"
                      : item.name === "password"
                      ? "password"
                      : "text"
                  }
                  name={
                    item.name === "email"
                      ? "email"
                      : item.name === "password"
                      ? "password"
                      : "text"
                  }
                  value={
                    item.name === "email"
                      ? email
                      : item.name === "password"
                      ? password
                      : fullName
                  }
                  onChange={
                    item.name === "email"
                      ? (e) => handleEmail(e.target.value)
                      : item.name === "password"
                      ? (e) => handlePassword(e.target.value)
                      : (e) => handleFullName(e.target.value)
                  }
                  className="block px-7.5 pb-2.5 pt-4 w-[368px] h-[70px] text-xl text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-gray-500 focus:border-2 peer"
                  placeholder=" "
                />
                <label
                  htmlFor={
                    item.name === "email"
                      ? "email"
                      : item.name === "password"
                      ? "password"
                      : "text"
                  }
                  className="absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-8 peer-focus:px-2 peer-focus:text-gray-400 peer-focus:dark:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-70 peer-focus:ms-5 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                >
                  {
                    item.name === "email"
                      ? "Your Email"
                      : item.name === "password"
                      ? "Password"
                      : "Full Name"
                  }
                </label>
              </div>
            );
          })}
          <button type="submit" className="px-2 w-[368px] bg-mainColor rounded-4xl text-white h-[68px] font-semibold text-xl cursor-pointer">Sign Up</button>
          <p className="text-center mt-8 text-authFontColor">Already have an account? <span className="text-mainColor cursor-pointer font-bold">Sign Up</span></p>
        </form>
        </div>
      </div>
      <div className="signUpRight w-1/2 h-svh bg-red-500 bg-center bg-cover bg-no-repeat"></div>
    </div>
  );
};

export default SignUp;
