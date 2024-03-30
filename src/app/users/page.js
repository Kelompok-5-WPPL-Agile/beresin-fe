"use client";
import { useState, useEffect } from "react";
import { apiFetch, logout } from "@/libs/auth";
import moment from "moment";
import { useRouter } from "next/navigation";
import AdminLayout from "../../components/AdminLayout";
// import "datatables.net-dt/css/jquery.dataTables.css";
// import ReactDataTables from "@/components/ReactDataTables";
import DataTable from 'datatables.net';
// import DataTable from 'datatables.net-bs4';

const data = [
{
    id: "1",
    name: "Tiger Nixon",
    position: "System Architect",
    salary: "$320,800",
    start_date: "2011/04/25",
    office: "Edinburgh",
    extn: "5421",
},
{
    id: "2",
    name: "Garrett Winters",
    position: "Accountant",
    salary: "$170,750",
    start_date: "2011/07/25",
    office: "Tokyo",
    extn: "8422",
},
];

const columns = [
{ data: "name", title: "Name" },
{ data: "position", title: "Position" },
];

export default function UsersPage() {
    const router = useRouter();
    // moment.locale("id");
    const [categories, setCategories] = useState([]);
    const fetchData = async () => {
        // console.log(moment().seconds(+30).format());
        //fetch user from Rest API
        /* await apiFetch.get('/api/categories')
            .then((response) => {
                //set response user to state
                setCategories(response.data);
                console.log('categories ', categories);
            }) */
        let table = new DataTable('#myTable', {
            // config options...
        });

        return table;
    }

    //hook useEffect
    useEffect(() => {
        // console.log(moment().seconds(30).format());
        //call function "fetchData"
        fetchData();
    }, []);

    return (
      <>
        <AdminLayout router={router}>
            <h1>Users Management</h1>
                {/* <ReactDataTables data={data} columns={columns} /> */}
                <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Job</th>
                        <th>Favorite Color</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* row 1 */}
                    <tr>
                        <th>1</th>
                        <td>Cy Ganderton</td>
                        <td>Quality Control Specialist</td>
                        <td>Blue</td>
                    </tr>
                    {/* row 2 */}
                    <tr>
                        <th>2</th>
                        <td>Hart Hagerty</td>
                        <td>Desktop Support Technician</td>
                        <td>Purple</td>
                    </tr>
                    {/* row 3 */}
                    <tr>
                        <th>3</th>
                        <td>Brice Swyre</td>
                        <td>Tax Accountant</td>
                        <td>Red</td>
                    </tr>
                    </tbody>
                </table>
                </div>
        </AdminLayout>
      </>
    );
}