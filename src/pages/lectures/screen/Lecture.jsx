
import ActivityIndicator from "../../../components/ActivityIndicator"
import { useAlert } from "../../../context/AlertContext"
import LectureCard from '../../../components/LectureCard'
import DayCalendar from '../../../components/DayCalender'
import { useLectureCalendar } from "../hooks/useLectureCalendar"
import { useOutletContext, useParams, useSearchParams } from "react-router-dom"
import { useDayLecture } from "../hooks/useDayLecture"
import { useEffect, useState } from "react"
import LectureUploadModal from "../components/LectureUploadModal"
import { useAuth } from "../../../context/AuthContext"
import { BookOpenIcon } from "@phosphor-icons/react"

function Lecture() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { classGroup } = useOutletContext();
    const [searchParams, setSearchParams] = useSearchParams();
    const { showAlert } = useAlert();
    const { user } = useAuth()
    const {
        data: daysLecture,
        calendarLoading,
        calendarError,
    } = useLectureCalendar(classGroup?.id);

    const dayNumber = searchParams.get("day_number");
    const days = daysLecture?.days ?? [];
    const currentDay = daysLecture?.current_day;

    useEffect(() => {
        if (!dayNumber && currentDay) {
            setSearchParams(
                {
                    day_number: String(currentDay),
                },
                { replace: true }
            );
        }
    }, [dayNumber, currentDay, setSearchParams]);

    const {
        data: lectures,
        lecturesLoading,
        lecturesError,
    } = useDayLecture(dayNumber, classGroup?.id);


    if (lecturesLoading || calendarLoading) {
        return <ActivityIndicator />;
    }

    const isStudent = user?.role === "STUDENT";



    return (
        <div className="bg-black min-h-screen">
            <div className="p-5 mx-auto">
                <div className='flex flex-row justify-between'>
                    <div className="flex-1">
                        <div className="flex flex-row items-center justify-between pr-5">
                            <p className="text-sm font-medium text-green-600 uppercase ">My Lectures</p>
                            <p className="text-2xl self-center font-medium text-green-100 uppercase ">DAY {dayNumber}</p>
                            {
                                user.role === "TEACHER" &&
                                <div className="flex flex-wrap items-center justify-center gap-5 md:gap-12">
                                    <button onClick={() => setIsModalOpen(true)} type="button" className="px-6 py-2 active:scale-95 transition bg-green-500 rounded text-white shadow-lg shadow-green-500/30 text-sm font-medium">New</button>
                                </div>
                            }
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-4">Recorded Lectures </h1>
                        {
                            (!lectures?.length) && 

                            <div className="flex min-h-100 items-center justify-center px-4">
                        <div className="text-center">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-900 border border-neutral-800">
                                <BookOpenIcon className="h-7 w-7 text-zinc-500" />
                            </div>

                            <h2 className="text-lg font-semibold text-zinc-200">
                                No lectures found
                            </h2>

                            <p className="mt-2 max-w-md text-sm text-zinc-500">
                                {user.role === "STUDENT"
                                    ? "There are no lectures available for this day yet."
                                    : "No lectures have been added for this day yet."}
                            </p>
                        </div>
                    </div>
                        }

                    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-5">
                        {lectures?.map((lecture) => (
                            <LectureCard key={lecture.id} lecture={lecture} />
                        ))}
                    </div>
                </div>
                <DayCalendar days={days} basePath={'student/leture'} onSelect={(day) => {
                    setSearchParams({
                        day_number: String(day),
                    });
                }} selectedDay={dayNumber} />
                {calendarError && showAlert("error", calendarError.e)}
                {lecturesError && showAlert("error", lecturesError.e)}
            </div>
            <LectureUploadModal isOpen={isModalOpen && user.role === "TEACHER"} handleClose={() => setIsModalOpen(false)} day_number={dayNumber} />

        </div>
        </div >
    )
}

export default Lecture