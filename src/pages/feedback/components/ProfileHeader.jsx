import { UserIcon, EnvelopeSimpleIcon, CalendarBlankIcon } from "@phosphor-icons/react";

const ProfileHeader = ({ teacher, summary, children }) => {
    const fullName = [teacher.first_name, teacher.last_name]
        .filter(Boolean)
        .join(" ");

    const joinedDate = teacher.date_joined
        ? new Date(teacher.date_joined).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
          })
        : null;

    return (
        <div className="bg-neutral-950 border border-neutral-800 rounded-2xl px-6 py-5 flex flex-wrap items-center gap-4">
            <div className="w-14 h-14 shrink-0 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white">
                <UserIcon size={28} weight="duotone" />
            </div>

            <div className="flex-1 min-w-48">
                <h2 className="text-lg font-semibold text-white">
                    {fullName || teacher.username}
                </h2>

                <p className="text-sm text-zinc-400">
                    @{teacher.username}
                </p>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2">
                    <span className="flex items-center gap-1.5 text-xs text-zinc-400">
                        <EnvelopeSimpleIcon size={14} />
                        {teacher.email}
                    </span>

                    {joinedDate && (
                        <span className="flex items-center gap-1.5 text-xs text-zinc-400">
                            <CalendarBlankIcon size={14} />
                            Joined {joinedDate}
                        </span>
                    )}
                </div>

                <p className="text-sm text-zinc-300 mt-2">
                    {summary}
                </p>
            </div>

            <div className="w-full md:w-auto">
                {children}
            </div>
        </div>
    );
};

export default ProfileHeader;