import { useEffect } from 'react'
import { createPortal } from 'react-dom'

const Modal = ({ isOpen, onClose, title, subtitle, icon, children, maxWidth = "max-w-lg" }) => {
    useEffect(() => {
        if (!isOpen) return

        document.body.style.overflow = 'hidden'

        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose()
        }
        document.addEventListener('keydown', handleEsc)

        return () => {
            document.removeEventListener('keydown', handleEsc)
            document.body.style.overflow = ''
        }
    }, [isOpen, onClose])

    if (!isOpen) return null

    return createPortal(
        <>
            <style>
                {`
                    @keyframes modalBackdropIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                    @keyframes modalPanelIn {
                        from { opacity: 0; transform: scale(0.95) translateY(8px); }
                        to { opacity: 1; transform: scale(1) translateY(0); }
                    }
                    .modal-backdrop { animation: modalBackdropIn 0.2s ease-out; }
                    .modal-panel { animation: modalPanelIn 0.25s cubic-bezier(0.16, 1, 0.3, 1); }
                `}
            </style>
            <div
                className="modal-backdrop fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center px-4 z-50"
                onClick={onClose}
            >
                <div
                    className={`modal-panel w-full ${maxWidth} bg-neutral-950 border border-neutral-800 rounded-3xl shadow-2xl shadow-black/60 overflow-hidden`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex items-start justify-between gap-4 px-6 md:px-8 pt-6 md:pt-8 pb-5 border-b border-neutral-900">
                        <div className="flex items-center gap-3.5">
                            {icon && (
                                <div className="w-11 h-11 rounded-xl bg-green-600/10 border border-green-600/20 flex items-center justify-center shrink-0">
                                    {icon}
                                </div>
                            )}
                            <div>
                                <h2 className="text-lg md:text-xl font-medium text-white leading-tight">{title}</h2>
                                {subtitle && <p className="text-sm text-zinc-500 mt-1">{subtitle}</p>}
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-9 h-9 flex items-center justify-center rounded-full text-zinc-500 hover:text-white bg-neutral-900 hover:bg-neutral-800 transition-colors shrink-0"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </button>
                    </div>

                    <div className="px-6 md:px-8 py-6">
                        {children}
                    </div>
                </div>
            </div>
        </>,
        document.body
    )
}

export default Modal