import { ordinal } from "../pages/teacherDashboard/utils/helperFunctions";

export const classLabel = (classGroup)=> `${classGroup?.course} ${ordinal(classGroup?.year)} year ${classGroup?.branch}${classGroup?.section ? ` - ${classGroup?.section}` : ""}`

export const formatDate = (date)=>{
const formatter = Intl.DateTimeFormat('en-us',{
  day:"2-digit",
  month:"short",
  year:"numeric",
})

    const dateObj = new Date(date)
    return formatter.format(dateObj)
}