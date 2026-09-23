import React from 'react'
import { usePost } from '../../../hooks/usePost'
import { createDoubt } from '../api/doubts'

export function useCreateDoubt(formData) {
    return usePost(createDoubt)
}
