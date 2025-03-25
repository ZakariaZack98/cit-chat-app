import React, { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getDatabase, push, ref, set } from 'firebase/database';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const SignIn = () => {
  const auth = getAuth();
  const db = getDatabase();
  const navigate = useNavigate();
  //setting up states
  const [loginInfo, setLoginInfo] = useState({email: '', password: ''});

  //input change handler================================================
  const handleChange = e => {
    const {name, value} = e.target;
    setLoginInfo({
      ...loginInfo,
      [name]: value
    })
  }

  //google login handler=================================================
  /**
   * TODO: HANDLE SIGN IN VIA GOOGLE
   * @param null
   * return: void
   * **/
  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
    .then(userInfo => {
      const {user} = userInfo;
      const userRef = ref(db, 'users/')
      set(push(userRef), {
        userId: user.uid,
        username: user.displayName,
        email: user.email,
        profile_picture : user.photoURL,
      });
      navigate('/')
      toast.success(`Welcome back, ${user.displayName}`);
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      toast.error('Login failed', errorMessage);
    });
  }



  //submit handler==================================================
  /**
   * TODO: HANDLE SIGN IN WITH EMAIL & PASSWORD
   * @param loginInfo
   * return: void 
   *  **/
  const handleSubmit = e => {
    e.preventDefault();
    const {email, password} = loginInfo;
    signInWithEmailAndPassword(auth, email, password)
    .then(userCred => {
      console.log(userCred);
      toast.success(`Welcome back, ${userCred.user.displayName}`)
      navigate('/')
    })
    .catch(err => toast.error('Login failed', err.message))
  }


  return (
    <div className='signIn flex h-svh font-nunito'>
      <div className="signInLeft h-full w-1/2 flex justify-center items-center">
        <div className="signUpLeftComp flex flex-col justify-center items-start">
          <h1 className="text-[34px] font-bold text-authFontColor">Login to your account</h1>
          <div className='flex gap-x-3 border-gray-200 border-1 border-solid rounded-2xl px-15 py-4 my-5 cursor-pointer' onClick={handleGoogleLogin}>
            <span className='text-2xl'><FcGoogle/></span>
            <p className='text-sm text-authFontColor'>Login with google</p>
          </div>
          <form action="#" className="flex flex-col gap-y-10 my-4">
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                value={loginInfo.email}
                onChange={(e) => handleChange(e)}
                className="block px-7.5 pb-2.5 pt-4 w-[368px] h-[70px] text-xl text-gray-900 bg-transparent rounded-lg border-1 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-500 focus:border-2 peer"
                required
              />
              <label
                htmlFor="email"
                className={`absolute text-xl text-gray-500 duration-300 transform bg-white px-2 ${
                  loginInfo.email
                    ? "scale-80 -translate-y-6 top-2"
                    : "-translate-y-3 top-1/2"
                } left-7.5 origin-[0] peer-focus:scale-80 peer-focus:-translate-y-6 peer-focus:top-2`}
              >
                Your Email
              </label>
            </div>
            <div className="relative">
              <input
                type="password"
                id="password"
                name="password"
                value={loginInfo.password}
                onChange={(e) => handleChange(e)}
                className="block px-7.5 pb-2.5 pt-4 w-[368px] h-[70px] text-xl text-gray-900 bg-transparent rounded-lg border-1 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-500 focus:border-2 peer"
                required
              />
              <label
                htmlFor="password"
                className={`absolute text-xl text-gray-500 duration-300 transform bg-white px-2 ${
                  loginInfo.password
                    ? "scale-80 -translate-y-6 top-2"
                    : "-translate-y-3 top-1/2"
                } left-7.5 origin-[0] peer-focus:scale-80 peer-focus:-translate-y-6 peer-focus:top-2`}
              >
                Password
              </label>
            </div>
            <button
              type="submit"
              className="w-106 h-20 bg-mainColor rounded-lg font-semibold text-white text-xl cursor-pointer"
              onClick={(e) => handleSubmit(e)}
            >
              Login to continue
            </button>
          </form>
          <p className="text-center mt-8 text-authFontColor">
              Don't have an account?{" "}
              <Link to={'/signup'} className="text-mainColor cursor-pointer font-bold">
                Sign Up
              </Link>
            </p>
        </div>
      </div>
      <div className="signInRight h-full w-1/2 bg-center bg-cover bg-no-repeat"></div>
    </div>
  )
}

export default SignIn