import { useMemo, useState } from "react"
import ProfileHeader from "../components/ProfileHeader"
import ClassFilter from "../components/ClassFilter"
import CategoryBars from "../components/CategoryBars"
import ClassRadarChart from "../components/ClassRadarChart"
import FeedbackList from "../components/FeedbackList"

import {
    getCategoryAverages,
    getClassOptions,
    getInsights,
    getOverall,
    getRadarData,
} from "../utils/feedbackStats"
import StatCard from "../components/StatCard"
import { CaretLeftIcon } from "@phosphor-icons/react"
import { useLocation, useNavigate } from "react-router-dom"
import { useFetchFeedbacks } from "../hooks/useFetchFeedbacks"
import ActivityIndicator from "../../../components/ActivityIndicator"
import { useAlert } from "../../../context/AlertContext"
import BackBtn from "../../../components/BackBtn"

const joinLabels = (items) => items.map((i) => i.label).join(", ")

const TeacherFeedback = () => {

    const navigate = useNavigate()
    const { state } = useLocation()
    const showAlert = useAlert()
    const teacher = state?.teacher
    const { data: feedbacks, loading, error, refetch } = useFetchFeedbacks(teacher?.id)

    const [selected, setSelected] = useState("all")

    const classOptions = useMemo(() => getClassOptions(feedbacks), [feedbacks])

    const visible = useMemo(
        () =>
            (selected === "all" ? feedbacks : feedbacks.filter((f) => f.class_group.id === selected))
                ?.slice()
                ?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)),
        [feedbacks, selected]
    )

    const averages = useMemo(() => getCategoryAverages(visible), [visible])
    const overall = getOverall(averages)
    const { strongest, weakest } = getInsights(averages)

    const radarClasses = selected === "all" ? classOptions : classOptions.filter((c) => c.id === selected)
    const radarData = useMemo(() => getRadarData(visible, radarClasses), [visible, radarClasses])


    if (loading) {
        return (
            <ActivityIndicator size="md" label={"Loading"} fullScreen={true} />
        )
    }
    if (error) {
        return showAlert("error", error || "Something went wrong")
    }


    return (

        <div className="bg-black min-h-screen ">
            <div className="max-w-full mx-auto flex flex-col gap-6">
                <div className="flex flex-row justify-center items-center">
                    <BackBtn/>
                    <div className="flex-1 flex justify-center items-center flex-col">
                        <h1 className="text-white font-bold text-2xl">Feedback</h1>
                        <p className="text-sm text-zinc-500 mt-1">See how students rate your teaching, class by class.</p>
                    </div>
                </div>
                <ProfileHeader
                    teacher={teacher}
                    summary={`${visible.length} ${visible.length === 1 ? "response" : "responses"} from ${radarClasses.length} ${radarClasses.length === 1 ? "class" : "classes"}`}
                >
                    <ClassFilter options={classOptions} selected={selected} onChange={setSelected} />
                </ProfileHeader>

                {


                    feedbacks?.length === 0 && <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 flex flex-col items-center justify-center text-center min-h-80 gap-2">
                        <h2 className="text-base font-semibold text-white">
                            Class comparison
                        </h2>
                        <p className="text-sm text-neutral-400">
                            No feedback available yet.
                        </p>
                        <p className="text-xs text-neutral-500">
                            Once students submit feedback, category ratings will appear here.
                        </p>
                    </div>

                }

                {

                    feedbacks?.length && <><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <StatCard label="Overall rating" value={overall.toFixed(1)} suffix="/ 5" stars={overall} />
                        <StatCard
                            label="Total feedback"
                            value={visible.length}
                            hint={`Across ${radarClasses.length} ${radarClasses.length === 1 ? "class" : "classes"}`}
                        />
                        <StatCard
                            label="Strongest areas"
                            value={strongest.value.toFixed(1)}
                            tone="good"
                            hint={joinLabels(strongest.items)}
                        />
                        <StatCard
                            label="Needs attention"
                            value={weakest.value.toFixed(1)}
                            tone="warn"
                            hint={joinLabels(weakest.items)}
                        />
                    </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <CategoryBars averages={averages} weakKeys={weakest.items.map((i) => i.key)} />
                            <ClassRadarChart data={radarData} classes={radarClasses} />
                        </div>

                        <FeedbackList feedbacks={visible} />
                    </>
                }
            </div>
        </div>
    )
}

export default TeacherFeedback