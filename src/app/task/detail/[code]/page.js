"use client";
import React, { useEffect, useState } from "react";
import { apiFetch } from "@/libs/auth";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/AdminLayout";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import moment from "moment";
import Link from "next/link";

export default function TaskDetailPage({ params }) {
    const router = useRouter();
    const code = params.code;
    const [task, setTask] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        await apiFetch.get(`/api/tasks/${code}`).then((response) => {
            setTask(response.data.data);
        });
    };

    return (
        <AdminLayout title="Detail Task">
            <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Detail Task</h1>
                    <Link href="/task" className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md">
                        <ArrowLeftIcon className="h-5 w-5" />
                        Kembali
                    </Link>
                </div>
                {task && (
                    <div className="bg-white p-4 rounded-md shadow-md">
                        <div className="mb-4">
                            <h2 className="text-lg font-semibold">Judul</h2>
                            <p>{task.title}</p>
                        </div>
                        <div className="mb-4">
                            <h2 className="text-lg font-semibold">PIC</h2>
                            <p>{task.pic.name}</p>
                        </div>
                        <div className="mb-4">
                            <h2 className="text-lg font-semibold">Kategori</h2>
                            <p>{task.category.name}</p>
                        </div>
                        <div className="mb-4">
                            <h2 className="text-lg font-semibold">Deadline</h2>
                            <p>{moment(task.due_at).format("DD/MM/YYYY")}</p>
                        </div>
                        <div className="mb-4">
                            <h2 className="text-lg font-semibold">Estimasi</h2>
                            <p>{task.estimation}</p>
                        </div>
                        <div className="mb-4">
                            <h2 className="text-lg font-semibold">Prioritas</h2>
                            <p>{task.priority}</p>
                        </div>
                        <div className="mb-4">
                            <h2 className="text-lg font-semibold">Effort</h2>
                            <p>{task.effort}</p>
                        </div>
                        <div className="mb-4">
                            <h2 className="text-lg font-semibold">Status</h2>
                            <p>{task.status}</p>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}