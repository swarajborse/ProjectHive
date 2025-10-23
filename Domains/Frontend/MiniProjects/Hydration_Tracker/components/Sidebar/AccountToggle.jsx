"use client";
import React from "react";
import { useUser } from "@/app/context/UserContext";
import { useSidebar } from "@/app/context/SidebarContext";

const AccountToggle = () => {
    const { name, email } = useUser();
    const { closeSidebar } = useSidebar();

    return (
        <div className="border-b mb-4 mt-2 pb-4 border-blue-300/50 flex items-center justify-between">
            <div className="flex p-0.5 hover:bg-blue-200/50 rounded transition-colors relative gap-2 w-full items-center">
                <img
                    src="https://api.dicebear.com/9.x/thumbs/svg?seed=Sawyer"
                    alt="avatar"
                    className="size-9 rounded-full shrink-0 bg-blue-950 shadow"
                />
                <div className="text-start ml-2">
                    <span className="text-blue-300 text-sm font-bold block">{name || "loading..."}</span>
                    <span className="text-xs block text-white/75">{email}</span>
                </div>
            </div>
            <div className="lg:hidden">
                <button
                    type="button"
                    onClick={closeSidebar}
                    aria-label="Close sidebar"
                    className="ml-2 p-1"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-6 text-white/75"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

        </div>
    );
};

export default AccountToggle;