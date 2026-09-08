const FormField = ({ label, type = 'text', name, value, placeholder, rows, options, handleChange }) => {
    const baseClass = "px-4 py-3 rounded-lg border border-neutral-800 bg-neutral-950 placeholder-zinc-600 text-white focus:outline-none focus:border-neutral-600 transition-colors"

    return (
        <div className="flex flex-col  gap-2 mb-5 text-sm">
            <label className="text-zinc-400 self-start">{label}</label>

            {type === 'textarea' && (
                <textarea name={name} value={value} onChange={handleChange} placeholder={placeholder} rows={rows || 4} className={`${baseClass} resize-none`}></textarea>
            )}

            {type === 'select' && (
                <select name={name} value={value} onChange={handleChange} defaultValue="" className={baseClass}>
                    <option value="" disabled>{placeholder}</option>
                    {options?.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
            )}

            {type !== 'textarea' && type !== 'select' && (
                <input type={type} value={value} name={name} onChange={handleChange} placeholder={placeholder} className={baseClass} />
            )}
        </div>
    )
}

export default FormField