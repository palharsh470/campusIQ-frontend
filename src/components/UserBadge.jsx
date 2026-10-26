import React from 'react'
import { useNavigate } from 'react-router-dom'

function UserBadge({firstName, lastName=""}) {
    const navigate = useNavigate()
    return (
        <div className="flex flex-row gap-5 text-zinc-500">
            <p className='text-white '>Hi! {firstName} {lastName}</p>
            <button onClick={() => navigate("/logout")} className="border border-neutral-800 rounded-full text-sm px-4 py-1 text-zinc-300 hover:border-neutral-600 transition-colors">Logout</button>
        </div>
    )
}

export default UserBadge