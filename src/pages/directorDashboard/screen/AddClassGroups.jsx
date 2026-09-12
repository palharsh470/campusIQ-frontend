import { useState } from "react";
import FormField from "../../../components/FormField";
import TwoColumnFormLayout from "../../../components/TwoColumnFormLayoutLeft";
import { ClassGroupBenefits } from "../utils/ClassGroupBenefits";
import { usePost } from "../hooks/usePost";
import { addClassGroup } from "../api/classGroup";
import { queryClient } from "../../../App";

export default function AddClassGroups() {
    const [form, setForm] = useState({ course: '', year: '', branch: '', section:'' })
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
    const {loading, handlePost : handleAddClassGroup} = usePost(addClassGroup)

    async function handleSubmit(e) {
        await handleAddClassGroup(e, form)
        queryClient.invalidateQueries(["getClassGroups"])
    }

    return (
        <TwoColumnFormLayout
            eyebrow="Add ClassGroups"
            heading="Add a new Class Group"
            description="Create a new class group under a launched program where teachers can organize and assign lectures, quizzes, and learning activities"
            benefits={ClassGroupBenefits}
            watermark="grow"
            formTitle="Add Class Group"
            submitLabel="Add Class"
            handleSubmit={handleSubmit}
            loading = {loading}
        >
            <FormField label="Course" name="course" placeholder="e.g. B.tech" handleChange={handleChange} />
            <FormField label="Year" name="year" placeholder="e.g. 2" type="number" handleChange={handleChange} />
            <FormField label="Branch" name="branch" placeholder="e.g. CSE" handleChange={handleChange}  />
            <FormField label="Section" name="section" placeholder="e.g. B" handleChange={handleChange}  />
        </TwoColumnFormLayout>
    );
}
