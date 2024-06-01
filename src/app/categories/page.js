"use client";
import { useRouter } from "next/navigation";
import AdminLayout from "../../components/AdminLayout";
import { useState, useEffect, useCallback } from "react";
import { apiFetch } from "@/libs/auth";
import DataTable from "react-data-table-component";
import { Squares2X2Icon } from "@heroicons/react/20/solid";
import Swal from "sweetalert2";

export default function CategoriesPage() {
    const router = useRouter();
    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);
    const [name, setName] = useState("");
    const [formTitle, setFormTitle] = useState("");
    const [selectedRows, setSelectedRows] = useState([]);
    const [errors, setErrors] = useState({});

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

    const validateInputs = () => {
        const errors = {};
        if (!name) {
            errors.name = "Name harus diisi!";
        }
        return errors;
    };

    const submitForm = async (e) => {
        e.preventDefault();
        const validationErrors = validateInputs();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        let formData = {
            name: name,
        };

        let url = null;
        let msg = "";

        if (selectedRows.length > 0) {
            url = apiFetch.put(`/api/categories/${selectedRows[0].id}`, formData);
            msg = "Berhasil ubah kategori";
        } else {
                url = apiFetch.post("/api/categories", formData);
                msg = "Berhasil tambah kategori";
            
        }

        await url
            .then((res) => {
                //console.log(res);

                document.getElementById("my_modal_3").close();

                Swal.fire({
                    icon: "success",
                    title: msg,
                    showConfirmButton: false,
                    timer: 1500,
                });

                fetchData();
            })
            .catch((error) => {
                console.log("error: ", error);
                document.getElementById("my_modal_3").close();
                Swal.fire({
                    icon: "error",
                    title: "Gagal!",
                    text: "Terjadi kesalahan di sistem. Silakan coba lagi.",
                });
            });
    };

    const handleRowSelected = useCallback((state) => {
        setSelectedRows(state.selectedRows);
    }, []);

    const handleEdit = () => {
        if(selectedRows.length > 0){
            setFormTitle("Form Ubah Kategori");
            document.getElementById("name").value = selectedRows[0].name;
            setName(selectedRows[0].name);
            document.getElementById("my_modal_3").showModal();
            setErrors({});
        }else{
            Swal.fire({
                icon: "error",
                title: "Belum pilih data kategori!",
            });
        }
        
    };

    const openModal = () => {
        setFormTitle("Form Tambah Kategori");
        document.getElementById("my_modal_3").showModal();
        document.getElementById("name").value = "";
        setName("");
        setErrors({});
    };

    const handleDelete = async () => {
        if (selectedRows.length > 0) {
            await Swal.fire({
                title: "Yakin ingin menghapus?",
                text: "Data tersebut akan hilang selamanya!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Ya, hapus saja!",
                cancelButtonText: "Batal",
            }).then((result) => {
                if (result.isConfirmed) {
                    apiFetch
                        .delete(`/api/categories/${selectedRows[0].id}`)
                        .then((response) => {
                            Swal.fire({
                                icon: "success",
                                title: "Berhasil hapus data kategori",
                                showConfirmButton: false,
                                timer: 1500,
                            });

                            fetchData();
                        })
                        .catch((error) => {
                            console.log("error: ", error);
                            Swal.fire({
                                icon: "error",
                                title: "Gagal!",
                                text: "Terjadi kesalahan di sistem. Silakan coba lagi.",
                            });
                        });
                }
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Belum pilih data kategori!",
            });
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <AdminLayout router={router}>
            <button className="btn btn-primary mb-4 mr-2" onClick={openModal}>
                Tambah
            </button>
            <button
                type="button"
                className="btn btn-neutral mr-2"
                onClick={handleEdit}
            >
                Edit
            </button>
            <button type="button" className="btn btn-error" onClick={handleDelete}>
                Hapus
            </button>
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-5">{formTitle}</h3>
                    <form method="dialog" onSubmit={submitForm}>
                        <label className="input input-bordered flex items-center gap-2 mb-3">
                            <Squares2X2Icon className="w-4 h-4 opacity-70" />
                            <input
                                type="text"
                                id="name"
                                className="grow"
                                placeholder="Name"
                                autoComplete="off"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </label>
                        {errors.name && <span className="text-red-500">{errors.name}</span>}
                        <div className="modal-action">
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
            <DataTable
                columns={columns}
                data={data}
                selectableRows
                selectableRowsSingle
                pagination
                onSelectedRowsChange={handleRowSelected}
            />
        </AdminLayout>
    );
}
