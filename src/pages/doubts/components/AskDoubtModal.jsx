import { useState } from "react"
import Modal from "../../../components/Modal"
import { useCreateDoubt } from "../hooks/useCreateDoubt"

const AskDoubtModal = ({ isOpen, onClose, onCreated }) => {
    const [form, setForm] = useState({ title: "", question: "" })
    const [image, setImage] = useState(null)
    const { handlePost : handleCreateDoubt, loading } = useCreateDoubt()

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = async (e) => {
        const formData = new FormData()
        formData.append("title", form.title)
        formData.append("question", form.question)
        if (image) formData.append("attachment", image)

        const created = await handleCreateDoubt(e,formData)
        if (created) {
            setForm({ title: "", question: "" })
            setImage(null)
            onCreated?.(created)
            onClose()
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Ask a Doubt">
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2 mb-4 text-sm">
                    <label className="text-zinc-400">Title</label>
                    <input
                        name="title" value={form.title} onChange={handleChange} required
                        placeholder="e.g. Why is acceleration zero at the top?"
                        className="px-4 py-3 rounded-lg border border-neutral-800 bg-neutral-950 placeholder-zinc-600 text-white focus:outline-none focus:border-neutral-600"
                    />
                </div>
                <div className="flex flex-col gap-2 mb-4 text-sm">
                    <label className="text-zinc-400">Your Question</label>
                    <textarea
                        name="question" value={form.question} onChange={handleChange} rows={4} required
                        placeholder="Explain what you're stuck on..."
                        className="px-4 py-3 rounded-lg border border-neutral-800 bg-neutral-950 placeholder-zinc-600 text-white focus:outline-none focus:border-neutral-600 resize-none"
                    />
                </div>
                <div className="flex flex-col gap-2 mb-6 text-sm">
                    <label className="text-zinc-400">Attach an Image (optional)</label>
                    <input
                        type="file" accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                        className="text-sm text-zinc-400 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border file:border-neutral-800 file:bg-neutral-900 file:text-zinc-300 file:text-xs"
                    />
                </div>
                <button type="submit" disabled={loading} className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white text-sm font-medium py-3 rounded-lg transition-colors">
                    {loading ? "Posting..." : "Post Doubt"}
                </button>
            </form>
        </Modal>
    )
}
export default AskDoubtModal