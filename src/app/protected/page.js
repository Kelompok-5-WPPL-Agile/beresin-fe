"use client";
import { useState, useEffect , useRef} from "react";
import { apiFetch, logout } from "@/libs/auth";
import moment from "moment";
import { useRouter } from "next/navigation";
import AdminLayout from "../../components/AdminLayout"
import { UserGroupIcon, Squares2X2Icon , PencilSquareIcon, DevicePhoneMobileIcon} from "@heroicons/react/20/solid";
import { Chart } from "chart.js/auto";

export default function ProtectedPage() {
    const router = useRouter();
    const chartRef = useRef(null);

    // moment.locale("id");
    const [totalCategories, setTotalCategories] = useState([]);
    const [totalUsers, setTotalUsers] = useState([]);
    const [totalTasks, setTotalTasks] = useState([]);

    const [totalTasksStatusOpen, setTotalTasksStatusOpen] = useState([]);
    const [totalTasksStatusInProgress, setTotalTasksStatusInProgress] = useState([]);
    const [totalTasksStatusResolved, setTotalTasksStatusResolved] = useState([]);
    const [totalTasksStatusClosed, setTotalTasksStatusClosed] = useState([]);
    const [totalTasksStatusReopen, setTotalTasksStatusReopen] = useState([]);

    const [totalTasksPriorityNormal, setTotalTasksPriorityNormal] = useState([]);
    const [totalTasksPriorityHigh, setTotalTasksPriorityHigh] = useState([]);
    const [totalTasksPriorityUrgent, setTotalTasksPriorityUrgent] = useState([]);
    // const fetchData = async () => {
    //     // console.log(moment().seconds(+30).format());
    //     //fetch user from Rest API
    //     await apiFetch.get('/api/categories')
    //         .then((response) => {
    //             //set response user to state
    //             setCategories(response.data);
    //             console.log('categories ', categories);
    //         })
    // }

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

    const fetchTotalUsers = async () => {
      await apiFetch.get("/api/users/total").then((response) => {
          //console.log(response);
          setTotalUsers(response.data.total);
      });
    };

  const fetchTotalCategories = async () => {
    await apiFetch.get("/api/categories/total").then((response) => {
        //console.log(response);
        setTotalCategories(response.data.data);
    });
  };

  const fetchTotalTask = async () => {
    await apiFetch.get("/api/tasks/summary").then((response) => {
        //console.log(response);
        setTotalTasks(response.data.totalTask);
    });
  };

  const fetchTotalTaskStatusOpen = async () => {
    await apiFetch.get("/api/tasks/total/open").then((response) => {
        let taskStatusOpen = 0;
        if(response.data.data.length > 0){
          taskStatusOpen = response.data.data[0].total_tasks;
        }
        setTotalTasksStatusOpen(taskStatusOpen);
    });
  };

  const fetchTotalTaskStatusInProgress = async () => {
    await apiFetch.get("/api/tasks/total/in_progress").then((response) => {
        let taskStatusInProgress = 0;
        if(response.data.data.length > 0){
          taskStatusInProgress = response.data.data[0].total_tasks;
        }
        setTotalTasksStatusInProgress(taskStatusInProgress);
    });
  };

  const fetchTotalTaskStatusResolved = async () => {
    await apiFetch.get("/api/tasks/total/resolved").then((response) => {
      let taskStatusResolved = 0;
      if(response.data.data.length > 0){
        taskStatusResolved = response.data.data[0].total_tasks;
      }
      setTotalTasksStatusResolved(taskStatusResolved);
    });
  };

  const fetchTotalTaskStatusClosed = async () => {
    await apiFetch.get("/api/tasks/total/closed").then((response) => {
        let taskStatusClosed = 0;
        if(response.data.data.length > 0){
          taskStatusClosed = response.data.data[0].total_tasks;
        }
        setTotalTasksStatusClosed(taskStatusClosed);
    });
  };

  const fetchTotalTaskStatusReopen = async () => {
    await apiFetch.get("/api/tasks/total/reopen").then((response) => {
        let taskStatusReopen = 0;
        if(response.data.data.length > 0){
          taskStatusReopen = response.data.data[0].total_tasks;
        }
        setTotalTasksStatusReopen(taskStatusReopen);
    });
  };



    //hook useEffect
    useEffect(() => {
        // console.log(moment().seconds(30).format());
        //call function "fetchData"
        //fetchData();
        fetchTotalUsers();
        fetchTotalCategories();
        fetchTotalTask();
        fetchTotalTaskStatusOpen();
        fetchTotalTaskStatusInProgress();
        fetchTotalTaskStatusResolved();
        fetchTotalTaskStatusClosed();
        fetchTotalTaskStatusReopen();

        const ctx = document.getElementById('myChart').getContext('2d');
        
        if (chartRef.current) {
            chartRef.current.destroy();
        }

        chartRef.current = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ["Open", "In Progress", "Resolved", "Closed", "Reopen"],
                datasets: [{
                    data: [
                        totalTasksStatusOpen, 
                        totalTasksStatusInProgress, 
                        totalTasksStatusResolved, 
                        totalTasksStatusClosed, 
                        totalTasksStatusReopen
                    ],
                    borderColor: [
                        "rgb(0, 234, 7)",
                        "rgb(255, 205, 86)",
                        "rgb(54, 162, 235)",
                        "rgb(255, 99, 132)",
                        "rgb(153, 102, 255)"
                    ],
                    backgroundColor: [
                        "rgba(0, 234, 7)",
                        "rgba(255, 205, 86)",
                        "rgba(54, 162, 235)",
                        "rgba(255, 99, 132)",
                        "rgba(153, 102, 255)"
                    ],
                    borderWidth: 2,
                }]
            },
            options: {
              scales: {
                  x: {
                      display: false,
                  },
                  y: {
                      display: false,
                  },
              }
          },
        });

    }, [
        totalTasksStatusOpen, 
        totalTasksStatusInProgress, 
        totalTasksStatusResolved, 
        totalTasksStatusClosed, 
        totalTasksStatusReopen
    ]);

    return (
      <>
        <AdminLayout router={router}>
          <div className="flex total flex-row justify-around card-content">
          <div className="card card-total card-side bg-base-100 shadow-xl w-1/3 py-4 pl-2 ">
          <div className="flex flex-row">
              <div className="flex flex-col justify-center">
                  <UserGroupIcon className="w-16 h-16 text-primary" />
              </div>
              <div className="flex flex-col pl-2 justify-center">
                  <h1 className="font-semibold text-xl">{totalUsers}</h1>
                  <p className="font-semibold text-lg">Total Users</p>
              </div>
            </div>
          </div>
          <div className="card card-total card-side bg-base-100 shadow-xl w-1/3 py-2 pl-2  ml-2">
          <div className="flex flex-row">
              <div className="flex flex-col justify-center">
                  <Squares2X2Icon className="w-16 h-16 text-primary" />
              </div>
              <div className="flex flex-col pl-2 justify-center">
                  <h1 className="font-semibold text-xl">{totalCategories}</h1>
                  <p className="text-center  font-semibold text-lg">Total Categories</p>
              </div>
            </div>
          </div>
          <div className="card card-total card-side bg-base-100 shadow-xl w-1/3 py-2 pl-2  ml-2">
            <div className="flex flex-row">
              <div className="flex flex-col justify-center ">
                  <PencilSquareIcon className="w-16 h-16 text-primary" />
              </div>
              <div className="flex flex-col pl2 justify-center">
                  <h1 className="font-semibold text-xl">{totalTasks}</h1>
                  <p className="text-center font-semibold text-lg">Total Tasks</p>
              </div>
            </div>
          </div>
          </div>

          <div className="flex total-status flex-row justify-between card-content mt-3">

          <div className="card card-total card-side bg-base-100 shadow-xl w-5/12 py-4 pl-2 ">
            <div className="flex flex-col w-full">
              <div className="flex justify-center items-center">
                  <h1 className="text-center mx-auto font-semibold text-xl mb-2">Total Task by Status</h1>
              </div>
              <div className="flex flex-row w-full justify-center">
                <div className="flex flex-col mx-2 justify-center">
                    <h1 className="text-xl text-center">{totalTasksStatusOpen}</h1>
                    <p className="text-center text-sm font-semibold">Open</p>
                </div>
                <div className="flex flex-col mx-2 justify-center">
                    <h1 className="text-xl text-center">{totalTasksStatusInProgress}</h1>
                    <p className="text-center text-sm font-semibold">InProgress</p>
                </div>
                <div className="flex flex-col mx-2 justify-center">
                    <h1 className="text-xl text-center">{totalTasksStatusResolved}</h1>
                    <p className="text-center text-sm font-semibold">Resolved</p>
                </div>
                <div className="flex flex-col mx-2 justify-center">
                    <h1 className="text-xl text-center">{totalTasksStatusClosed}</h1>
                    <p className="text-center text-sm font-semibold">Closed</p>
                </div>
                <div className="flex flex-col mx-2 justify-center">
                    <h1 className="text-xl text-center">{totalTasksStatusReopen}</h1>
                    <p className="text-center text-sm font-semibold">Reopen</p>
                </div>
              </div>
              
            </div>
          </div>

          <div className="card card-total card-side bg-base-100 shadow-xl w-3/12 py-4 pl-2 ">
            <div className="flex flex-col w-full">
              <div className="flex justify-center items-center">
                  <h1 className="text-center mx-auto font-semibold text-xl mb-2">Total Task by Priority</h1>
              </div>
              <div className="flex flex-row w-full justify-center">
                <div className="flex flex-col mx-2 justify-center">
                    <h1 className="text-xl text-center">0</h1>
                    <p className="text-center text-sm font-semibold">Normal</p>
                </div>
                <div className="flex flex-col mx-2 justify-center">
                    <h1 className="text-xl text-center">0</h1>
                    <p className="text-center text-sm font-semibold">High</p>
                </div>
                <div className="flex flex-col mx-2 justify-center">
                    <h1 className="text-xl text-center">0</h1>
                    <p className="text-center text-sm font-semibold">Urgent</p>
                </div>
              </div>
              
            </div>
          </div>

          <div className="card card-total card-side bg-base-100 shadow-xl w-3/12 py-4 pl-2 ">
            <div className="flex flex-col w-full">
              <div className="flex justify-center items-center">
                  <h1 className="text-center mx-auto font-semibold text-xl mb-2">Total Task by Effort</h1>
              </div>
              <div className="flex flex-row w-full justify-center">
                <div className="flex flex-col mx-2 justify-center">
                    <h1 className="text-xl text-center">0</h1>
                    <p className="text-center text-sm font-semibold">Easy</p>
                </div>
                <div className="flex flex-col mx-2 justify-center">
                    <h1 className="text-xl text-center">0</h1>
                    <p className="text-center text-sm font-semibold">Medium</p>
                </div>
                <div className="flex flex-col mx-2 justify-center">
                    <h1 className="text-xl text-center">0</h1>
                    <p className="text-center text-sm font-semibold">High</p>
                </div>
              </div>
              
            </div>
          </div>

        
          


          </div>


          <div className="chart-content flex flex-row justify-center mt-4">
            <div className="chart-left flex w-full justify-center mx-1">
                <div className='chart border border-gray-400 py-6 rounded-xl  shadow-xl px-12 '>
                <h1 className="text-center text-xl font-semibold">Total Task dalam 1 Bulan by Status</h1>
                    <canvas id='myChart'></canvas>
                </div>
            </div>
            <div className="chart-right flex w-full justify-center mx-1">
                <div className='chart border border-gray-400 py-6 rounded-xl  shadow-xl px-12 '>
                <h1 className="text-center text-xl font-semibold">Total Task Pertanggal dalam 1 Bulan</h1> 
                </div>
            </div>
          </div>

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
          {/* <button className="btn btn-error" onClick={logoutHandler}>
            Logout
          </button> */}
        </AdminLayout>
      </>
    );
}