import { useFetch } from "../../../hooks/useFetch"
import { listDoubts } from "../api/doubts"

export function useDoubts({ status, search, classGroup } = {}) {
    const filter = {}
    if(!classGroup)
        return
    filter.class_group = classGroup.id
    if (status) filter.status = status
    if (search) filter.search = search

    return useFetch(listDoubts, "doubts", filter)
}