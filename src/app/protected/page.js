"use client";
import { useState, useEffect } from "react";
import { apiFetch, logout } from "@/libs/auth";
import moment from "moment";
import { useRouter } from "next/navigation";
import AdminLayout from "../../components/AdminLayout"

export default function ProtectedPage() {
    const router = useRouter();
    // moment.locale("id");
    const [categories, setCategories] = useState([]);
    const fetchData = async () => {
        // console.log(moment().seconds(+30).format());
        //fetch user from Rest API
        await apiFetch.get('/api/categories')
            .then((response) => {
                //set response user to state
                setCategories(response.data);
                console.log('categories ', categories);
            })
    }

    const logoutHandler = async () => {
        await logout();
        router.push("/login");
        // if (response?.success) {
        //     router.push("/login");
        //     // console.log("Logout success");
        // } else {
        //     console.log("Logout failed");
        // }
        // console.log(moment().seconds(+30).format());
        //fetch user from Rest API
        // await apiFetch.get('/api/categories')
        //     .then((response) => {
        //         //set response user to state
        //         setCategories(response.data);
        //         console.log('categories ', categories);
        //     })
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
          <h1>Dashboard</h1>
          {/* <p>Categories</p> */}
          <ul>
            {/* {categories.map((category) => (
                <li key={category.id}>
                    {category.name}
                </li>
            ))} */}
          </ul>

          {/* <button className="btn btn-primary" onClick={fetchData}>
            Refresh
          </button> */}
          <button className="btn btn-error" onClick={logoutHandler}>
            Logout
          </button>
        </AdminLayout>
      </>
    );
}