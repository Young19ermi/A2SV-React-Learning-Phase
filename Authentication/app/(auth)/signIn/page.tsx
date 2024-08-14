"use client";
import { useEffect } from "react";
import {useForm} from "react-hook-form";
import { signIn } from "next-auth/react";

interface FormInput {
    email:string,
    password:string
}


const Login = () => {

    const {register,formState,handleSubmit,reset} = useForm<FormInput>({
        defaultValues: {
            email: "",
            password: ""
          },
    })
    const {errors,isSubmitSuccessful} = formState


    const onSubmit =(data:FormInput)=>{
        signIn("credentials",{
            email:data.email,
            password:data.password,
            redirect:true,
            callbackUrl:'/'
        })

    }

    useEffect(()=>{
        if(isSubmitSuccessful){
            
          reset()
        }
      },[isSubmitSuccessful,reset])

    return (
        <div className="flex items-center justify-center min-h-screen bg-white p-4">
            <div className="flex flex-col md:flex-row w-full md:w-3/4 bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="flex flex-col justify-end md:w-1/2 p-10 text-left md:text-left border-[5px] border-white rounded-2xl">
                </div>
                <div className="flex flex-col gap-4 lg:w-1/2 p-10 bg-white">
                    <h2 className="text-3xl text-center md:text-5xl font-semibold mb-2">
                        Welcome Back,
                    </h2>

                    <div className="flex items-center justify-center">
                        <button
                            className="w-full flex items-center justify-center bg-white text-black font-bold py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={() => signIn("google",{
                                redirect:true,
                                callbackUrl:'/'
                            })}
                        >
                            <img
                                src="https://img.icons8.com/color/16/000000/google-logo.png"
                                className="mr-2"
                                alt="Google logo"
                            />
                            Sign In with Google
                        </button>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="border-b-2 w-1/4"></div>
                        <div className="text-sm font-light">Or Login with Email</div>
                        <div className="border-b-2 w-1/4"></div>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="email"
                            >
                                Email Address
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
                        <div className="mb-4">
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
                        <button
                            className="w-full bg-[#1b1787] text-white font-bold py-2 px-4 rounded-3xl hover:bg-[#6E62E5] focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Login
                        </button>
                    </form>
                    <div className="flex items-center justify-start mb-4 gap-2">
                        <p>Don’t have an account?</p>
                        <a href="#" className="text-sm text-blue-500 hover:underline">
                            Sign Up
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;