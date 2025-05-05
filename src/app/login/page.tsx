"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuthStore } from "@/store/auth";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const login = useAuthStore((state) => state.login);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!email) {
            return setError("Email required!");
        }

        if (!password) {
            return setError("Password required!");
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            return setError("Invalid Email!");
        }

        if (
            email === "test@visionexdigital.com.au" &&
            password === "password123"
        ) {
            setLoading(true);
            login();
            document.cookie = "auth=true; path=/";
            router.push("/dashboard");
        } else {
            setError("Invalid credentials!");
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            {/* Login Page Main Section */}
            <div className="flex flex-row items-center justify-center space-x-12 max-w-7xl w-full bg-black">
                {/* Left Column */}
                <div className="flex-1 p-8 rounded-lg shadow-md ">
                    <h1 className="text-4xl font-bold mb-4">
                        <Image
                            src="/images/login/LOGO.png"
                            alt="Logo"
                            className="inline-block mr-1"
                            width={150}
                            height={50}
                        />
                    </h1>
                    <p className="text-xl mb-6 text-white">
                        Welcome back to Room.me!
                    </p>
                    <p className="mb-6 text-white">
                        Room.me is an innovative video conference product that
                        revolutionizes virtual meetings.
                    </p>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="flex flex-col space-y-2">
                            <label className="text-lg font-medium text-white">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email address"
                                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 bg-transparent"
                            />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label className="text-lg font-medium text-white">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 bg-transparent"
                            />
                        </div>

                        {error && (
                            <p className="text-red-500 text-sm">{error}</p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
                        >
                            {loading ? "Logging in..." : "Sign In"}
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 mt-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-700"
                        >
                            {loading ? "Logging in..." : "Sign in with Google"}
                        </button>
                    </form>
                </div>

                {/* Right Column */}
                <div className="flex-1"></div>
            </div>
        </div>
    );
}
