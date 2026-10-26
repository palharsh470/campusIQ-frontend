// Mock data shaped like the API response you will replace it with.
// Ratings are 1-5. The comments are full-length versions of the truncated ones in the old UI.

export const MOCK_TEACHER = { username: "pralove123" }

const CSE_A = { id: 11, course: "B.tech", year: 4, branch: "CSE", section: "A" }
const CSE_B = { id: 12, course: "B.tech", year: 4, branch: "CSE", section: "B" }

export const MOCK_FEEDBACK = [
    {
        id: 1,
        class_group: CSE_B,
        subject_knowledge: 4,
        doubt_resolution: 5,
        teaching_quality: 3,
        practical_learning: 4,
        comment: "Impressive way of teaching and doubt solving.",
        created_at: "2026-09-18T10:00:00Z",
    },
    {
        id: 2,
        class_group: CSE_A,
        subject_knowledge: 5,
        doubt_resolution: 4,
        teaching_quality: 5,
        practical_learning: 2,
        comment: "nice teaching",
        created_at: "2026-10-04T10:00:00Z",
    },
    {
        id: 3,
        class_group: CSE_A,
        subject_knowledge: 4,
        doubt_resolution: 4,
        teaching_quality: 5,
        practical_learning: 3,
        comment: "Impressive way to teaching and doubt clearing.",
        created_at: "2026-09-18T11:30:00Z",
    },
]