"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface FormInput {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
}

import Link from "next/link";

const VerifyEmail: React.FC<FormInput> = ({ email, name, password, confirmPassword, role }) => {
    const [otp, setOtp] = useState<string[]>(['', '', '', '']);
    const [timer, setTimer] = useState<number>(30);
    const [resendEnabled, setResendEnabled] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else {
            setResendEnabled(true);
            if (interval) clearInterval(interval);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [timer]);

    const handleChange = (index: number, value: string) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const otpValue = otp.join('');
        console.log(otpValue);
        const res = await fetch("https://akil-backend.onrender.com/verify-email", {
            method: "POST",
            body: JSON.stringify({
                email: email,
                OTP: otpValue
            }),
            headers: {
                "Content-Type": "application/json",
            }
        }).then(res => res.json());

        console.log(res);
        router.push("/signIn");
    };

    const handleResend = async () => {
        if (!resendEnabled) return;

        // Resend OTP logic
        const res = await fetch("https://akil-backend.onrender.com/signup",{
            method:"POST",
            body:JSON.stringify({email,name,password,confirmPassword,role}),
            headers:{
              "Content-Type": "application/json",
            }}).then(res => res.json())

        console.log(res);
        setResendEnabled(false);
        setTimer(30); 
    };
    return (
        <div className="flex items-center justify-center min-h-screen bg-white p-2">
            <div className="flex flex-col gap-6 w-full max-w-lg p-12 bg-white rounded-lg shadow-lg overflow-hidden">
                <h2 className="text-4xl font-extrabold mb-4 text-center text-[#25324B]">
                    Verify Email
                </h2>
                <div className="font-light text-sm">
                    We've sent a verification code to the email address you provided. To complete the verification process, please enter the code here.
                </div>
                <form>
                    <div className="mb-6">
                        <div className="flex justify-between mb-6">
                            {otp.map((value, index) => (
                                <input
                                    key={index}
                                    className="w-16 text-center px-2 py-2 text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline"
                                    type="text"
                                    placeholder="0"
                                    maxLength={1}
                                    value={value}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                />
                            ))}
                        </div>
                        <div className="mb-6 text-center">
                            You can request to
                            <div className="my-2">
                                <button
                                    className="text-blue-800 font-extrabold"
                                    onClick={handleResend}
                                    disabled={!resendEnabled}
                                >
                                    Resend
                                </button>
                            </div>
                            in
                            <div className="text-blue-800 font-extrabold">{`0:${timer < 10 ? `0${timer}` : timer}`}</div>
                        </div>
                        <button
                            className="w-full bg-[#1b1787] text-white font-bold py-3 px-6 rounded-3xl hover:bg-[#6E62E5] focus:outline-none focus:shadow-outline"
                            type="submit"
                            onClick={handleSubmit}
                        >
                            Continue
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
    
};

export default VerifyEmail;
