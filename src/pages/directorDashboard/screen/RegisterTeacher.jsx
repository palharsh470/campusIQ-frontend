import { useState } from "react"
import FormField from "../../../components/FormField"
import TwoColumnFormLayout from "../../../components/TwoColumnFormLayoutLeft"
import { benefits } from "../utils/TeacherBenefits"
import { usePost } from "../hooks/usePost"
import { postTeacher } from "../api/teacher"
import { queryClient } from "../../../App"

const RegisterTeacher = () => {
    const [form, setForm] = useState({ first_name:'', last_name:'', username: '', email: '', password: '' })
    const handleChange = (e)=>setForm({...form, [e.target.name] : e.target.value})
    const {loading, handlePost : handleRegisterTeacher} = usePost(postTeacher)

    async function handleSubmit(e){
        await handleRegisterTeacher(e, form)
        queryClient.invalidateQueries(["getTeachers"])
    }
    return (
        <TwoColumnFormLayout
            eyebrow="New Teacher"
            heading="Add a Teacher to Your Organization"
            description="Create a teacher account so they can start guiding classes, uploading lectures and reviewing student progress."
            benefits={benefits}
            watermark="teach"
            formTitle="Register Teacher"
            submitLabel="Register Teacher"
            handleSubmit={handleSubmit}
            loading = {loading}
        >
            <div className="flex flex-row justify-between">
                <FormField label="First Name" name="first_name" placeholder="e.g. Priya" handleChange={handleChange} />
                <FormField label="Last Name" name="last_name" placeholder="e.g. Sharma" handleChange={handleChange} />
            </div>
            <FormField label="Username" name="username" placeholder="Choose a username" handleChange={handleChange} />
            <FormField label="Email" name="email" type="email" placeholder="teacher@college.edu" handleChange={handleChange} />
            <FormField label="Password" name="password" type="password" placeholder="Set a temporary password" handleChange={handleChange} />
        </TwoColumnFormLayout>
    )
}

export default RegisterTeacher