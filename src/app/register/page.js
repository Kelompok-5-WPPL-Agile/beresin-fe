"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { EnvelopeIcon, LockClosedIcon , UserIcon , DevicePhoneMobileIcon} from "@heroicons/react/20/solid";
import Swal from "sweetalert2";

export default function RegisterPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!name) newErrors.name = "Name is required";
        if (!email) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
        if (!password) newErrors.password = "Password is required";
        else if (password.length < 8) newErrors.password = "Password must be at least 8 characters long";
        if (!phone) newErrors.phone = "Phone number is required";
        else if (!/^\d{10,}$/.test(phone)) newErrors.phone = "Phone number is invalid";
        return newErrors;
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        try {
            const res = await fetch("/api/register", {
                method: "POST",
                body: JSON.stringify({ name, email, password, phone }),
                headers: {
                    "Content-Type": "application/json"
                },
            });
            const { success } = await res.json();
            if (success) {
                router.push("/login");
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Register gagal!",
                    text: "Terjadi kesalahan di sistem. Silakan coba lagi!",
                });
            }
        } catch (error) {
            alert("An error occurred: " + error.message);
        }
    };

    const handleChange = (field, value) => {
        let newErrors = { ...errors };
        if (field === "name") {
            setName(value);
            if (!value) newErrors.name = "Name is required";
            else delete newErrors.name;
        } else if (field === "email") {
            setEmail(value);
            if (!value) newErrors.email = "Email is required";
            else if (!/\S+@\S+\.\S+/.test(value)) newErrors.email = "Email is invalid";
            else delete newErrors.email;
        } else if (field === "password") {
            setPassword(value);
            if (!value) newErrors.password = "Password is required";
            else if (value.length < 8) newErrors.password = "Password must be at least 8 characters long";
            else delete newErrors.password;
        } else if (field === "phone") {
            setPhone(value);
            if (!value) newErrors.phone = "Phone number is required";
            else if (!/^\d{10,}$/.test(value)) newErrors.phone = "Phone number is invalid";
            else delete newErrors.phone;
        }
        setErrors(newErrors);
    };

    const toLogin = () => {
        router.push("/login");
    };

    return (
        <div>
            <div className="flex flex-col px-48 py-12 container">
                <div className="flex">
                    <h1 className="font-extrabold text-xl">BERESIN</h1>
                </div>
                <div className="flex flex-row mt-24 justify-center validasi-content">
                    <div className="flex w-1/2 flex-col pr-24 form-content">
                        <form onSubmit={handleSubmit}>
                        <div className="form-control">
                                <label className="form-control w-full max-w-full mb-2">
                                    <div className="label mb-2">
                                        <span className="label-text text-md font-medium">Email</span>
                                    </div>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                                            <EnvelopeIcon className="w-5 h-5 opacity-70 text-primary" />
                                        </span>
                                        <input type="text" className="input input-bordered pl-10 w-full max-w-full" value={email} onChange={(e) => handleChange("email", e.target.value)} />
                                    </div>
                                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="form-control w-full max-w-full mb-2">
                                    <div className="label mb-2">
                                        <span className="label-text text-md font-medium">Username</span>
                                    </div>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                                            <UserIcon className="w-5 h-5 opacity-70 text-primary" />
                                        </span>
                                        <input type="text" className="input input-bordered pl-10 w-full max-w-full" value={name} onChange={(e) => handleChange("name", e.target.value)} />
                                    </div>
                                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="form-control w-full max-w-full mb-2">
                                    <div className="label mb-2">
                                        <span className="label-text text-md font-medium">Password</span>
                                    </div>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                                            <LockClosedIcon className="w-5 h-5 opacity-70 text-primary" />
                                        </span>
                                        <input type="password" className="input input-bordered pl-10 w-full max-w-full" value={password} onChange={(e) => handleChange("password", e.target.value)}/>
                                    </div>
                                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="form-control w-full max-w-full mb-2">
                                    <div className="label mb-2">
                                        <span className="label-text text-md font-medium">Phone</span>
                                    </div>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                                            <DevicePhoneMobileIcon className="w-5 h-5 opacity-70 text-primary" />
                                        </span>
                                        <input type="text" className="input input-bordered pl-10 w-full max-w-full" value={phone} onChange={(e) => handleChange("phone", e.target.value)}  />
                                    </div>
                                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                                </label>
                            </div>
                            <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary">Daftar</button>
                            </div>
                        </form>
                        <div className="mt-3">
                            <h3 className="text-md font-medium">Sudah punya akun? <a onClick={toLogin} className="text-blue-700 link no-underline">Masuk disini!</a></h3>
                        </div>
                    </div>
                    <div className="w-1/2 image-content">
                        <img src="/assets/images/checklist.svg"></img>
                    </div>
                </div>
            </div>
        </div>
        // <div className="hero min-h-screen bg-base-200">
        //     <div className="hero-content text-center">
        //         <div className="max-w-md">
        //             <h1 className="text-5xl font-bold">REGISTER</h1>
        //             <form onSubmit={handleSubmit}>
        //                 <div className="form-control">
        //                     <label className="label">
        //                         <span className="label-text">Name</span>
        //                     </label>
        //                     <input
        //                         type="text"
        //                         className="input input-bordered"
        //                         value={name}
        //                         onChange={(e) => setName(e.target.value)}
        //                         placeholder="Masukkan Nama"
        //                     />
        //                 </div>
        //                 <div className="form-control">
        //                     <label className="label">
        //                         <span className="label-text">Email</span>
        //                     </label>
        //                     <input
        //                         type="text"
        //                         className="input input-bordered"
        //                         value={email}
        //                         onChange={(e) => setEmail(e.target.value)}
        //                         placeholder="Masukkan Alamat Email"
        //                     />
        //                 </div>
        //                 <div className="form-control">
        //                     <label className="label">
        //                         <span className="label-text">Password</span>
        //                     </label>
        //                     <input
        //                         type="password"
        //                         className="input input-bordered"
        //                         value={password}
        //                         onChange={(e) => setPassword(e.target.value)}
        //                         placeholder="Masukkan Password"
        //                     />
        //                 </div>
        //                 <div className="form-control">
        //                     <label className="label">
        //                         <span className="label-text">phone</span>
        //                     </label>
        //                     <input
        //                         type="text"
        //                         className="input input-bordered"
        //                         value={phone}
        //                         onChange={(e) => setPhone(e.target.value)}
        //                         placeholder="Masukkan Nomor HP"
        //                     />
        //                 </div>
        //                 <div className="form-control mt-6">
        //                     <button type="submit" className="btn btn-primary">
        //                         Register
        //                     </button>
        //                 </div>
        //             </form>
        //             <div className="mt-3">
        //                 <h3>
        //                     Sudah punya akun?{" "}
        //                     <a onClick={toLogin} className="text-blue-700 link no-underline">
        //                         Masuk disini!
        //                     </a>
        //                 </h3>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    );
}
