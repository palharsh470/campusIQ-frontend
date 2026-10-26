import React from 'react'
import { getFeedback } from '../api/getFeedback'
import { useRetrieve } from '../../../hooks/useRetrieve'

export function useFetchFeedbacks(teacherId) {
    return useRetrieve(getFeedback, "getFeedbacks", {teacher : teacherId})
}

