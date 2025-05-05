"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
        <div>
            <h2>ROOM.ME</h2>

            <p>Welcome back to Room.me!</p>
            <p>
                Room.me is an innovative video conference product that
                revolutionizes virtual meetings.
            </p>

            <form onSubmit={handleLogin}>
                <div>
                    <label>Email address: </label>
                    <input
                        type="email"
                        value={email}
                        placeholder="Enter your email address"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password: </label>
                    <input
                        type="password"
                        value={password}
                        placeholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {error && <p>{error}</p>}
                <button type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Sign in"}
                </button>
                <button type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Sign in with Google"}
                </button>
            </form>
        </div>
    );
}
