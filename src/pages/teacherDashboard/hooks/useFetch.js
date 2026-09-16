import { useQuery } from "@tanstack/react-query";

export function useFetch(fn, key, classId,  time = 5 * 60 * 1000) {

    const {data, isLoading, error, refetch} = useQuery({
        queryKey: [key, classId],
        queryFn: async () => {
                const { data } = await fn(classId);
                return data  
        },
        refetchInterval: time,
        staleTime: time,
    })

    return {
        data: data ?? [],
        loading: isLoading,
        error: error ? (error.response?.data?.detail || 'Unable to load data') : null,
        refetch,
    }

}
