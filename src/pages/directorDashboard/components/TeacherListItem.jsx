import { BookOpenIcon, TimerIcon, GraduationCapIcon, IdentificationCardIcon, MailboxIcon, User, UserIcon, EnvelopeIcon } from '@phosphor-icons/react'

import React from 'react'
import { formatDate } from '../../../utils/format'

const TeacherListItem =React.memo(({teacher, teacherName, email, joining_date})=> {
    
    return (
        <div
            key={teacher.id}
            className="grid grid-cols-1 flex-8 gap-4 border-b border-neutral-800 px-5 py-5 last:border-b-0 hover:bg-neutral-900/60 md:grid-cols-4 md:items-center md:gap-6"
        >

            <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-neutral-800 bg-neutral-900">
                    <UserIcon
                        size={20}
                        weight="duotone"
                        className="text-zinc-400"
                    />
                </div>

                <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-white">
                        {teacherName}
                    </p>

                    <p className="text-xs text-zinc-600 md:hidden">
                        Teacher
                    </p>
                </div>

            </div>

            <div className="flex items-center gap-3">

                <IdentificationCardIcon
                    size={19}
                    className="shrink-0 text-zinc-600"
                />

                <div className="min-w-0">
                    <p className="text-xs text-zinc-600 md:hidden">
                        Username
                    </p>

                    <p className="truncate text-sm text-zinc-300">
                        @{teacher?.username}
                    </p>
                </div>

            </div>

            <div className="flex items-center gap-3">

                <EnvelopeIcon
                    size={20}
                    className="shrink-0 text-zinc-600"
                />

                <div className="min-w-0">
                    <p className="text-xs text-zinc-600 md:hidden">
                        Email
                    </p>

                    <p className="truncate text-sm text-zinc-300">
                        {email}
                    </p>
                </div>

            </div>

            <div className="flex items-center gap-3">

                <TimerIcon
                    size={20}
                    className="shrink-0 text-zinc-600"
                />

                <div className="min-w-0">
                    <p className="text-xs text-zinc-600 md:hidden">
                        Joining Date
                    </p>

                    <p className="truncate text-sm text-zinc-300">
                        {formatDate(joining_date)}
                    </p>
                </div>

            </div>

        </div>
    )
})

export default TeacherListItem