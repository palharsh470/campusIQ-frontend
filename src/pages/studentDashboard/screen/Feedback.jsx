
import { useState } from "react";
import { Star } from "@phosphor-icons/react";
import Rating from "../components/Rating";
import { useOutletContext } from "react-router-dom";
import { usePost } from "../hooks/usePost";
import { useFetch } from "../hooks/useFetch";
import { getLastFeedback, postFeedback } from "../api/feedback";
import ActivityIndicator from "../../../components/ActivityIndicator";
import { useAlert } from "../../../context/AlertContext";

function TeacherFeedbackForm() {
    const { enrollment , classGroup} = useOutletContext()
    const { showAlert } = useAlert()
    const [form, setForm] = useState({
        subject_knowledge: 0,
        doubt_resolution: 0,
        teaching_quality: 0,
        practical_learning: 0,
        comments: "",
    });
    const { loading: postLoading, handlePost: handleFeedbackSubmit } = usePost(postFeedback)
    const { data: lastFeedback, loading: fetchLoading, error, refetch } = useFetch(getLastFeedback, "getLastFeedback", enrollment)
    const FEEDBACK_COOLDOWN_DAYS = 7
    let daysRemaining = 0

    if (lastFeedback?.available) {
        const lastDate = new Date(lastFeedback?.feedback_date)
        const nextAllowedDate = new Date(lastDate)
        nextAllowedDate.setDate(nextAllowedDate.getDate() + FEEDBACK_COOLDOWN_DAYS)

        const msRemaining = nextAllowedDate - new Date()
        daysRemaining = Math.max(0, Math.ceil(msRemaining / (1000 * 60 * 60 * 24)))
    }
    function handleRatingChange(field, value) {
        setForm(function (previous) {
            return {
                ...previous,
                [field]: value,
            };
        });
    }

    function handleChange(e) {
        setForm(function (previous) {
            return {
                ...previous,
                [e.target.name]: e.target.value,
            };
        });
    }

    async function handleSubmit(e) {
        await handleFeedbackSubmit(e, form)

    }

    return (
        <div className="min-h-screen bg-neutral-950 px-4 py-8">
            <div className="mx-auto max-w-2xl">


                <div className="mb-8">
                    <h1 className="text-2xl font-semibold text-white">
                        Teacher Feedback
                    </h1>

                    <p className="mt-2 text-sm text-zinc-400">
                        Share your experience with your teacher.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6 rounded-2xl border border-zinc-800 bg-neutral-900 p-6"
                >
                    <div className="rounded-xl border border-zinc-800 bg-neutral-950 p-4">
                        <p className="text-xs text-zinc-500">
                            Teacher
                        </p>

                        <p className="mt-1 text-base font-medium text-white">
                            {classGroup?.assigned_teacher?.name || "Teacher"}
                        </p>
                    </div>


                    <div className="space-y-6">

                        <div className="flex flex-row justify-between">


                            <Rating
                                label="Subject Knowledge"
                                value={form.subject_knowledge}
                                onChange={function (value) {
                                    handleRatingChange(
                                        "subject_knowledge",
                                        value
                                    );
                                }}
                            />

                            <Rating
                                label="Doubt Resolution"
                                value={form.doubt_resolution}
                                onChange={function (value) {
                                    handleRatingChange(
                                        "doubt_resolution",
                                        value
                                    );
                                }}
                            />
                        </div>
                        <div className="flex flex-row justify-between items-center">

                            <Rating
                                label="Teaching Quality"
                                value={form.teaching_quality}
                                onChange={function (value) {
                                    handleRatingChange(
                                        "teaching_quality",
                                        value
                                    );
                                }}
                            />

                            <Rating
                                label="Practical Learning"
                                value={form.practical_learning}
                                onChange={function (value) {
                                    handleRatingChange(
                                        "practical_learning",
                                        value
                                    );
                                }}
                            />


                        </div>
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="comments"
                            className="text-sm font-medium text-zinc-300"
                        >
                            Additional Comments
                        </label>

                        <textarea
                            id="comments"
                            name="comments"
                            value={form.comments}
                            onChange={handleChange}
                            rows={5}
                            placeholder="Share any additional feedback..."
                            className="w-full resize-none rounded-xl border border-zinc-800 bg-neutral-950 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-zinc-600"
                        />
                    </div>

                    <button
                        disabled={daysRemaining > 0}
                        type="submit"
                        className="w-full rounded-xl bg-white px-4 py-3 text-sm font-medium text-black transition hover:bg-zinc-200"
                    >
                        {postLoading ? <ActivityIndicator size="sm" /> : (daysRemaining > 0) ? `You can submit the feedback after ${daysRemaining} days` : "Submit"}

                    </button>

                </form>
            </div>
        </div>
    );
}

export default TeacherFeedbackForm;

