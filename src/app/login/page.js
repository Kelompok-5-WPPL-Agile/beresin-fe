"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const res = await fetch("/api/login", {
            method: "POST",
            body: JSON.stringify({ username, password }),
        });
        const { success } = await res.json();
        if (success) {
            router.push("/protected");
            // router.reload();
        } else {
            alert("Login failed");
        }
    };

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">LOGIN</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="text" className="input input-bordered" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Masukkan Alamat Email"/>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" className="input input-bordered" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Masukkan Password"/>
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary">LOGIN</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}