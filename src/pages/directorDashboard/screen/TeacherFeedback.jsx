import {
    UserIcon,
    ChatTextIcon,
    GraduationCapIcon
} from "@phosphor-icons/react";
import FeedbackTable from "../components/FeedbackTable";
import { getFeedback } from "../api/feedback";
import { useRetrieve } from "../hooks/useRetrieve";
import { useLocation } from "react-router-dom";

function TeacherFeedback() {

    const {state} = useLocation()
    const teacher = state?.teacher
    const {data : feedbacks, loading, error, refetch} = useRetrieve(getFeedback, "getFeedbacks", {teacher : teacher?.id})

    const groupedFeedbacks = {};
    
    feedbacks?.length && feedbacks?.forEach(function (feedback) {
console.log(feedback)
        const classId = feedback?.class_group.id;
        
        if (!groupedFeedbacks[classId]) {
            groupedFeedbacks[classId] = {
                class_group: feedback?.class_group,
                program : feedback?.program_title,
                feedbacks: []
            };
        }

        groupedFeedbacks[classId]?.feedbacks?.push(feedback);
    });
    
    console.log(groupedFeedbacks)

    const classGroups = Object.values(groupedFeedbacks);


    return (
        <div className="space-y-6">

            <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-5">

                <div className="flex items-center gap-4">

                    <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-neutral-800 bg-neutral-900">
                        <UserIcon
                            size={22}
                            weight="duotone"
                            className="text-zinc-400"
                        />
                    </div>

                    <div>
                        <h2 className="text-base font-medium text-white">
                            {teacher?.name}
                        </h2>

                        <p className="text-sm text-zinc-500">
                            @{teacher?.username}
                        </p>
                    </div>

                </div>

            </div>


            {classGroups.length === 0 && (

                <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-10 text-center">

                    <ChatTextIcon
                        size={32}
                        className="mx-auto text-zinc-600"
                    />

                    <p className="mt-3 text-sm text-zinc-400">
                        No feedback has been submitted yet.
                    </p>

                </div>

            )}


            {classGroups.map(function (group) {

                const classGroup = group?.class_group;

                return (
                    <FeedbackTable key={classGroup?.id} classGroup={classGroup} group={group}/>
                );

            })}

        </div>
    );
}


export default TeacherFeedback;