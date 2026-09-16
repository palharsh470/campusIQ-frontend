const EmptyState = ({ icon,openModal, title, description, action }) => {
    return (
        <div onClick={openModal} className="border border-dashed border-neutral-800 rounded-2xl py-20 px-6 flex flex-col items-center text-center">
            {icon && (
                <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center mb-4">
                    {icon}
                </div>
            )}
            <h3 className="text-white font-medium mb-1">{title}</h3>
            {description && (
                <p className="text-sm text-zinc-500 max-w-xs mb-6">{description}</p>
            )}
            {action}
        </div>
    )
}

export default EmptyState