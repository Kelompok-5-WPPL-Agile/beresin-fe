"use client";
import { useState, useEffect, useRef } from "react";
import { apiFetch, logout } from "@/libs/auth";
import moment from "moment";
import { useRouter } from "next/navigation";
import AdminLayout from "../../components/AdminLayout";
import { UserGroupIcon, Squares2X2Icon, PencilSquareIcon, DevicePhoneMobileIcon } from "@heroicons/react/20/solid";
import { Chart } from "chart.js/auto";
import 'chartjs-adapter-moment';


export default function ProtectedPage() {
    const router = useRouter();
    const chartRef = useRef(null);
    const chartRef2 = useRef(null);

    const [totalCategories, setTotalCategories] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalTasks, setTotalTasks] = useState(0);
    const [totalTasksMonthly, setTotalTasksMonthly] = useState(0);

    const [totalTasksStatusOpen, setTotalTasksStatusOpen] = useState(0);
    const [totalTasksStatusInProgress, setTotalTasksStatusInProgress] = useState(0);
    const [totalTasksStatusResolved, setTotalTasksStatusResolved] = useState(0);
    const [totalTasksStatusClosed, setTotalTasksStatusClosed] = useState(0);
    const [totalTasksStatusReopen, setTotalTasksStatusReopen] = useState(0);

    const [totalTasksPriorityNormal, setTotalTasksPriorityNormal] = useState(0);
    const [totalTasksPriorityHigh, setTotalTasksPriorityHigh] = useState(0);
    const [totalTasksPriorityUrgent, setTotalTasksPriorityUrgent] = useState(0);

    const [totalTasksEffortEasy, setTotalTasksEffortEasy] = useState(0);
    const [totalTasksEffortMedium, setTotalTasksEffortMedium] = useState(0);
    const [totalTasksEffortHigh, setTotalTasksEffortHigh] = useState(0);

    const [totalTasksMonthlyStatusOpen, setTotalTasksMonthlyStatusOpen] = useState(0);
    const [totalTasksMonthlyStatusInProgress, setTotalTasksMonthlyStatusInProgress] = useState(0);
    const [totalTasksMonthlyStatusResolved, setTotalTasksMonthlyStatusResolved] = useState(0);
    const [totalTasksMonthlyStatusClosed, setTotalTasksMonthlyStatusClosed] = useState(0);
    const [totalTasksMonthlyStatusReopen, setTotalTasksMonthlyStatusReopen] = useState(0);

    const [totalTasksDateFirst, setTotalTasksDateFirst] = useState([]);
    const [totalTasksDateSecond, setTotalTasksDateSecond] = useState([]);
    const [totalTasksDateThird, setTotalTasksDateThird] = useState([]);
    const [totalTasksDateFourth, setTotalTasksDateFourth] = useState([]);
    const [totalTasksDateFifth, setTotalTasksDateFifth ]= useState([]);
    const [totalTasksDateSixth, setTotalTasksDateSixth] = useState([]);
    const [totalTasksDateSeventh, setTotalTasksDateSeventh] = useState([]);


    const logoutHandler = async () => {
        await logout();
        router.push("/login");
    };

    const fetchTotalUsers = async () => {
        await apiFetch.get("/api/users/total").then((response) => {
            setTotalUsers(response.data.total);
        });
    };

    const fetchTotalCategories = async () => {
        await apiFetch.get("/api/categories/total").then((response) => {
            setTotalCategories(response.data.data);
        });
    };

    const fetchTotalTask = async () => {
        await apiFetch.get("/api/tasks/summary").then((response) => {
            setTotalTasks(response.data.totalTask);
        });
    };

    const fetchTotalTaskMonthly = async (status, setStatus) => {
      await apiFetch.get(`/api/tasks/total?status=${status}`).then((response) => {
            setStatus(response.data.totalTask)
      });
  };


    const fetchTotalTaskStatus = async (status, setStatus) => {
        await apiFetch.get(`/api/tasks/summary?status=${status}`).then((response) => {
            setStatus(response.data.totalTask);
        });
    };

    const fetchTotalTaskDateFirst = async () => {
        const startDate = moment().startOf('month').format('YYYY-MM-DD');
        const endDate = moment().startOf('month').format('YYYY-MM-DD');

        await apiFetch.get(`/api/tasks/monthly-summary?start_date=${startDate}&end_date=${endDate}`)
            .then((response) => {
                const responseData = response.data;
                setTotalTasksDateFirst(responseData);
            })
            .catch((error) => {
                console.error("Error fetching total tasks by date:", error);
            });
    };

    const fetchTotalTaskDateSecond = async () => {
        const startDate = moment().startOf('month').add(1, 'day').format('YYYY-MM-DD'); 
        const endDate = moment().startOf('month').add(5, 'days').format('YYYY-MM-DD'); 
    
        await apiFetch.get(`/api/tasks/monthly-summary?start_date=${startDate}&end_date=${endDate}`)
            .then((response) => {
                const responseData = response.data;
                setTotalTasksDateSecond(responseData);
            })
            .catch((error) => {
                console.error("Error fetching total tasks by date:", error);
            });
    };

    const fetchTotalTaskDateThird = async () => {
        const startDate = moment().startOf('month').add(6, 'days').format('YYYY-MM-DD'); 
        const endDate = moment().startOf('month').add(9, 'days').format('YYYY-MM-DD'); 

    
        await apiFetch.get(`/api/tasks/monthly-summary?start_date=${startDate}&end_date=${endDate}`)
            .then((response) => {
                const responseData = response.data;
                setTotalTasksDateThird(responseData);
            })
            .catch((error) => {
                console.error("Error fetching total tasks by date:", error);
            });
    };

    const fetchTotalTaskDateFourth = async () => {
        const startDate = moment().startOf('month').add(10, 'days').format('YYYY-MM-DD');
        const endDate = moment().startOf('month').add(13, 'days').format('YYYY-MM-DD'); 
    
        await apiFetch.get(`/api/tasks/monthly-summary?start_date=${startDate}&end_date=${endDate}`)
            .then((response) => {
                const responseData = response.data;
                setTotalTasksDateFourth(responseData);
            })
            .catch((error) => {
                console.error("Error fetching total tasks by date:", error);
            });
    };

    const fetchTotalTaskDateFifth = async () => {
        const startDate = moment().startOf('month').add(14, 'days').format('YYYY-MM-DD');
        const endDate = moment().startOf('month').add(17, 'days').format('YYYY-MM-DD');
        await apiFetch.get(`/api/tasks/monthly-summary?start_date=${startDate}&end_date=${endDate}`)
            .then((response) => {
                const responseData = response.data;
                setTotalTasksDateFifth(responseData);
            })
            .catch((error) => {
                console.error("Error fetching total tasks by date:", error);
            });
    };

    const fetchTotalTaskDateSixth = async () => {
        const startDate = moment().startOf('month').add(18, 'days').format('YYYY-MM-DD');
        const endDate = moment().startOf('month').add(22, 'days').format('YYYY-MM-DD');
    
        await apiFetch.get(`/api/tasks/monthly-summary?start_date=${startDate}&end_date=${endDate}`)
            .then((response) => {
                const responseData = response.data;
                setTotalTasksDateSixth(responseData);
            })
            .catch((error) => {
                console.error("Error fetching total tasks by date:", error);
            });
    };

    const fetchTotalTaskDateSeventh = async () => {
        const startDate = moment().startOf('month').add(23, 'days').format('YYYY-MM-DD');
        const endDate = moment().endOf('month').format('YYYY-MM-DD');
    
        await apiFetch.get(`/api/tasks/monthly-summary?start_date=${startDate}&end_date=${endDate}`)
            .then((response) => {
                const responseData = response.data;
                setTotalTasksDateSeventh(responseData);
            })
            .catch((error) => {
                console.error("Error fetching total tasks by date:", error);
            });
    };
  
  

    const fetchTotalTaskPriority = async (priority, setPriority) => {
        await apiFetch.get(`/api/tasks/summary?priority=${priority}`).then((response) => {
            setPriority(response.data.totalTask);
        });
    };

    const fetchTotalTaskEffort = async (effort, setEffort) => {
        await apiFetch.get(`/api/tasks/summary?effort=${effort}`).then((response) => {
            setEffort(response.data.totalTask);
        });
    };

    useEffect(() => {
      fetchTotalUsers();
      fetchTotalCategories();
      fetchTotalTask();
      fetchTotalTaskStatus("open", setTotalTasksStatusOpen);
      fetchTotalTaskStatus("in_progress", setTotalTasksStatusInProgress);
      fetchTotalTaskStatus("resolved", setTotalTasksStatusResolved);
      fetchTotalTaskStatus("closed", setTotalTasksStatusClosed);
      fetchTotalTaskStatus("reopen", setTotalTasksStatusReopen);
      fetchTotalTaskPriority("normal", setTotalTasksPriorityNormal);
      fetchTotalTaskPriority("high", setTotalTasksPriorityHigh);
      fetchTotalTaskPriority("urgent", setTotalTasksPriorityUrgent);
      fetchTotalTaskEffort("easy", setTotalTasksEffortEasy);
      fetchTotalTaskEffort("medium", setTotalTasksEffortMedium);
      fetchTotalTaskEffort("high", setTotalTasksEffortHigh);
      fetchTotalTaskMonthly("open", setTotalTasksMonthlyStatusOpen);
      fetchTotalTaskMonthly("in_progress", setTotalTasksMonthlyStatusInProgress);
      fetchTotalTaskMonthly("resolved", setTotalTasksMonthlyStatusResolved);
      fetchTotalTaskMonthly("closed", setTotalTasksMonthlyStatusClosed);
      fetchTotalTaskMonthly("reopen", setTotalTasksMonthlyStatusReopen);

      fetchTotalTaskDateFirst();
      fetchTotalTaskDateSecond();
      fetchTotalTaskDateThird();
      fetchTotalTaskDateFourth();
      fetchTotalTaskDateFifth();
      fetchTotalTaskDateSixth();
      fetchTotalTaskDateSeventh();

  }, [
  ]);

  useEffect(() => {

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
                    totalTasksMonthlyStatusOpen,
                    totalTasksMonthlyStatusInProgress,
                    totalTasksMonthlyStatusResolved,
                    totalTasksMonthlyStatusClosed,
                    totalTasksMonthlyStatusReopen
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
    totalTasksMonthlyStatusOpen, 
    totalTasksMonthlyStatusInProgress, 
    totalTasksMonthlyStatusResolved, 
    totalTasksMonthlyStatusClosed, 
    totalTasksMonthlyStatusReopen,
]);

useEffect(() => {
    const ctx2 = document.getElementById('dateChart').getContext('2d');
        if (chartRef2.current) {
            chartRef2.current.destroy();
        }

        const firstDate = moment().startOf('month').format('YYYY-MM-DD');
        const secondDateStart = moment().startOf('month').add(1, 'days').format('YYYY-MM-DD'); 
        const secondDateEnd = moment().startOf('month').add(5, 'days').format('YYYY-MM-DD'); 
        const thirdDateStart= moment().startOf('month').add(6, 'days').format('YYYY-MM-DD');
        const thirdDateEnd = moment().startOf('month').add(9, 'days').format('YYYY-MM-DD');
        const fourthDateStart = moment().startOf('month').add(10, 'days').format('YYYY-MM-DD');
        const fourthDateEnd = moment().startOf('month').add(13, 'days').format('YYYY-MM-DD');
        const fifthDateStart = moment().startOf('month').add(14, 'days').format('YYYY-MM-DD');
        const fifthDateEnd = moment().startOf('month').add(17, 'days').format('YYYY-MM-DD');
        const sixthDateStart = moment().startOf('month').add(18, 'days').format('YYYY-MM-DD');
        const sixthDateEnd = moment().startOf('month').add(22, 'days').format('YYYY-MM-DD');
        const seventhDateStart =  moment().startOf('month').add(23, 'days').format('YYYY-MM-DD');
        const seventhDateEnd = moment().endOf('month').format('YYYY-MM-DD');

        const firstDay = moment(firstDate).date();
        const secondDayStart = moment(secondDateStart).date(); 
        const secondDayEnd = moment(secondDateEnd).date(); 
        const thirdDayStart = moment(thirdDateStart).date();
        const thirdDayEnd = moment(thirdDateEnd).date();
        const fourthDayStart = moment(fourthDateStart).date();
        const fourthDayEnd = moment(fourthDateEnd).date();
        const fifthDayStart = moment(fifthDateStart).date();
        const fifthDayEnd = moment(fifthDateEnd).date();
        const sixthDayStart = moment(sixthDateStart).date();
        const sixthDayEnd = moment(sixthDateEnd).date();
        const seventhDayStart = moment(seventhDateStart).date();
        const seventhDayEnd = moment(seventhDateEnd).date();
    

        chartRef2.current = new Chart(ctx2, {
            type: 'line',
            data: {
                labels: [
                    firstDay,secondDayStart + "-" + secondDayEnd,thirdDayStart + "-" + thirdDayEnd,fourthDayStart + "-" + fourthDayEnd,fifthDayStart + "-" + fifthDayEnd,sixthDayStart+ "-" + sixthDayEnd,seventhDayStart + "-" + seventhDayEnd
                ],
                datasets: [
                    {
                        label: 'Open',
                        data: [totalTasksDateFirst.open,
                                totalTasksDateSecond.open,
                                totalTasksDateThird.open,
                                totalTasksDateFourth.open,
                                totalTasksDateFifth.open,
                                totalTasksDateSixth.open,
                                totalTasksDateSeventh.open,],
                        borderColor: 'rgba(0, 234, 7, 1)',
                        backgroundColor: 'rgba(0, 234, 7, 0.2)',
                        fill: false,
                    },
                    {
                        label: 'In Progress',
                        data: [
                            totalTasksDateFirst.in_progress,
                            totalTasksDateSecond.in_progress,
                            totalTasksDateThird.in_progress,
                            totalTasksDateFourth.in_progress,
                            totalTasksDateFifth.in_progress,
                            totalTasksDateSixth.in_progress,
                            totalTasksDateSeventh.in_progress,
                        ],
                        borderColor: 'rgba(255, 205, 86, 1)',
                        backgroundColor: 'rgba(255, 205, 86, 0.2)',
                        fill: false,
                    },
                    {
                        label: 'Resolved',
                        data: [
                            totalTasksDateFirst.resolved,
                            totalTasksDateSecond.resolved,
                            totalTasksDateThird.resolved,
                            totalTasksDateFourth.resolved,
                            totalTasksDateFifth.resolved,
                            totalTasksDateSixth.resolved,
                            totalTasksDateSeventh.resolved,
                        ],
                        borderColor: 'rgba(54, 162, 235, 1)',
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        fill: false,
                    },
                    {
                        label: 'Closed',
                        data: [
                            totalTasksDateFirst.closed,
                            totalTasksDateSecond.closed,
                            totalTasksDateThird.closed,
                            totalTasksDateFourth.closed,
                            totalTasksDateFifth.closed,
                            totalTasksDateSixth.closed,
                            totalTasksDateSeventh.closed,
                        ],
                        borderColor: 'rgba(255, 99, 132, 1)',
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        fill: false,
                    },
                    {
                        label: 'Reopen',
                        data: [
                            totalTasksDateFirst.reopen,
                            totalTasksDateSecond.reopen,
                            totalTasksDateThird.reopen,
                            totalTasksDateFourth.reopen,
                            totalTasksDateFifth.reopen,
                            totalTasksDateSixth.reopen,
                            totalTasksDateSeventh.reopen,
                        ],
                        borderColor: 'rgba(153, 102, 255, 1)',
                        backgroundColor: 'rgba(153, 102, 255, 0.2)',
                        fill: false,
                    },
                ],
            },
        });
}, [
    totalTasksDateFirst,
    totalTasksDateSecond,
    totalTasksDateThird,
    totalTasksDateFourth,
    totalTasksDateFifth,
    totalTasksDateSixth,
    totalTasksDateSeventh
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
                    <div className="card card-total card-side bg-base-100 shadow-xl w-1/3 py-2 pl-2 ml-2">
                        <div className="flex flex-row">
                            <div className="flex flex-col justify-center">
                                <Squares2X2Icon className="w-16 h-16 text-primary" />
                            </div>
                            <div className="flex flex-col pl-2 justify-center">
                                <h1 className="font-semibold text-xl">{totalCategories}</h1>
                                <p className="text-center font-semibold text-lg">Total Categories</p>
                            </div>
                        </div>
                    </div>
                    <div className="card card-total card-side bg-base-100 shadow-xl w-1/3 py-2 pl-2 ml-2">
                        <div className="flex flex-row">
                            <div className="flex flex-col justify-center ">
                                <PencilSquareIcon className="w-16 h-16 text-primary" />
                            </div>
                            <div className="flex flex-col pl-2 justify-center">
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
                    <div className="card card-total card-side bg-base-100 shadow-xl w-4/12 py-4 pl-2 ml-2">
                        <div className="flex flex-col w-full">
                            <div className="flex justify-center items-center">
                                <h1 className="text-center mx-auto font-semibold text-xl mb-2">Total Task by Priority</h1>
                            </div>
                            <div className="flex flex-row w-full justify-center">
                                <div className="flex flex-col mx-2 justify-center">
                                    <h1 className="text-xl text-center">{totalTasksPriorityNormal}</h1>
                                    <p className="text-center text-sm font-semibold">Normal</p>
                                </div>
                                <div className="flex flex-col mx-2 justify-center">
                                    <h1 className="text-xl text-center">{totalTasksPriorityHigh}</h1>
                                    <p className="text-center text-sm font-semibold">High</p>
                                </div>
                                <div className="flex flex-col mx-2 justify-center">
                                    <h1 className="text-xl text-center">{totalTasksPriorityUrgent}</h1>
                                    <p className="text-center text-sm font-semibold">Urgent</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card card-total card-side bg-base-100 shadow-xl w-3/12 py-4 pl-2 ml-2">
                        <div className="flex flex-col w-full">
                            <div className="flex justify-center items-center">
                                <h1 className="text-center mx-auto font-semibold text-xl mb-2">Total Task by Effort</h1>
                            </div>
                            <div className="flex flex-row w-full justify-center">
                                <div className="flex flex-col mx-2 justify-center">
                                    <h1 className="text-xl text-center">{totalTasksEffortEasy}</h1>
                                    <p className="text-center text-sm font-semibold">Easy</p>
                                </div>
                                <div className="flex flex-col mx-2 justify-center">
                                    <h1 className="text-xl text-center">{totalTasksEffortMedium}</h1>
                                    <p className="text-center text-sm font-semibold">Medium</p>
                                </div>
                                <div className="flex flex-col mx-2 justify-center">
                                    <h1 className="text-xl text-center">{totalTasksEffortHigh}</h1>
                                    <p className="text-center text-sm font-semibold">High</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="chart-content flex flex-row justify-center mt-4">
                    <div className="chart-left flex w-full justify-center mx-1">
                        <div className='chart border border-gray-400 py-6 rounded-xl shadow-xl px-12 '>
                            <h1 className="text-center text-xl font-semibold">Total Task dalam 1 Bulan by Status</h1>
                            <canvas id='myChart'></canvas>
                        </div>
                    </div>
                    <div className="chart-right flex w-full justify-center mx-1">
                        <div className='chart border border-gray-400 py-6 rounded-xl shadow-xl px-12 '>
                            <h1 className="text-center text-xl font-semibold">Total Task Pertanggal dalam 1 Bulan</h1>
                            <canvas id='dateChart' className="min-h-fit"></canvas>
                        </div>
                    </div>
                </div>
            </AdminLayout>
        </>
    );
}
