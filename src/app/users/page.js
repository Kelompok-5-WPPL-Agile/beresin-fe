"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
import { apiFetch, logout } from "@/libs/auth";
import moment from "moment";
import { useRouter } from "next/navigation";
import AdminLayout from "../../components/AdminLayout";
import DataTable from 'react-data-table-component';
import {
    UserIcon,
    EnvelopeIcon,
    PhoneIcon,
    KeyIcon,
} from "@heroicons/react/20/solid";
import Swal from "sweetalert2";
import { error } from "jquery";
// import "datatables.net-dt/css/jquery.dataTables.css";
// import ReactDataTables from "@/components/ReactDataTables";
// import DataTable from 'datatables.net';
// import DataTable from 'datatables.net-bs4';

// const columns = [];
/* [
	{
		name: 'Title',
		selector: row => row.title,
		sortable: true,
	},
	{
		name: 'Year',
		selector: row => row.year,
		sortable: true,
	},
]; */

// const data = [];
/* [
    {
		id: 1,
		title: 'Beetlejuice',
		year: '1988',
	},
	{
		id: 2,
		title: 'Ghostbusters',
		year: '1984',
	},
] */

export default function UsersPage() {
    const router = useRouter();
    // moment.locale("id");
    // const [categories, setCategories] = useState([]);
    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [formTitle, setFormTitle] = useState('');
    const [selectedRows, setSelectedRows] = useState([]);
    const [errors, setErrors] = useState({});

    const fetchData = async () => {
        // console.log(moment().seconds(+30).format());
        //fetch user from Rest API
        await apiFetch.get('/api/users')
            .then((response) => {
                //console.log('dataa ', response);
                //set response user to state
                setData(response.data.data);
                setColumns([
                    {
                        name: 'Nama User',
                        selector: row => row.name,
                        sortable: true,
                    },
                    {
                        name: 'No. Telepon',
                        selector: row => row.phone,
                        sortable: true,
                    },
                    {
                        name: 'Email',
                        selector: row => row.email,
                        sortable: true,
                    },
                ]);
            })
            
            /* let table = new DataTable('#myTable', {
                // config options...
        });
        
        return table; */
    }

    const validateInputs = () => {
        const errors = {};
        if (!name) {
            errors.name = "Name harus diisi.";
        }
        if (!email) {
            errors.email = "Email harus diisi.";
        }
        else if (!/\S+@\S+\.\S+/.test(email)){
            errors.email = "Email yang anda masukkan tidak valid"
        }
        if (!phone) {
            errors.phone = "Phone harus diisi.";
        }
        else if (!/^\d{10,}$/.test(phone)){
            errors.phone = "Nomor yang anda masukkan tidak valid"
        }
        if (!password){
            errors.password = "Password harus diisi"
        }
        else if (password.length < 8){
            errors.password = "Password harus lebih dari 8 karakter"
        }
        return errors;
    };

    //method store post
    const submitForm = async (e) => {
        e.preventDefault();

        const validationErrors = validateInputs();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        //init FormData
        // const formData = new FormData();

        //append data
        // formData.append('name', name);
        // formData.append('email', email);
        // formData.append('phone', phone);
        // formData.append('password', password);

        let formData = {
            name: name,
            email: email,
            phone: phone,
            password: password
        }
        
        //set url
        let url = null;
        let msg = '';

        if (selectedRows.length > 0) {
            url = apiFetch.put(`/api/users/${selectedRows[0].id}`, formData)
            msg = 'Berhasil ubah user'
        } else {
            url = apiFetch.post('/api/users', formData)
            msg = 'Berhasil tambah user'
        }

        //send data with API
        await url.then((res) => {
                console.log(res);

                // close modal
                document.getElementById('my_modal_3').close();
                // navigate('/posts');

                Swal.fire({
                    icon: "success",
                    title: msg,
                    showConfirmButton: false,
                    timer: 1500
                });
                
                //reload data
                fetchData();

            })
            .catch(error => {
                console.log('error: ', error);
                document.getElementById('my_modal_3').close();
                Swal.fire({
                    icon: "error",
                    title: "Gagal!",
                    text: "Terjadi kesalahan di sistem. Silakan coba lagi.",
                });
                //set errors response to state "errors"
                // setErrors(error.response.data);
            })
    }

    const handleRowSelected = useCallback(state => {
        setSelectedRows(state.selectedRows);
    }, []);

    const handleEdit = () => {
        // console.log('selected: ',selectedRows.length);
        // console.log('selected: ',selectedRows[0].id);
        if(selectedRows.length > 0){
        setFormTitle('Form Ubah User')
        document.getElementById("password").removeAttribute("required");
        document.getElementById('email').value = selectedRows[0].email;
        document.getElementById('name').value = selectedRows[0].name;
        document.getElementById('phone').value = selectedRows[0].phone;

        setName(selectedRows[0].name)
        setEmail(selectedRows[0].email)
        setPhone(selectedRows[0].phone)
        setErrors({});
        document.getElementById('my_modal_3').showModal()
        // eslint-disable-next-line no-alert
        /* if (window.confirm(`Are you sure you want to delete:\r ${selectedRows.map(r => r.title)}?`)) {
        setToggleCleared(!toggleCleared);
        setData(differenceBy(data, selectedRows, 'title'));
        } */
        }else{
            Swal.fire({
                icon: "error",
                title: "Belum pilih data user!",
            });
        }
    };

    const openModal = () => {
        setFormTitle('Form Tambah User')
        document.getElementById('my_modal_3').showModal()
        document.getElementById('name').value = ''
        document.getElementById('email').value = ''
        document.getElementById('phone').value = ''
        document.getElementById('password').value = ''
        setName("");
        setEmail("");
        setPhone("");
        setPassword("");
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
                    apiFetch.delete(`/api/users/${selectedRows[0].id}`)
                    .then((response) => {
                        Swal.fire({
                            icon: "success",
                            title: "Berhasil hapus data user",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        
                        //reload data
                        fetchData();
                    })
                    .catch(error => {
                        console.log('error: ', error);
                        Swal.fire({
                            icon: "error",
                            title: "Gagal!",
                            text: "Terjadi kesalahan di sistem. Silakan coba lagi.",
                        });
                    })
                }
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Belum pilih data user!"
            });
        }
    }

    /* const contextActions = useMemo(() => {
        
        return <button type="button" className="btn btn-neutral" onClick={handleEdit}>Edit</button>;
        // <Button key="edit" onClick={handleEdit} style={{
        //     backgroundColor: 'darkblue'
        // }} icon>Edit</Button>;
    }, [data, selectedRows]); */
    
    //hook useEffect
    useEffect(() => {
        // console.log(moment().seconds(30).format());
        //call function "fetchData"
        fetchData();
        // console.log('data ', categories);
        // console.log('data ', result);
    }, []);

    return (
    <>
        <AdminLayout router={router}>
                <button className="btn btn-primary mb-4 mr-2" onClick={openModal}>Tambah</button>
                <button type="button" className="btn btn-neutral mr-2" onClick={handleEdit}>Edit</button>
                <button type="button" className="btn btn-error" onClick={handleDelete}>Hapus</button>
                <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                        <h3 className="font-bold text-lg mb-5">{formTitle}</h3>
                    {/* <p className="py-4">Press ESC key or click the button below to close</p> */}
                    <form method="dialog" onSubmit={submitForm}>
                        <div className="gap-2 mb-3">
                            <label className="input input-bordered flex items-center">
                                <UserIcon className="w-4 h-4 opacity-70" />
                                <input type="text" id="name" className="grow" placeholder="Name" autoComplete="off" onChange={(e) => setName(e.target.value)}/>
                            </label>
                            {errors.name && <span className="text-red-500">{errors.name}</span>}
                        </div>
                        <div className="gap-2 mb-3">
                            <label className="input input-bordered flex items-center">
                                <EnvelopeIcon className="w-4 h-4 opacity-70" />
                                <input type="text" id="email" className="grow" placeholder="Email" autoComplete="off" onChange={(e) => setEmail(e.target.value)}/>
                            </label>
                            {errors.email && <span className="text-red-500">{errors.email}</span>}
                        </div>
                        <div className="gap-2 mb-3">
                            <label className="input input-bordered flex items-center ">
                                <PhoneIcon className="w-4 h-4 opacity-70" />
                                <input type="text" id="phone" className="grow" placeholder="No. telepon (08123456789)" autoComplete="off" onChange={(e) => setPhone(e.target.value)}  />
                            </label>
                            {errors.phone && <span className="text-red-500">{errors.phone}</span>}
                        </div>
                        <div className="gap-2">
                            <label className="input input-bordered flex items-center gap">
                                <KeyIcon className="w-4 h-4 opacity-70" />
                                <input type="password" id="password" className="grow" autoComplete="off" placeholder="Password" onChange={(e) => setPassword(e.target.value)}  />
                            </label>
                            {errors.password && <span className="text-red-500">{errors.password}</span>}
                        </div>
                        
                        <div className="modal-action">
                            {/* if there is a button in form, it will close the modal */}
                                <button type="submit" className="btn btn-primary">Save</button>
                                <button type="button" className="btn btn-neutral" onClick={()=>document.getElementById('my_modal_3').close()}>Close</button>
                        </div>
                    </form>
                </div>
                </dialog>
                {/* <h1 className="text-3xl mb-4">Users Management</h1> */}
                {/* {data.map((category) => (
                    <li key={category.id}>
                        {category.name}
                    </li>
                ))} */}
                {/* <ReactDataTables data={data} columns={columns} /> */}
                <DataTable
                    columns={columns}
                    data={data}
                    selectableRows
                    selectableRowsSingle
                    pagination
                    onSelectedRowsChange={handleRowSelected}
                    // contextActions={contextActions}
                />
        </AdminLayout>
    </>
    );
}