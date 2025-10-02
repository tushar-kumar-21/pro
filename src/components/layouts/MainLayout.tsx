import { useState, useEffect } from "react";
import { Outlet } from "react-router";
// import Header from "../headers/Header";
import UserHeader from "../headers/UserHeader";
import Header from "../headers/Header";

function MainLayout() {

    const [isSidebarOpen, setSidebarOpen] = useState<boolean>(window.innerWidth > 1024);
    const role = sessionStorage.getItem("role") || "admin";

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 1024) {
                setSidebarOpen(true);
            } else {
                setSidebarOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div
            className="max-w-[1860px] mx-auto"
        >
            <div className="space-y-3">
                <Header />
                {/* <UserHeader setSidebarOpen={setSidebarOpen} /> */}
                <div
                    // className="flex text-white overflow-y-auto min-h-[calc(100vh-75px)] max-h-[calc(100vh-75px)] pb-5"
                    className="flex text-white p-6 overflow-y-auto min-h-screen md:min-h-[calc(100vh-75px)]"
                    id="tableWrapper"
                >
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default MainLayout;
