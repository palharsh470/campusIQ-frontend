
import { useState } from "react"
import { useOutletContext } from "react-router-dom"
import FormField from "../../../components/FormField.jsx"
import ActivityIndicator from "../../../components/ActivityIndicator.jsx"
import { useSendAnnouncement } from "../hooks/useSendAnnouncement.js"


const Announcement = () => {
    const params = useOutletContext()
    const classId = params.classGroup.id

    const [form, setForm] = useState({ class_group : classId, subject: '', message: '' })
    const [result, setResult] = useState(null) 

    const {handlePost : handleAnnouncement, loading : sending} = useSendAnnouncement()

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    async function handleSubmit(e) {


        setResult(null)

        if (!window.confirm("Send this announcement to every student in this class?")) return
        try {
            const res = await handleAnnouncement(e, form)
            setResult({ type: 'pending', text: `Announcement sent to all students of this class` })
            setForm({ subject: '', message: '', class_group : classId })
        } catch (err) {
            setResult({
                type: 'error',
                text: err.response?.data?.detail || "Something went wrong. Please try again.",
            })
        } 
    }

    return (
        <div className="flex mt-20 justify-center items-center ">

       
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 md:p-8 w-full max-w-2xl ">
            <h3 className="text-white font-medium mb-1">Send an Announcement</h3>
            <p className="text-sm text-zinc-500 mb-5">
                This will be emailed to every student in this class.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <FormField
                    label="Subject"
                    name="subject"
                    value={form.subject}
                    handleChange={handleChange}
                    placeholder="e.g. Class rescheduled"
                />

                <div>
                    <label htmlFor="message" className="block text-sm text-white/80 mb-1.5">
                        Message
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        rows={7}
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Write your announcement here..."
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-green-600 resize-none"
                    />
                </div>

                {result && (
                    <div
                        className={`text-sm rounded-lg px-4 py-3 border ${
                            result.type === 'success'
                                ? 'text-green-400 bg-green-600/10 border-green-600/30'
                                : 'text-red-400 bg-red-600/10 border-red-600/30'
                        }`}
                    >
                        {result.text}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={sending || !classId || !form.subject.trim() || !form.message.trim()}
                    className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm py-3.5 rounded-lg transition-colors"
                >
                    {sending ? <ActivityIndicator size="sm" /> : "Send Announcement"}
                </button>
            </form>
        </div>

         </div>
    )
}

export default Announcement