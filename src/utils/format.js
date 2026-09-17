import { ordinal } from "../pages/teacherDashboard/utils/helperFunctions";

export const classLabel = (classGroup)=> `${classGroup?.course} ${ordinal(classGroup?.year)} year ${classGroup?.branch}${classGroup?.section ? ` - ${classGroup?.section}` : ""}`