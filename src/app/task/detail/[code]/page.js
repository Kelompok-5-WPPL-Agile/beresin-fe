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
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetchData();
        fetchComments();
    }, []);

    const fetchData = async () => {
        await apiFetch.get(`/api/tasks/${code}`).then((response) => {
            setTask(response.data.data);
            //console.log(response.data.data); // untuk melihat data yang diambil dari API di console log browser
        });
    };

    const fetchComments = async () => {
        await apiFetch.get(`/api/task/comment/${code}`).then((response) => {
            setComments(response.data.data);
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="card bg-white shadow-md p-4 rounded-md">
                            <h2 className="text-lg font-semibold">Judul</h2>
                            <p>{task.title}</p>
                        </div>
                        <div className="card bg-white shadow-md p-4 rounded-md">
                            <h2 className="text-lg font-semibold">PIC</h2>
                            <p>{task.pic.name}</p>
                        </div>
                        <div className="card bg-white shadow-md p-4 rounded-md">
                            <h2 className="text-lg font-semibold">Kategori</h2>
                            <p>{task.category.name}</p>
                        </div>
                        <div className="card bg-white shadow-md p-4 rounded-md">
                            <h2 className="text-lg font-semibold">Deadline</h2>
                            <p>{moment(task.due_at).format("DD/MM/YYYY")}</p>
                        </div>
                        <div className="card bg-white shadow-md p-4 rounded-md">
                            <h2 className="text-lg font-semibold">Estimasi</h2>
                            <p>{task.estimation}</p>
                        </div>
                        <div className="card bg-white shadow-md p-4 rounded-md">
                            <h2 className="text-lg font-semibold">Prioritas</h2>
                            <p>{task.priority}</p>
                        </div>
                        <div className="card bg-white shadow-md p-4 rounded-md">
                            <h2 className="text-lg font-semibold">Effort</h2>
                            <p>{task.effort}</p>
                        </div>
                        <div className="card bg-white shadow-md p-4 rounded-md">
                            <h2 className="text-lg font-semibold">Status</h2>
                            <p>{task.status}</p>
                        </div>
                    </div>
                )}

                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        {/* <h2 className="card-title">{task?.title}</h2>
                        <p>{task?.description}</p>
                        <div className="divider"></div> */}
                        <h3 className="text-lg font-bold mb-2">Comments</h3>
                        {comments.length === 0 ? (
                            // <p className="text-gray-500">No comments yet.</p>
                            // <p className="text-gray-500"></p>
                            ''
                        ) : (
                            comments.map((comment) => (
                                <div key={comment.id} className="chat chat-start mb-4">
                                    <div className="chat-image avatar">
                                        <div className="w-10 rounded-full">
                                            <img alt={comment.user.name} src={`https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg`} />
                                        </div>
                                    </div>
                                    <div className="chat-header">
                                        {comment.user.name}
                                        <time className="text-xs opacity-50 ml-2">{moment(comment.created_at).format('HH:mm')}</time>
                                    </div>
                                    <div className="chat-bubble">{comment.comment}</div>
                                    <div className="chat-footer opacity-50">
                                        {moment(comment.created_at).fromNow()}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}