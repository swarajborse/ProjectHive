import React from 'react'
import AccountToggle from "@/components/Sidebar/AccountToggle";
import RouteSelect from "@/components/Sidebar/RouteSelect";
import Logout from "@/components/Sidebar/Logout";

export const Sidebar = () => {
    return (
        <div>
            <div className="overflow-y-scroll sticky top-4 h-[calc(100vh-32px-14px)] scrollbar-hidden">
                <AccountToggle />
                <RouteSelect />
                <Logout />
            </div>
        </div>
    )
}
