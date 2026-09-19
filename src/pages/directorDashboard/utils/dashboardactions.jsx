export const actions = [
    {
        title: "Create Program",
        description: "Set up a new placement-ready program like Bootcamp, GD or COE for your organization.",
        to: "/director/programs/new",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="3" width="16" height="18" rx="2" stroke="#00A63E" strokeWidth="1.8" />
                <path d="M8 8h8M8 12h8M8 16h5" stroke="#00A63E" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
        )
    },
    {
        title: "Create Class Group",
        description: "Add a new batch — course, year, branch and section — under your organization.",
        to: "/director/class-groups/new",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="9" cy="8" r="3" stroke="#00A63E" strokeWidth="1.8" />
                <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="#00A63E" strokeWidth="1.8" strokeLinecap="round" />
                <circle cx="17" cy="8" r="2.4" stroke="#00A63E" strokeWidth="1.8" />
                <path d="M15.5 14.2c2.9.4 5 2.7 5 5.8" stroke="#00A63E" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
        )
    },
    {
        title: "Assign Teacher",
        description: "Assign a teacher from your organization to a specific class group.",
        to: "/director/teacher-assignments/new",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="5" y="4" width="14" height="17" rx="2" stroke="#00A63E" strokeWidth="1.8" />
                <path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" stroke="#00A63E" strokeWidth="1.8" />
                <path d="m9 13 2 2 4-4" stroke="#00A63E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        )
    },
    {
        title: "Enroll Student",
        description: "Create a student account and enroll them into a class group.",
        to: "/director/students/new",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="9" cy="8" r="3.5" stroke="#00A63E" strokeWidth="1.8" />
                <path d="M2.5 20c0-3.6 2.9-6.5 6.5-6.5s6.5 2.9 6.5 6.5" stroke="#00A63E" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M18 8v6M15 11h6" stroke="#00A63E" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
        )
    },
    {
        title: "Register Teacher",
        description: "Register a Teacher account and assign them into a class group.",
        to: "/director/teachers/new",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="9" cy="8" r="3.5" stroke="#00A63E" strokeWidth="1.8" />
                <path d="M2.5 20c0-3.6 2.9-6.5 6.5-6.5s6.5 2.9 6.5 6.5" stroke="#00A63E" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M18 8v6M15 11h6" stroke="#00A63E" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
        )
    },
    {
        title: "View Launched Programs",
        description: "View all programs that have been launched and are currently available.",
        to: "/programs",
        icon: (
            <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M4 5.5C4 4.67 4.67 4 5.5 4H18.5C19.33 4 20 4.67 20 5.5V18.5C20 19.33 19.33 20 18.5 20H5.5C4.67 20 4 19.33 4 18.5V5.5Z"
                    stroke="#00A63E"
                    strokeWidth="1.8"
                />
                <path
                    d="M8 8H16M8 12H16M8 16H13"
                    stroke="#00A63E"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                />
            </svg>
        )
    },
    {
    title: "View Class Groups",
    description: "View every class group with its assigned teacher and current program.",
    to: "/director/class-groups",
    icon: (
        <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                x="4"
                y="5"
                width="16"
                height="14"
                rx="2"
                stroke="#00A63E"
                strokeWidth="1.8"
            />
            <path
                d="M4 10H20M4 14.5H20"
                stroke="#00A63E"
                strokeWidth="1.4"
            />
            <path
                d="M9 5V19"
                stroke="#00A63E"
                strokeWidth="1.4"
            />
        </svg>
    )
},
{
    title: "View Teachers",
    description: "View all registered teachers in your organization.",
    to: "/director/teachers",
    icon: (
        <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M16 20V18C16 16.3431 14.6569 15 13 15H7C5.34315 15 4 16.3431 4 18V20"
                stroke="#00A63E"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
            <circle
                cx="10"
                cy="8"
                r="3"
                stroke="#00A63E"
                strokeWidth="1.8"
            />
            <path
                d="M17 11C18.6569 11 20 9.65685 20 8C20 6.34315 18.6569 5 17 5"
                stroke="#00A63E"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
            <path
                d="M20 20V18C20 16.3431 18.6569 15 17 15"
                stroke="#00A63E"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
        </svg>
    )
}

]