"use client"
import React from "react";
import { FiLogOut } from "react-icons/fi";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/app/firebase/config.js";

const Logout = () => {
    const router = useRouter();
    const handleLogout = async () => {
        await signOut(auth);
        router.push("/");
    };
    return (
        <div className="flex sticky top-[calc(100vh-48px)] flex-col border-t px-2 border-blue-300/50">
            <div className="flex justify-center mt-4">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-4 px-3 py-2 rounded  hover:bg-blue-200/50 text-white transition-colors"
                >
                    <span>Logout</span>
                    <FiLogOut className="text-xl" />
                </button>
            </div>
        </div>
    );
};

export default Logout;