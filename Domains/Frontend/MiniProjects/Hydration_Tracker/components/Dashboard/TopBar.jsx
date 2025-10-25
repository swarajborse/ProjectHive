import React from "react";
import { useUser } from "@/app/context/UserContext";
import { FiMenu } from "react-icons/fi";
import { useSidebar } from "@/app/context/SidebarContext";
import { useUserSettings } from "@/app/context/UserSettings";

export const TopBar = () => {
    const { name } = useUser();
    const { openSidebar } = useSidebar();
    const { consumed, dailyGoal } = useUserSettings();

    const formatDate = () => {
        const now = new Date();
        const weekday = now.toLocaleString("en-US", { weekday: "long" });
        const day = now.getDate();
        const month = now.toLocaleString("en-US", { month: "short" });
        const year = now.getFullYear();
        return `${weekday}, ${day} ${month} ${year}`;
    };

    // Hydration status logic
    const progress = dailyGoal > 0 ? (consumed / dailyGoal) * 100 : 0;
    // default values for < 30
    let status = "You're Dehydrated !";
    let statusColor = "text-red-400";
    if (progress > 90) {
        status = "You're well Hydrated !";
        statusColor = "text-green-400";
    } else if (progress > 60) {
        status = "You're on Track !";
        statusColor = "text-blue-400";
    } else if (progress > 30) {
        status = "You need more Water !";
        statusColor = "text-yellow-400";
    }

    return (
            <div className="border-b mb-4 pb-4 border-blue-300/50">
                <div className="flex items-center gap-3">
                    <button
                        onClick={openSidebar}
                        className="lg:hidden py-2"
                        aria-label="Open sidebar"
                    >
                        <FiMenu className="text-white size-7" />
                    </button>

                    <div className="flex flex-row items-center md:items-end gap-3 md:gap-x-4 lg:py-0.5 justify-between w-full">
                        <div className="flex flex-col md:flex-row flex-grow md:gap-4 md:items-end">
                            <span className="text-sm md:text-xl lg:text-2xl font-semibold block">
                              <span className="text-blue-300">Good day</span> {name || "loading..."} !
                            </span>
                            <span className="text-xs md:text-sm lg:text-base block text-white/75">
                              {formatDate()}
                            </span>
                        </div>

                        <div className={`text-sm md:text-lg lg:text-xl font-semibold text-nowrap ${statusColor}`}>
                            {status}
                        </div>
                    </div>
                </div>
            </div>
    );
};