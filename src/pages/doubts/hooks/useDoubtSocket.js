import { useEffect, useRef } from "react"
import { useQueryClient } from "@tanstack/react-query"

export function useDoubtSocket() {
    const queryClient = useQueryClient()
    const reconnectDelay = useRef(1000)

    useEffect(() => {
        let socket
        let reconnectTimer
        let stopped = false

        function connect() {
            const token = localStorage.getItem("access_token")
            if (!token) return

            const protocol = window.location.protocol === "https:" ? "wss" : "ws"
            socket = new WebSocket(`${protocol}://localhost:8000/ws/doubts/?token=${token}`)

            socket.onopen = () => {
                reconnectDelay.current = 1000
            }

            socket.onmessage = (e) => {
                const { event, data } = JSON.parse(e.data)

                switch (event) {
                    case "new_doubt":
                    case "doubt_resolved":
                        queryClient.invalidateQueries({ queryKey: ["doubts"] })
                        if (data?.id) queryClient.invalidateQueries({ queryKey: ["doubt", String(data.id)] })
                        break
                    case "new_message":
                    case "message_liked":
                        if (data?.doubt_id) queryClient.invalidateQueries({ queryKey: ["doubt", String(data.doubt_id)] })
                        queryClient.invalidateQueries({ queryKey: ["doubts"] })
                        break
                    case "doubt_liked":
                        if (data?.id) queryClient.invalidateQueries({ queryKey: ["doubt", String(data.id)] })
                        break
                    default:
                        break
                }
            }

            socket.onclose = () => {
                if (stopped) return
                reconnectTimer = setTimeout(connect, reconnectDelay.current)
                reconnectDelay.current = Math.min(reconnectDelay.current * 2, 30000)
            }

            socket.onerror = () => socket.close()
        }

        connect()

        return () => {
            stopped = true
            clearTimeout(reconnectTimer)
            socket?.close()
        }
    }, [queryClient])
}