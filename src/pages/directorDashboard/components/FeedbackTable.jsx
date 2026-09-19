import React, { memo } from 'react'
import FeedbackTableItem from './FeedbackTableItem';
import { GraduationCapIcon } from '@phosphor-icons/react';

const FeedbackTable = memo(({ classGroup, group })=> {
    return (
        <div
            className="overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950"
        >

            <div className="flex items-center justify-between border-b border-neutral-800 bg-neutral-900 px-5 py-4">

                <div className="flex items-center gap-3">

                    <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-800 bg-neutral-950">
                        <GraduationCapIcon
                            size={19}
                            className="text-zinc-400"
                        />
                    </div>

                    <div>

                        <h3 className="text-sm font-medium text-white">
                            {classGroup.course} • Year {classGroup.year}
                        </h3>

                        <p className="mt-0.5 text-xs text-zinc-500">
                            {classGroup.branch} • Section {classGroup.section}
                        </p>

                    </div>

                </div>


                <span className="rounded-full border border-neutral-800 bg-neutral-950 px-3 py-1 text-xs text-zinc-400">
                    {group.feedbacks.length} Feedback
                    {group.feedbacks.length !== 1 ? "s" : ""}
                </span>

            </div>

            <div className="overflow-x-auto">

                <table className="w-full min-w-212.5">

                    <thead>

                        <tr className="border-b border-neutral-800">

                            <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-600">
                                Subject Knowledge
                            </th>

                            <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-600">
                                Doubt Resolution
                            </th>

                            <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-600">
                                Teaching Quality
                            </th>

                            <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-600">
                                Practical Learning
                            </th>

                            <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-600">
                                Comments
                            </th>

                            <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-600">
                                Submitted
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        {group.feedbacks.map(function (feedback) {

                            return (
                               <FeedbackTableItem key={feedback.id} feedback={feedback}/>
                            );

                        })}

                    </tbody>

                </table>

            </div>

        </div>
    )
})

export default FeedbackTable