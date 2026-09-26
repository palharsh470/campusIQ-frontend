import React, { useState } from 'react'
import Modal from '../../../components/Modal'
import ActivityIndicator from '../../../components/ActivityIndicator'
import { useOutletContext } from 'react-router-dom'
import { usePost } from '../../../hooks/usePost'
import { postLectures } from '../api/lectures'
import { queryClient } from '../../../App'

function LectureUploadModal({ isOpen, handleClose, action = "Upload lecture" }) {
    const { classGroup } = useOutletContext()

    const [form, setForm] = useState({ title: "", description: "", url: "", class_group: classGroup.id })
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const { postLoading, handlePost: handleUploadLecture } = usePost(postLectures)

    const handleSubmit = async (e) => {
     
        await handleUploadLecture(e, form)
        handleClose()
        queryClient.invalidateQueries("getLectures", classGroup.id)
    }

    return (
        <Modal isOpen={isOpen} onClose={handleClose} title={action}>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8">
                <div className="flex flex-col gap-2 mb-5 text-sm">
                    <label className="text-zinc-400">Lecture Title</label>
                    <input
                        name="title"
                        placeholder="e.g. System Design Basics"
                        value={form.title}
                        onChange={handleChange}
                        className="px-4 py-3 rounded-lg border border-neutral-800 bg-neutral-950 placeholder-zinc-600 text-white focus:outline-none focus:border-neutral-600 transition-colors"
                    />
                </div>

                <div className="flex flex-col gap-2 mb-5 text-sm">
                    <label className="text-zinc-400">Description</label>
                    <textarea
                        name="description"
                        placeholder="What does this lecture cover?"
                        rows="4"
                        value={form.description}
                        onChange={handleChange}
                        className="px-4 py-3 rounded-lg border border-neutral-800 bg-neutral-950 placeholder-zinc-600 text-white focus:outline-none focus:border-neutral-600 transition-colors resize-none"
                    ></textarea>
                </div>

                <div className="flex flex-col gap-2 mb-8 text-sm">
                    <label className="text-zinc-400">YouTube URL</label>
                    <input
                        name="url"
                        placeholder="https://youtube.com/watch?v=..."
                        value={form.url}
                        onChange={handleChange}
                        className="px-4 py-3 rounded-lg border border-neutral-800 bg-neutral-950 placeholder-zinc-600 text-white focus:outline-none focus:border-neutral-600 transition-colors"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-3.5 rounded-lg transition-colors"
                >
                    {postLoading ? <ActivityIndicator size="sm" /> : 'Upload Lecture'}
                </button>
            </form>
        </Modal>
    )
}

export default LectureUploadModal