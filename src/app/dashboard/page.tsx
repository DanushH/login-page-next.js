"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";

export default function Dashboard() {
    const logout = useAuthStore((state) => state.logout);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const initialize = useAuthStore((state) => state.initialize);
    const router = useRouter();

    useEffect(() => {
        initialize();
        if (!isAuthenticated) router.push("/login");
    });

    const handleLogout = () => {
        logout();
        document.cookie = "auth=false; max-age=0";
        router.push("/login");
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
            <div className="bg-white p-8 rounded shadow text-center space-y-4">
                <h1 className="text-xl font-semibold">Welcome, you’re logged in.</h1>
                <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded">
                    Logout
                </button>
            </div>
        </div>
    );
}
