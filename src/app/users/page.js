"use client";
import { useState, useEffect } from "react";
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
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');

    const fetchData = async () => {
        // console.log(moment().seconds(+30).format());
        //fetch user from Rest API
        await apiFetch.get('/api/users')
            .then((response) => {
                // console.log('dataa ', response);
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

    //method store post
    const submitForm = async (e) => {
        e.preventDefault();
        
        //init FormData
        const formData = new FormData();

        //append data
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('phone', phone);

        //send data with API
        await apiFetch.post('/api/users', formData)
            .then((res) => {
                console.log(res);

                // close modal
                document.getElementById('my_modal_3').close();
                // navigate('/posts');

                Swal.fire({
                    icon: "success",
                    title: "Berhasil tambah user",
                    showConfirmButton: false,
                    timer: 1500
                });
                
                //reload data
                fetchData();

            })
            .catch(error => {
                console.log('error: ', error);
                //set errors response to state "errors"
                // setErrors(error.response.data);
            })
    }
    
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
                <button className="btn btn-primary mb-4" onClick={()=>document.getElementById('my_modal_3').showModal()}>Tambah</button>
                <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-5">Form Tambah User</h3>
                    {/* <p className="py-4">Press ESC key or click the button below to close</p> */}
                    <form method="dialog" onSubmit={submitForm}>
                        <label className="input input-bordered flex items-center gap-2 mb-3">
                            <UserIcon className="w-4 h-4 opacity-70" />
                            <input type="text" className="grow" placeholder="Name" autoComplete="off" onChange={(e) => setName(e.target.value)} required />
                        </label>
                        <label className="input input-bordered flex items-center gap-2 mb-3">
                            <EnvelopeIcon className="w-4 h-4 opacity-70" />
                            <input type="email" className="grow" placeholder="Email" autoComplete="off" onChange={(e) => setEmail(e.target.value)} required />
                        </label>
                        <label className="input input-bordered flex items-center gap-2 mb-3">
                            <PhoneIcon className="w-4 h-4 opacity-70" />
                            <input type="text" className="grow" placeholder="No. telepon (08123456789)" autoComplete="off" onChange={(e) => setPhone(e.target.value)} required />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            <KeyIcon className="w-4 h-4 opacity-70" />
                            <input type="password" className="grow" autoComplete="off" placeholder="" onChange={(e) => setPassword(e.target.value)} required />
                        </label>
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
                    pagination
                />
        </AdminLayout>
    </>
    );
}