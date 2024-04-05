"use client";
import { useRouter } from "next/navigation";
import AdminLayout from "../../components/AdminLayout";
import { useState, useEffect, useCallback } from "react";
import { apiFetch } from "@/libs/auth";
import DataTable from "react-data-table-component";
import { Squares2X2Icon } from "@heroicons/react/20/solid";
import Swal from "sweetalert2";
import moment from "moment";

export default function TaskPage() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [users, setUsers] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState(0);
    const [pic, setPic] = useState(0);
    const [due_at, setDue_at] = useState('');
    const [estimation, setEstimation] = useState('');
    const [priority, setPriority] = useState('');
    const [effort, setEffort] = useState('');
    const [status, setStatus] = useState('');
    const [formTitle, setFormTitle] = useState('');
    const [selectedRows, setSelectedRows] = useState([]);

    const fetchData = async () => {
        await apiFetch.get("/api/tasks").then((response) => {
            //console.log(response);
            setData(response.data.data);
            setColumns([
                {
                    name: "Judul",
                    selector: (row) => row.title,
                    sortable: true,
                },
                {
                    name: "Kategori",
                    selector: (row) => row.category_id,
                    sortable: true,
                },
                {
                    name: "Deadline",
                    selector: (row) => row.due_at,
                    sortable: true,
                },
                {
                    name: "Estimasi",
                    selector: (row) => row.estimation,
                    sortable: true,
                },
                {
                    name: "Prioritas",
                    selector: (row) => row.priority,
                    sortable: true,
                },
                {
                    name: "Effort",
                    selector: (row) => row.effort,
                    sortable: true,
                },
                {
                    name: "Status",
                    selector: (row) => row.status,
                    sortable: true,
                },
            ]);
        });
    };

    /* fetch data users */
    const fetchUsers = async () => {
        await apiFetch.get("/api/users").then((response) => {
            //console.log(response);
            setUsers(response.data.data);
        });
    };

    /* fetch data categories */
    const fetchCategories = async () => {
        await apiFetch.get("/api/categories").then((response) => {
            //console.log(response);
            setCategories(response.data.data);
        });
    };

    const submitForm = async (e) => {
        e.preventDefault();

        let formData = {
            category_id: category,
            pic_id: pic,
            title: title,
            description: description,
            due_at: moment(due_at).format("YYYY-MM-DD HH:mm:ss"),
            estimation: estimation,
            priority: priority,
            effort: effort,
            status: status,
        };

        let url = null;
        let msg = "";

        if (selectedRows.length > 0) {
            url = apiFetch.put(`/api/tasks/${selectedRows[0].id}`, formData);
            msg = "Berhasil ubah task";
        } else {
            url = apiFetch.post("/api/tasks", formData);
            msg = "Berhasil tambah task";
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
            })
    }

    const handleRowSelected = useCallback((state) => {
        setSelectedRows(state.selectedRows);
    }, []);

    const handleEdit = () => {
        setFormTitle("Form Ubah Task");
        document.getElementById("title").value = selectedRows[0].title;

        setTitle(selectedRows[0].title);

        document.getElementById("my_modal_3").showModal();
    };

    const openModal = () => {
        setFormTitle("Form Tambah Task");
        document.getElementById("my_modal_3").showModal();
        document.getElementById("title").value = "";
        document.getElementById("pic_id").value = "";
        document.getElementById("category_id").value = "";
        document.getElementById("due_at").value = "";
        document.getElementById("estimation").value = "";
        document.getElementById("priority").value = "";
        document.getElementById("effort").value = "";
        document.getElementById("status").value = "";
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
                        .delete(`/api/tasks/${selectedRows[0].id}`)
                        .then((response) => {
                            Swal.fire({
                                icon: "success",
                                title: "Berhasil hapus data task",
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
                title: "Belum pilih data task!",
            });
        }
    };

    useEffect(() => {
        fetchData();
        fetchUsers();
        fetchCategories();
    }, []);

    return (
        <AdminLayout router={router}>
            <button className="btn btn-primary mb-4 mr-2" onClick={openModal}>
                Tambah
            </button>
            {/* <button
                type="button"
                className="btn btn-neutral mr-2"
                onClick={handleEdit}
            >
                Edit
            </button> */}
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
                                id="title"
                                className="grow"
                                placeholder="Judul"
                                autoComplete="off"
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </label>
                        {/* <label className="input input-bordered flex items-center gap-2 mb-3">
                            <Squares2X2Icon className="w-4 h-4 opacity-70" />
                        </label> */}
                        <label className="form-control gap-2 mb-3">
                            <div className="label">
                                <span className="label-text">Deskripsi</span>
                            </div>
                            <textarea id="description" className="textarea textarea-bordered" placeholder="Deskripsi" autoComplete="off" onChange={(e) => setDescription(e.target.value)} required></textarea>
                        </label>
                        <label className="form-control gap-2 mb-3">
                            <div className="label">
                                <span className="label-text">Kategori</span>
                            </div>
                            <select id="category_id" className="select select-bordered" onChange={(e) => setCategory(e.target.value)} required>
                                <option disabled selected>Pilih Kategori</option>
                                {categories.map((category) => (
                                    <option value={category.id}>{category.name}</option>
                                ))}
                            </select>
                        </label>
                        <label className="input input-bordered flex items-center gap-2 mb-3">
                            <Squares2X2Icon className="w-4 h-4 opacity-70" />
                            <input
                                type="date"
                                id="due_at"
                                className="grow"
                                placeholder="Deadline"
                                autoComplete="off"
                                onChange={(e) => setDue_at(e.target.value)}
                                required
                            />
                        </label>
                        <label className="input input-bordered flex items-center gap-2 mb-3">
                            <Squares2X2Icon className="w-4 h-4 opacity-70" />
                            <input
                                type="text"
                                id="estimation"
                                className="grow"
                                placeholder="Estimasi"
                                autoComplete="off"
                                onChange={(e) => setEstimation(e.target.value)}
                                required
                            />
                        </label>
                        <label className="form-control gap-2 mb-3">
                            <div className="label">
                                <span className="label-text">PIC</span>
                            </div>
                            <select id="pic_id" className="select select-bordered" onChange={(e) => setPic(e.target.value)} required>
                                <option disabled selected>Pilih PIC</option>
                                {users.map((user) => (
                                    <option value={user.id}>{user.name}</option>
                                ))}
                            </select>
                        </label>
                        <label className="form-control gap-2 mb-3">
                            <div className="label">
                                <span className="label-text">Prioritas</span>
                            </div>
                            <select id="priority" className="select select-bordered" onChange={(e) => setPriority(e.target.value)}>
                                <option disabled selected>Pilih Prioritas</option>
                                <option value={'normal'}>Normal</option>
                                <option value={'high'}>High</option>
                                <option value={'urgent'}>Urgent</option>
                            </select>
                        </label>
                        <label className="form-control gap-2 mb-3">
                            <div className="label">
                                <span className="label-text">Effort</span>
                            </div>
                            <select id="effort" className="select select-bordered" onChange={(e) => setEffort(e.target.value)}>
                                <option disabled selected>Pilih Effort</option>
                                <option value={'easy'}>Easy</option>
                                <option value={'medium'}>Medium</option>
                                <option value={'hard'}>Hard</option>
                            </select>
                        </label>
                        <label className="form-control gap-2 mb-3">
                            <div className="label">
                                <span className="label-text">Status</span>
                            </div>
                            <select id="status" className="select select-bordered" onChange={(e) => setStatus(e.target.value)}>
                                <option disabled selected>Pilih Status</option>
                                <option value={'open'}>Open</option>
                                <option value={'resolved'}>Resolved</option>
                                <option value={'in_progress'}>In Progress</option>
                                <option value={'closed'}>Closed</option>
                                <option value={'reopen'}>Reopen</option>
                            </select>
                        </label>
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
