import { useEffect, useState } from "react"
import FormField from "../../../components/FormField"
import { addClassGroup, getClassGroup } from "../api/classGroup"
import { useFetch } from "../hooks/useFetch"
import { usePost } from "../hooks/usePost"
import ActivityIndicator from "../../../components/ActivityIndicator"
import { enrollStudent } from "../api/student"

const CheckIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" fill="#00A63E" />
        <path d="m8 12 3 3 5-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)

const EnrollStudent = () => {
    const [form, setForm] = useState({ first_name: '', last_name: '', username: '', email: '', password: '', class_group_id: '' })
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
    const { data: classGroups, loading: fetchLoading, error, refetch } = useFetch(getClassGroup, "getClassGroups")
    const { loading: postLoading, handlePost: handleEnrollStudent } = usePost(enrollStudent)

    async function handleSubmit(e) {
        await handleEnrollStudent(e, form)
    }

    useEffect(() => {
    if (classGroups?.length && !form.class_group_id) {
        setForm((f) => ({ ...f, class_group_id: String(classGroups[0].id) }))
    }
}, [classGroups])

    return (
        <div className="bg-black min-h-screen lg:h-screen lg:overflow-hidden px-4 py-10 lg:py-6 flex items-start lg:items-center justify-center">
            <div className="w-full max-w-5xl lg:h-full lg:max-h-[95vh] flex flex-col">

                <div className="flex flex-col items-center text-center mb-6 shrink-0">
                    <span className="bg-neutral-800 text-sm text-white/80 px-6 py-2.5 rounded-full mb-4">
                        New Enrollment
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white">Enroll a Student</h1>
                    <p className="text-sm text-zinc-500 max-w-md mt-1.5">
                        Create a student account and assign them to a class group in one step.
                    </p>
                </div>

                <div className="bg-neutral-900 border  border-neutral-800 rounded-2xl p-6 md:p-8 flex-1 min-h-0 lg:overflow-hidden">
                    <form onSubmit={handleSubmit} className="h-full flex flex-col">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1 min-h-0">

                            <div className="lg:overflow-y-auto lg:pr-2">
                                <h3 className="text-white font-medium mb-1">Student Details</h3>
                                <p className="text-sm text-zinc-500 mb-5">Basic information to create their account.</p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                                    <FormField label="First Name" name="first_name" handleChange={handleChange} placeholder="e.g. Aditi" />
                                    <FormField label="Last Name" name="last_name" handleChange={handleChange} placeholder="e.g. Verma" />
                                </div>
                                <FormField label="Username" name="username" handleChange={handleChange} placeholder="Choose a username" />
                                <FormField label="Email" name="email" type="email" handleChange={handleChange} placeholder="student@college.edu" />
                                <FormField label="Password" name="password" type="password" handleChange={handleChange} placeholder="Set a temporary password" />
                            </div>

                            <div className="flex flex-col min-h-0 lg:border-l lg:border-neutral-800 lg:pl-8">
                                <h3 className="text-white font-medium mb-1">Assign to Class</h3>
                                <p className="text-sm text-zinc-500 mb-5">Select the class group this student belongs to.</p>
                                <div className="flex flex-1 flex-col justify-between">


                                    {!fetchLoading && <div className="grid grid-cols-1 gap-3 min-h-0 overflow-y-auto pr-1">
                                        {classGroups && classGroups?.map((cg, idx) => (
                                            <label key={cg.id} className="relative block cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="class_group_id"
                                                    value={cg.id}
                                                    checked={form.class_group_id === String(cg.id)}
                                                    className="peer sr-only"
                                                    onChange={handleChange}
                                                />
                                                <div className="border border-neutral-800 rounded-xl p-4 peer-checked:border-green-600 peer-checked:bg-green-600/10 transition-colors">
                                                    <span className="text-sm font-medium text-white">
                                                        {cg.course} — Year {cg.year}
                                                    </span>
                                                    <p className="text-xs text-zinc-500 mt-1">
                                                        {cg.branch}, Section {cg.section}
                                                    </p>
                                                </div>
                                                <span className="absolute top-3 right-3 opacity-0 peer-checked:opacity-100 transition-opacity">
                                                    <CheckIcon />
                                                </span>
                                            </label>
                                        ))}
                                    </div>}

                                    <button
                                        type="submit"
                                        className="w-full bg-green-600 hover:bg-green-700 text-white text-sm py-3.5 rounded-lg transition-colors mt-5 shrink-0"
                                    >
                                        {postLoading ? <ActivityIndicator size="sm" /> : `Enroll Student`}
                                    </button>
                                </div>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EnrollStudent

