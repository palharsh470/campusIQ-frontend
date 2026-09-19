import React, { memo } from 'react'
import Rating from './Rating'

const FeedbackTableItem = memo(({feedback}) =>{
    return (
        <tr
            className="border-b border-neutral-800 last:border-b-0 hover:bg-neutral-900/50">
            <td className="px-5 py-4">
                <Rating
                    value={feedback?.subject_knowledge}
                />
            </td>

            <td className="px-5 py-4">
                <Rating
                    value={feedback?.doubt_resolution}
                />
            </td>

            <td className="px-5 py-4">
                <Rating
                    value={feedback?.teaching_quality}
                />
            </td>

            <td className="px-5 py-4">
                <Rating
                    value={feedback?.practical_learning}
                />
            </td>

            <td className="max-w-75 px-5 py-4">

                {feedback?.comments ? (

                    <p className="truncate text-sm text-zinc-400">
                        {feedback?.comments}
                    </p>

                ) : (

                    <span className="text-sm text-zinc-700">
                        No comment
                    </span>

                )}
            </td>

            <td className="whitespace-nowrap px-5 py-4">
                <span className="text-xs text-zinc-500">
                    {new Date(
                        feedback?.created_at
                    ).toLocaleDateString()}
                </span>
            </td>
        </tr>
    )
})

export default FeedbackTableItem