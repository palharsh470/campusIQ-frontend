const Star = ({ filled }) => (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
        <path
            d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3 6.1 20.6l1.3-6.6L2.5 9.4l6.6-.8z"
            fill={filled ? "#fbbf24" : "none"}
            stroke={filled ? "#fbbf24" : "#52525b"}
            strokeWidth="1.5"
            strokeLinejoin="round"
        />
    </svg>
)

const StarRating = ({ value }) => {
    const filled = Math.round(value)
    return (
        <div className="flex gap-0.5" role="img" aria-label={`${filled} out of 5 stars`}>
            {[1, 2, 3, 4, 5].map((n) => (
                <Star key={n} filled={n <= filled} />
            ))}
        </div>
    )
}

export default StarRating