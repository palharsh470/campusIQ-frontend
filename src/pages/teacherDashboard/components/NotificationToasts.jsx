// components/NotificationToasts.jsx
import { useState, useCallback } from "react"
import { useNotificationSocket } from "../hooks/useNotificationSocket"

const NotificationToasts = () => {
    const [toasts, setToasts] = useState([])

    const dismiss = useCallback((id) => {
        setToasts((t) => t.filter((x) => x.id !== id))
    }, [])

    const add = useCallback((n) => {
        setToasts((t) => (t.some((x) => x.id === n.id) ? t : [...t, n]))   // ignore duplicates
        setTimeout(() => dismiss(n.id), 6000)
    }, [dismiss])

    useNotificationSocket(add)

    return (
        <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 w-80">
            {toasts.map((n) => (
                <div
                    key={n.id}
                    className={`rounded-xl border px-4 py-3 text-sm shadow-lg flex items-start gap-3 ${
                        n.kind === "success"
                            ? "bg-neutral-900 border-green-600/40 text-green-400"
                            : "bg-neutral-900 border-red-600/40 text-red-400"
                    }`}
                >
                    <span className="flex-1">{n.message}</span>
                    <button onClick={() => dismiss(n.id)} className="text-zinc-500 hover:text-white">✕</button>
                </div>
            ))}
        </div>
    )
}

export default NotificationToasts