"use client";
import React, { useState, useEffect } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config.js";
import Button from "@/components/Button";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import { updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { FaGoogle } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const [
        createUserWithEmailAndPassword,
        userCredential,
        // Resulting user credential object from the last signup attempt (or undefined if none)
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);

    const handleSignUp = async () => {
        const result = await createUserWithEmailAndPassword(email, password);
        if (result?.user) {
            // if user exists then update name
            await updateProfile(result.user, { displayName: name });
            await result.user.reload();
            // reload so it displays in UI
        }
    };

    // This is for google accounts
    const handleGoogleSignUp = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            toast.success("Signed up with Google");
            router.push("/dashboard");
        } catch (error) {
            console.error("Google Sign-Up error:", error.message);
            toast.error("Google Sign-Up failed");
        }
    };

    // to reset variables
    useEffect(() => {
        if (userCredential) {
            setName("");
            setEmail("");
            setPassword("");
            toast.success("Account created! You can now log in.");
            router.push("/dashboard");
        }
    }, [userCredential]);

    useEffect(() => {
        if (error) {
            if (error.code === "auth/email-already-in-use") {
                toast.error("Email already in use");
            } else {
                toast.error("Signup failed, try again");
            }
            console.error("Signup error:", error.code, error.message);
        }
    }, [error]);

    return (
        <main className="min-h-screen flex items-center justify-center bg-[#050521] px-3">
            <ToastContainer />
            <div
                className="bg-blue-950/20 p-8 rounded-2xl shadow-lg w-full max-w-md"
                style={{ boxShadow: "0 0 10px #64b5f6, 0 0 20px #64b5f6, 0 0 40px #64b5f6" }}
            >
                <h2 className="text-3xl font-medium text-center text-white mb-6">Sign Up</h2>

                <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
                    {/* Name */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-white mb-1">
                            Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            className="w-full border border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            placeholder="Your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            className="w-full border border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-white mb-1">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            className="w-full border border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <Button onClick={handleSignUp} disabled={loading}>
                        {loading ? "Signing Up..." : "Sign Up"}
                    </Button>

                    <div className="flex items-center gap-3 text-white/60 text-sm mt-1 mb-2">
                        <div className="flex-1 h-px bg-white/20" />
                        <span>or</span>
                        <div className="flex-1 h-px bg-white/20" />
                    </div>

                    <Button onClick={handleGoogleSignUp} variant="secondary">
                        <FaGoogle className="text-blue-300 size-4 mr-2" />
                        Continue with Google
                    </Button>
                </form>

                <p className="text-sm text-center text-white/60 mt-6">
                    Already have an account?{" "}
                    <Link href="/login" className="text-blue-300 hover:underline">
                        Log In
                    </Link>
                </p>
            </div>
        </main>
    );
};

export default Signup;