import { CaretLeftIcon } from '@phosphor-icons/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function BackBtn() {
    const navigate = useNavigate()
    return (
        <button
            type="button"
            onClick={() => navigate(-1)}
            className="self-start -ml-2 min-h-11 px-2 flex items-center gap-2 rounded-lg text-sm text-zinc-400 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
        >
            <CaretLeftIcon />
            Back
        </button>
    )
}

export default BackBtn