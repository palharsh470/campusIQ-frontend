import { useState, useRef, useEffect } from "react";
import { DotsThreeCircleIcon, DotsThreeIcon, DotsThreeVerticalIcon, ThreeDIcon, UserIcon } from "@phosphor-icons/react";
import ActivityIndicator from "../../../components/ActivityIndicator";
import TeacherListItem from "../components/TeacherListItem";
import { useFetch } from "../hooks/useFetch";
import { getTeachers } from "../api/teacher";
import { Link, useNavigate } from "react-router-dom";
import TeacherActionsMenu from "../components/TeacherActionsMenu";



function TeacherList() {
    const { data: teachers, loading, eror, refetch } = useFetch(getTeachers, "getTeachers")
    const navigate = useNavigate()

    if (!teachers || teachers.length === 0) {
        return (
            <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-8 text-center">
                <UserIcon
                    size={32}
                    className="mx-auto text-zinc-600"
                />

                <p className="mt-3 text-sm text-zinc-400">
                    No teachers found.
                </p>
            </div>
        );
    }

    if (loading) {
        <ActivityIndicator />
    }

    return (
        <div className="relative">
            <h1 className="text-green-600  text-2xl font-semibold">Registered Teachers</h1>
            <div className="overflow-hidden flex-1 w-[90vw] m-10 rounded-xl border border-neutral-800 bg-neutral-950">

                <div className="hidden border-b  border-neutral-800 bg-neutral-900 px-5 py-3 md:grid md:grid-cols-5 md:gap-6">

                    <div className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                        Teacher
                    </div>

                    <div className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                        Username
                    </div>

                    <div className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                        Email
                    </div>

                    <div className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                        Joining Date
                    </div>
                    <div className="text-xs font-medium uppercase tracking-wider text-zinc-500">

                    </div>

                </div>

                <div className="">
                    {teachers.map(function (teacher) {

                        const teacherName =
                            teacher?.name ||
                            `${teacher?.first_name || ""} ${teacher?.last_name || ""}`.trim() ||
                            teacher.username;

                        const email = teacher?.email

                        const joining_date =
                            teacher?.date_joined ||
                            "No data availble";

                        return (
                            <div key={teacher.id} className="flex items-center flex-row item">
                                <TeacherListItem teacher={teacher} teacherName={teacherName} email={email} joining_date={joining_date} />
                                <TeacherActionsMenu teacher={teacher} />
                            </div>
                        );
                    })}
                </div>

            </div>
        </div>
    );
}


export default TeacherList;