import { useState } from "react"
import FormField from "../../../components/FormField"
import TwoColumnFormLayout from "../../../components/TwoColumnFormLayoutRight"
import { ProgramBenefits } from "../utils/ProgramBenefits"
import { usePost } from "../hooks/usePost"
import { launchProgram } from "../api/programs"
import { queryClient } from "../../../App"


const LaunchProgram = () => {

    const [form, setForm] = useState({title : '', description : '', duration_weeks : ''})
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const {loading, handlePost : handleLaunchProgram} = usePost(launchProgram)
    

    async function handleSubmit(e){
       await handleLaunchProgram(e, form)
        queryClient.invalidateQueries(["listPrograms"])
    }
    return (
        <TwoColumnFormLayout
            eyebrow="New Program"
            heading="Launch a Placement-Ready Program"
            description="Define a new Bootcamp, GD or COE track your teachers can assign lectures and quizzes under."
            benefits={ProgramBenefits}
            watermark="grow"
            formTitle="Create Program"
            submitLabel="Launch Program"
            handleSubmit={handleSubmit}
            loading = {loading}
        >
            <FormField label="Program Title" name="title" placeholder="e.g. Placement Bootcamp" handleChange={handleChange} />
            <FormField label="Description" name="description" type="textarea" placeholder="What will students learn or achieve in this program?" handleChange={handleChange}  />
            <FormField label="Duration (weeks)" name="duration_weeks" type="number" placeholder="e.g. 6" handleChange={handleChange}  />
        </TwoColumnFormLayout>
    )
}

export default LaunchProgram