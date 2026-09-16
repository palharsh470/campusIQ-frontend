import TwoColumnFormLayout from "../../../components/TwoColumnFormLayoutLeft"
import FormField from "../../../components/FormField"
import { benefits } from "../utils/TeacherAssignmentBenefits"
import { useFetch } from "../hooks/useFetch"
import { getClassGroup, updateClassGroup } from "../api/classGroup"
import { listProgram } from "../api/programs"
import { getTeachers } from "../api/teacher"
import { useState } from "react"
import { postAssignTeacher } from "../api/teacherAssign"
import { usePost } from "../hooks/usePost"
import { useEdit} from "../hooks/useEdit"
import { queryClient } from "../../../App"


const TeacherAssignment = () => {
    
    const [program, setProgram] = useState(null)
    const [classGroup, setClassGroup] = useState(null)
    const [teacher, setTeacher] = useState(null)

     const { data: classGroups, loading: classLoading, error : classError } = useFetch(getClassGroup, "getClassGroups")
     const { data: programs, loading: programloading, error: programError } = useFetch(listProgram, "listPrograms")
     const { data: teachers, loading: teacherLoading, error: teacherError } = useFetch(getTeachers, "getTeachers")

    const teacherOptions = teachers.map((t) => ({ value: t.id, label:`${t.first_name} ${t.last_name}`}))
    const classOptions = classGroups.map((t) => ({ value: t.id, label: `${t.course} ${t.branch} ${t.year} - ${t.section}` }))
    const programOptions = programs.map((t) => ({ value: t.id, label: t?.title?.toUpperCase() }))
    const {loading : assignLoading, handlePost : handleTeacherAssign} = usePost(postAssignTeacher)
    const {loading : updateLoading, handleEdit : handleClassGroupProgrm} = useEdit(updateClassGroup)
console.log(program, classGroup, teacher)

   async function onSubmit(e) {
      await handleTeacherAssign(e, { "class_group" : classGroup, "teacher" : teacher})
      await handleClassGroupProgrm(classGroup, { "current_program" : program})
    queryClient.invalidateQueries(["getClassGroups"])
   }

    return (
        <TwoColumnFormLayout
            eyebrow="New Assignment"
            heading="Assign a Teacher to a Class"
            description="Pick a teacher and the class group they'll teach — the program comes along with the class, no separate step needed."
            watermark="teach"
            benefits={benefits}
            formTitle="Assign Teacher"
            submitLabel="Assign Teacher"
            handleSubmit={onSubmit}
        >
            <FormField
                label="Class Group"
                name="class_group"
                type="select"
                placeholder="Select a Class"
                options={classOptions}
                handleChange={(e)=>setClassGroup(e.target.value)}
            />
            <FormField
                label="Teacher"
                name="teacher"
                type="select"
                placeholder="Select a teacher"
                options={teacherOptions}
                handleChange={(e)=>setTeacher(e.target.value)}
            />
            <FormField
                label="Program"
                name="program"
                type="select"
                placeholder="Select a Program"
                options={programOptions}
                handleChange={(e)=>setProgram(e.target.value)}
            />

            
        </TwoColumnFormLayout>
    )
}

export default TeacherAssignment