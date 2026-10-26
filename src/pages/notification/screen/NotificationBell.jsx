import React, { useEffect, useRef, useState } from 'react'
import {BellIcon} from "@phosphor-icons/react"
import { useListNotifications } from '../hooks/useListNotifications'
import { useMarkNotificationRead } from '../hooks/useMarkNotificationRead'
import { queryClient } from '../../../App'
import { useMutation } from '@tanstack/react-query'
import { timeAgo } from '../../doubts/utils/timeAgo'

function NotificationBell() {
    const wrapperRef = useRef(null)
    const [open , setOpen] = useState(false)
    const {data : notifications, loading : fetching , error} = useListNotifications()
    const {handlePost : handleMarkRead, loading : marking} = useMarkNotificationRead()
    const unread = notifications?.unread_count ?? 0
    const items = notifications?.results ?? []

    function openBell(){
        setOpen(true)
        queryClient.invalidateQueries(["notificationList"])
    }

    function closeBell(){
        setOpen(false)
         if (unread > 0) markAllRead.mutate()      
    }

const markAllRead = useMutation({
  mutationFn: async () => {
    console.log("Mutation started");

    return await handleMarkRead( { all: true });
  },

  onSuccess: () => {
    console.log("Mutation success");
    queryClient.invalidateQueries({
      queryKey: ["notifications"],
    });
  },

  onError: (error) => {
    console.error("Mutation error:", error);
  },
});

function handleMarkAllRead() {
  console.log("Mark Read");
  markAllRead.mutate();
}

     useEffect(() => {
        if (!open) return

        const onMouseDown = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) closeBell()
        }
        const onKeyDown = (e) => {
            if (e.key === "Escape") closeBell()
        }

        document.addEventListener("mousedown", onMouseDown)
        document.addEventListener("keydown", onKeyDown)
        return () => {
            document.removeEventListener("mousedown", onMouseDown)
            document.removeEventListener("keydown", onKeyDown)
        }
    }, [open, unread])


  return (
        <div ref={wrapperRef} className="relative">
            <button
                onClick={() => (open ? closeBell() : openBell())}
                aria-label="Notifications"
                className="relative p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-neutral-800 transition-colors"
            >
                <BellIcon size={32} />
                {unread > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 min-w-4.5 h-4.5 px-1 flex items-center justify-center rounded-full bg-green-600 text-white text-[10px] font-medium">
                        {unread > 9 ? "9+" : unread}
                    </span>
                )}
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-80 bg-neutral-900 border border-neutral-800 rounded-xl shadow-xl z-50 overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-800">
                        <span className="text-sm font-medium text-white">Notifications</span>
                        {unread > 0 && (
                            <button
                                onClick={handleMarkAllRead}
                                className="text-xs text-green-500 hover:text-green-400"
                            >
                                Mark all as read
                            </button>
                        )}
                    </div>

                    <div className="max-h-96 scrollbar-none overflow-y-auto">
                        {items.length === 0 ? (
                            <p className="px-4 py-8 text-center text-sm text-zinc-500">No notifications yet</p>
                        ) : (
                            items.map((n) => (
                                <div
                                    key={n.id}
                                    className={`px-4 py-3 border-b border-neutral-800 last:border-b-0 flex gap-3 ${n.is_read ? "" : "bg-green-600/5"
                                        }`}
                                >
                                    <span
                                        className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${n.kind === "error" ? "bg-red-500" : "bg-green-500"
                                            } ${n.is_read ? "opacity-30" : ""}`}
                                    />
                                    <div className="min-w-0">
                                        <p className={`text-sm ${n.is_read ? "text-zinc-400" : "text-white"}`}>
                                            {n.message}
                                        </p>
                                        <p className="text-xs text-zinc-600 mt-0.5">{timeAgo(n.created_at)}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default NotificationBell

