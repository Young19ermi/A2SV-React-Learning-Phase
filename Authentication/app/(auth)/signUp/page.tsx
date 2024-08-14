"use client"
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import {useForm} from "react-hook-form";
import { useRouter } from "next/navigation";
import VerifyEmail from "./verify/page"

interface FormInput {
    name:string,
    email:string,
    password:string,
    confirmPassword:string,
    role:string
}


const SignUp = ()=>{

    const [Values , setValues] = useState<FormInput>({name: "",email: "",password: "",confirmPassword: "",role: ""})
    const [isSignup,setisSignup] = useState(false)
    const {register,formState,handleSubmit,reset} = useForm<FormInput>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            role: "user",
          },
    })
    const {errors,isSubmitSuccessful} = formState

    const router = useRouter()

    const onSubmit = async (data:FormInput)=>{
      
      
      const res = await fetch("https://akil-backend.onrender.com/signup",{
        method:"POST",
        body:JSON.stringify(data),
        headers:{
          "Content-Type": "application/json",
        }}).then(res => res.json())
        
        
        if(res.success){
          setValues(data)
          setisSignup(true)
        console.log('i was here')

      }

    }

    // useEffect(()=>{
    //     if(isSubmitSuccessful){
            
    //       reset()
    //     }
    //   },[isSubmitSuccessful,reset])


    return (
        <>
        {
          !isSignup?(

        <div className="flex items-center justify-center min-h-screen bg-white p-2">

          <div className=" flex flex-col gap-4  w-3/5 lg:w-1/3 p-10 bg-white rounded-lg shadow-lg overflow-hidden">
            <h2 className="text-4xl font-extrabold mb-2 text-center text-[#25324B]">
              Sign Up Today
            </h2>
              <div className="flex items-center justify-center">
                <button
                  className="w-full flex items-center justify-center bg-white text-blue-600 font-bold py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={() => signIn("google")}
                >
                  <img
                    src="https://img.icons8.com/color/16/000000/google-logo.png"
                    className="mr-2"
                    alt="Google logo"
                    onClick={() => signIn("google",{
                      redirect:true,
                      callbackUrl:'/'
                  })}
                  />
                  Sign In with Google
                </button>
              </div>
            <div className="flex justify-between items-center gap-2">
                <div className="border-b-2 w-1/4"></div>
                <div className="text-xs font-light">Or Sign Up with Email</div>
                <div className="border-b-2 w-1/4"></div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} >
              <div className="mb-4">
                <div className="mb-4">
                    <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="email"
                    >
                    Full Name
                    </label>
                    <input
                    className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline"
                    type="text"
                    id="name"
                    {...register("name", {
                        required: {
                          value: true,
                          message: "name is required",
                        },
                      })}
                    placeholder="Enter your full name"
                    />
                </div>
                <div className="mb-4">
                    <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="email"
                    >
                    Email Adress
                    </label>
                    <input
                    className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline"
                    type="email"
                    id="email"
                    {...register("email", {
                        required: {
                          value: true,
                          message: "Email is required",
                        },
                      })}
                    placeholder="Enter email address"
                    />
                </div>
                <div  className="mb-4">

                    <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="password"
                    >
                    Password
                    </label>
                    <input
                    className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline"
                    type="password"
                    id="password"
                    {...register("password", {
                        required: {
                          value: true,
                          message: "password is required",
                        },
                      })}
                    placeholder="Enter password"
                    />
                </div>
                <div  className="mb-4">

                    <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="password"
                    >
                        Confirm Password
                    </label>
                    <input
                    className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline"
                    type="password"
                    id="cpassword"
                    {...register("confirmPassword", {
                        required: {
                          value: true,
                          message: "password is required",
                        },
                      })}
                    placeholder="Enter password"
                    />
                </div>

                <button
                    className="w-full bg-[#1b1787] text-white font-bold py-2 px-4 rounded-3xl hover:bg-[#6E62E5] focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Continue
                </button>
              </div>
            </form>
              <div className="flex items-center justify-start mb-4 gap-2 ">
                <p>
                    Already have an account?
                </p>
                <a href="#" className="text-sm text-blue-500 hover:underline">
                  Login
                </a>
              </div>
              <div className="font-light text-xs ">
                    By clicking 'Continue', you acknowledge that you have read and accepted our
                    <a href="#" className="text-xs font-semibold text-blue-500 hover:underline">Terms of Service.</a>
                    and <a href="#" className="text-xs font-semibold text-blue-500 hover:underline">Privacy Policy.</a>
                
              </div>
          </div>
      </div>
          ):(
            <VerifyEmail email = {Values.email}  name = {Values.name} password = {Values.password} confirmPassword = {Values.confirmPassword} role ={Values.role}/>
          )

        }
        
        </>
    )
}
export default SignUp;







