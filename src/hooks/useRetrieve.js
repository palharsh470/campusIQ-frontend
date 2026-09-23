import { useQuery } from "@tanstack/react-query";

export function useRetrieve(fn, key ,id ,time = 5 * 60 * 1000) {

    const {data, isLoading, error, refetch} = useQuery({
        queryKey: [key, id],
        queryFn: async () => {
                const { data } = await fn(id);
                return data  
        },
        refetchInterval: time,
        staleTime: time,
        enabled : !!id
    })

    return {
        data: data ?? null,
        loading: isLoading,
        error: error ? (error.response?.data?.detail || 'Unable to load data') : null,
        refetch,
    }

}
