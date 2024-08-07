import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";
import { toast } from "react-toastify";
import { authContext } from "../context/AuthContext.jsx";
import HashLoader from 'react-spinners/HashLoader'
import ReCAPTCHA from 'react-google-recaptcha'
import { useRef } from "react"
 
 
 
const Login = () => {

  const recaptcha = useRef();
  const captchKey = import.meta.env.VITE_CAPTCHA_SITE_KEY;
  

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useContext(authContext);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    // const captchaValue = recaptcha.current.getValue()
    // if (!captchaValue) {
    //   
    //   toast.error("Please click on captha");
    //   setLoading(false);
    //   return
    // }
    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          user: result.data,
          role: result.role,
          token: result.token,
           
        },
      });

      // console.log(result, "login data")
      
      setLoading(false);
      toast.success(result.message);
       
      if (result.role == "patient"){
        navigate("/users/profile/me")
      }
      else{
        if (result.role == "admin"){
          navigate("/admin/profile")
        }
        else{
          navigate("/doctors/profile/me")
        }
      }
      // navigate("/home");
      window.location.reload();
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  return (
    <section className="px-5 lg:px-0">
      <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10">
        <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
          Hello! 
          <span className="text-primaryColor"> welcome </span>
          Back
        </h3>

        <form action="" className="py-4 md:py-0" onSubmit={submitHandler}>
          <div className="mb-5">
            <input
              type="email"
              placeholder="Enter Your Email"
              name="email"
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none 
                  focus:border-b-primaryColor text-[16px] leading-7 text-headingColor 
                  placeholder:text-textColor rounded-md cursor-pointer"
              required
            />
          </div>

          <div className="mb-5">
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none 
                  focus:border-b-primaryColor text-[16px] leading-7 text-headingColor 
                  placeholder:text-textColor rounded-md cursor-pointer"
              required
            />
          </div>
          <ReCAPTCHA ref={recaptcha} sitekey={captchKey} />

          <div className="mt-7">
            <button
              type="submit"
              className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3 hover:bg-blue-800"
            >
              {loading ? <HashLoader size ={25} color='#fff'/> : 'Login'}
              
            </button>
          </div>

          <p className="mt-5 text-textColor text-center">
            Don&apos;t I have an account
            <Link
              to="/register"
              className="text-primaryColor font-medium 
                  ml-1"
            >
              Register
            </Link>
            
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
