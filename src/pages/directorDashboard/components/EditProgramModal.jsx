import { useState, useEffect } from "react"
import Modal from "../../../components/Modal"
import FormField from "../../../components/FormField"

const EditProgramModal = ({ program, isOpen, onClose, handleEdit }) => {
    const [form, setForm] = useState({ title: '', description: '', duration_weeks: '' })
    console.log("editpage", form)
    useEffect(() => {
        if (program) {
            setForm({
                title: program.title || '',
                description: program.description || '',
                duration_weeks: program.duration_weeks || '',
            })
        }
    }, [program])

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
    async function handleSubmit(e) {
        e.preventDefault()
        await handleEdit(program.id, form)
        onClose()
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Edit Program">
            <form onSubmit={handleSubmit}>
                <FormField
                    label="Program Title"
                    name="title"
                    placeholder="e.g. Placement Bootcamp"
                    value={form.title}
                    handleChange={handleChange}
                />
                <FormField
                    label="Description"
                    name="description"
                    type="textarea"
                    placeholder="What will students learn?"
                    value={form.description}
                    handleChange={handleChange}
                />
                <FormField
                    label="Duration (weeks)"
                    name="duration_weeks"
                    type="number"
                    placeholder="e.g. 6"
                    value={form.duration_weeks}
                    handleChange={handleChange}
                />

                <div className="flex gap-3 mt-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 bg-neutral-800 hover:bg-neutral-700 text-white text-sm py-3 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm py-3 rounded-lg transition-colors"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </Modal>
    )
}

export default EditProgramModal