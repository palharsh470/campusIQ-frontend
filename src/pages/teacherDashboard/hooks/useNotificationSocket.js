import { useEffect, useRef } from "react"
import api from "../../../api/axios"

export function useNotificationSocket(onNotification){
    const handlerRef = useRef(onNotification)
    handlerRef.current = onNotification
    const reconnectDelay = useRef(1000)

    useEffect(() => {
        let socket;
        let reconnectTimer;
        let stopped = false;

        async function loadMissed() {
            try {
                const res = await api.get("notifications/")
                if (res?.data?.length) {
                    res?.data?.forEach(n => handlerRef.current(n));
                }
                await api.post("notifications/mark-read/", { "ids": res?.data?.map((n) => n.id) })
            } catch (e) {
                console.error("Could not load missed notifications", e)
            }
        }

        function connect() {
            const token = localStorage.getItem("access_token")
            if (!token) return
            const wsHost = import.meta.env.VITE_WS_HOST || "localhost:8000"
            const protocol = window.location.protocol === "https:" ? "wss" : "ws"
            socket = new WebSocket(`${protocol}://${wsHost}/ws/notifications/?token=${token}`)

            socket.onopen = () => {
                reconnectDelay.current = 1000
                loadMissed()
            }

            socket.onmessage = (e) => {
                const { event, data } = JSON.parse(e.data)
                if (event === "notification") handlerRef.current(data)
            }

            socket.onclose = () => {
                if (stopped) return
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

    }, [])
}