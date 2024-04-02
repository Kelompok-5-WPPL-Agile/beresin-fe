"use client";
import { useRouter } from "next/navigation";
import AdminLayout from "../../components/AdminLayout";
import { useState, useEffect } from "react";
import { apiFetch } from "@/libs/auth";
import DataTable from "react-data-table-component";
import { Squares2X2Icon } from "@heroicons/react/20/solid";
import Swal from "sweetalert2";

export default function CategoriesPage() {
    const router = useRouter();
    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);
    const [name, setName] = useState([]);

    const fetchData = async () => {
        await apiFetch.get("/api/categories").then((response) => {
            //console.log(response);
            setData(response.data.data);
            setColumns([
                {
                    name: "Id",
                    selector: (row) => row.id,
                    sortable: true,
                },
                {
                    name: "Nama Kategori",
                    selector: (row) => row.name,
                    sortable: true,
                },
            ]);
        });
    };

    const submitForm = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('name',name);

        await apiFetch.post("/api/categories", formData).then((res) => {
            document.getElementById('my_modal_3').close();
            Swal.fire({
                icon: "success",
                title: "Berhasil tambah kategori",
                showConfirmButton: false,
                timer: 1500,
            });
            fetchData();
        })
        .catch(error => {
            console.log('error: ', error);
            Swal.fire({
            icon: "error",
            title: "Gagal menambah kategori",
            text: "Terjadi kesalahan saat menambah kategori. Silakan coba lagi.",
            });
        })
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <AdminLayout router={router}>
            <button
                className="btn btn-primary mb-4"
                onClick={() => document.getElementById("my_modal_3").showModal()}
            >
                Tambah
            </button>
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-5">Form Tambah User</h3>
                    {/* <p className="py-4">Press ESC key or click the button below to close</p> */}
                    <form method="dialog" onSubmit={submitForm}>
                        <label className="input input-bordered flex items-center gap-2 mb-3">
                            <Squares2X2Icon className="w-4 h-4 opacity-70" />
                            <input
                                type="text"
                                className="grow"
                                placeholder="Name"
                                autoComplete="off"
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </label>
                        <div className="modal-action">
                            {/* if there is a button in form, it will close the modal */}
                            <button type="submit" className="btn btn-primary">
                                Save
                            </button>
                            <button
                                type="button"
                                className="btn btn-neutral"
                                onClick={() => document.getElementById("my_modal_3").close()}
                            >
                                Close
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
            <DataTable columns={columns} data={data} pagination />
        </AdminLayout>
    );
}
