import { useState } from "react"
import { useOutletContext } from "react-router-dom"
import { getLectures } from "../api/lectures"
import { queryClient } from "../../../App"
import ActivityIndicator from "../../../components/ActivityIndicator"
import LectureUploadModal from "../components/LectureUploadModal"
import { useAlert } from "../../../context/AlertContext"
import { useFetch } from "../hooks/useFetch"
import EmptyState from "../components/EmptyState.jsx"
import LectureCard from "../../../components/LectureCard.jsx"

const VideoIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="6" width="14" height="12" rx="2" stroke="#71717a" strokeWidth="1.8" />
        <path d="m17 10 4-2.5v9L17 14" stroke="#71717a" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
)


const Lecture = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { classGroup } = useOutletContext()

    const { data: lectures, loading, error, refetch } = useFetch(getLectures, "getLectures", classGroup.id)
    const { showAlert } = useAlert()
    if (loading)
        return <ActivityIndicator></ActivityIndicator>

    return (
        <div className="px-6 sm:px-10 py-5 ">

            <div className="flex flex-row justify-between text-center mb-10">

                <h1 className="text-3xl sm:text-4xl font-bold text-white">Uploaded Lectures</h1>

                <div className="flex flex-wrap items-center justify-center gap-5 md:gap-12">
                    <button onClick={() => setIsModalOpen(true)} type="button" className="px-6 py-2 active:scale-95 transition bg-green-500 rounded text-white shadow-lg shadow-green-500/30 text-sm font-medium">New</button>
                </div>



            </div>
            {!loading && !error && lectures?.length === 0 && (
                <EmptyState
                    icon={<VideoIcon />}
                    openModal={() => setIsModalOpen(true)}
                    title="No lectures yet"
                    description="Your teacher hasn't uploaded any lectures for this class yet — check back soon."
                />
            )}
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-5">
                {lectures?.map((lecture) => (
                    <LectureCard key={lecture.id} lecture={lecture} />
                ))}
            </div>

            <LectureUploadModal isOpen={isModalOpen} handleClose={() => setIsModalOpen(false)} />

        </div>
    )
}

export default Lecture