const BenefitItem = ({ icon, text }) => {
    return (
        <div className="flex items-center gap-2">
            <div className="size-9 bg-green-500 rounded-full flex items-center justify-center shrink-0">
                {icon}
            </div>
            <span className="text-white text-sm">{text}</span>
        </div>
    )
}

export default BenefitItem