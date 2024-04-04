"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const res = await fetch("/api/register", {
            method: "POST",
            body: JSON.stringify({ name, email, password, phone }),
        });
        const { success } = await res.json();
        if (success) {
            router.push("/login");
        } else {
            alert("Register failed");
        }
    };

    const toLogin = () => {
        router.push("/login");
    };

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">REGISTER</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                className="input input-bordered"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Masukkan Nama"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="text"
                                className="input input-bordered"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Masukkan Alamat Email"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                className="input input-bordered"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Masukkan Password"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">phone</span>
                            </label>
                            <input
                                type="text"
                                className="input input-bordered"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="Masukkan Nomor HP"
                            />
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary">
                                Register
                            </button>
                        </div>
                    </form>
                    <div className="mt-3">
                        <h3>
                            Sudah punya akun?{" "}
                            <a onClick={toLogin} className="text-blue-700 link no-underline">
                                Masuk disini!
                            </a>
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    );
}
