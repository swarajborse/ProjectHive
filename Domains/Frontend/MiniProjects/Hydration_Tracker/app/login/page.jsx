"use client";
import { useState, useEffect } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config.js";
import Button from "@/components/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const [
        signInWithEmailAndPassword,
        userCredential,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const handleLogin = () => {
        signInWithEmailAndPassword(email, password);
    };

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            toast.success("Signed in with Google");
            router.push("/dashboard");
        } catch (err) {
            console.error("Google Sign-In error:", err.message);
            toast.error("Google Sign-In failed");
        }
    };


    // to reset  values
    useEffect(() => {
        if (userCredential) {
            console.log("User logged in:", userCredential);
            setEmail("");
            setPassword("");
            router.push('/dashboard');
        }
    }, [userCredential]);

    useEffect(() => {
        if (error) {
            if (error.code === "auth/invalid-credential") {
                toast.error("Invalid email or password.");
            }
            console.error("Login error:", error.code, error.message);
        }
    }, [error]);

    return (
        <main className="min-h-screen flex items-center justify-center bg-[#050521] px-3">
            <ToastContainer/>
            <div
                className="bg-blue-950/20 p-8 rounded-2xl shadow-lg w-full max-w-md"
                style={{ boxShadow: "0 0 10px #64b5f6, 0 0 20px #64b5f6, 0 0 40px #64b5f6" }}
            >
                <h2 className="text-3xl font-medium text-center text-white mb-6">Log In</h2>

                <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            className="w-full border border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-white mb-1">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            className="w-full border border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <Button onClick={handleLogin} disabled={loading}>
                        {loading ? "Logging In..." : "Log In"}
                    </Button>

                    <div className="flex items-center gap-3 text-white/60 text-sm mt-1 mb-2">
                        <div className="flex-1 h-px bg-white/20" />
                        <span>or</span>
                        <div className="flex-1 h-px bg-white/20" />
                    </div>

                    {/* Google Sign-In Button */}
                    <Button
                        onClick={handleGoogleSignIn}
                        variant="secondary"
                    >
                        <FaGoogle className="text-blue-300 size-4 mr-2" />
                        Continue with Google
                    </Button>
                </form>

                <p className="text-sm text-center text-white/60 mt-6">
                    Don't have an account?{" "}
                    <Link href="/sign-up" className="text-blue-300 hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </main>
    );
};

export default Login;