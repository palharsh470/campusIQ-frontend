import { Star } from "@phosphor-icons/react";

export default function Rating({ value, onChange, label }) {
    return (
        <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">
                {label}
            </label>

            <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(function (rating) {
                    return (
                        <button
                            key={rating}
                            type="button"
                            onClick={function () {
                                onChange(rating);
                            }}
                            className="transition-transform hover:scale-110"
                        >
                            <Star
                                size={28}
                                weight={rating <= value ? "fill" : "regular"}
                                className={
                                    rating <= value
                                        ? "text-yellow-400"
                                        : "text-zinc-600"
                                }
                            />
                        </button>
                    );
                })}
            </div>
        </div>
    );
}