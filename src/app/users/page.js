"use client";
import { useState, useEffect } from "react";
import { apiFetch, logout } from "@/libs/auth";
import moment from "moment";
import { useRouter } from "next/navigation";
import AdminLayout from "../../components/AdminLayout";
import DataTable from 'react-data-table-component';
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
                    <form method="dialog">
                        <label className="input input-bordered flex items-center gap-2 mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                        <input type="text" className="grow" placeholder="Email" />
                        </label>
                        <label className="input input-bordered flex items-center gap-2 mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                        <input type="text" className="grow" placeholder="Username" />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                        <input type="password" className="grow" value="password" />
                        </label>
                        <div className="modal-action">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
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