export const actions = [
    {
        id: 1,
        title: "Upload Lecture",
        exact : false,
        path: "lecture",

        description: "Share recorded lecture, slides and study material with your classes.",
        badge: null,
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00A63E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <path d="M17 8l-5-5-5 5" />
                <path d="M12 3v12" />
            </svg>
        ),
    },
    {
        id: 2,
        title: "Take Attendance",
        exact : true,
        path: "attendance",
        description: "Mark today's attendance for each of your classes in under a minute.",
        badge: "3 pending",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00A63E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 11l3 3L22 4" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
        ),
    },
    {
        id: 3,
        title: "Create Assignment",
        exact : true,
        path: "assignment",
        description: "Set up a new assignment with due dates, files and instructions.",
        badge: null,
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00A63E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
            </svg>
        ),
    },
    {
        id: 4,
        title: "Doubt Room",
        exact : false,
        path: "doubts",
        description: "Review and grade work your students have already turned in.",
        badge: "12 new",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00A63E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="16" rx="2" />
                <path d="M8 2v4M16 2v4M3 10h18" />
                <path d="m9 16 2 2 4-4" />
            </svg>
        ),
    },
    {
        id: 5,
        title: "Send Announcement",
        exact : true,
        path: "announcement",
        description: "Notify students and parents about updates or reminders.",
        badge: null,
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00A63E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 11l18-7-7 18-2.5-7.5L3 11Z" />
            </svg>
        ),
    },
    {
        id: 6,
        title: "View Timetable",
        exact : true,
        path: "timetable",
        description: "Check your upcoming classes, rooms and free periods at a glance.",
        badge: "Today",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00A63E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
        ),
    },
]