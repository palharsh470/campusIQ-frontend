import { useEffect, useState } from "react";
import { listProgram } from "../api/programs";

export function useListPrograms() {

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [error, setError] = useState(null)

    async function fetchPrograms() {

        setLoading(true)
        try {
            const { data } = await listProgram()
            setData(data)
        }
        catch (err) {
            setError(err.response?.data?.detail || 'Unable to load data')
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchPrograms()
    }, [])

    return {
       programs : data , loading, error, refetch: fetchPrograms
    }

}
