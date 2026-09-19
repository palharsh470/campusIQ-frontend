import { StarIcon } from "@phosphor-icons/react";

export default function Rating({ value }) {
    return (
        <div className="flex items-center gap-1">
            <StarIcon
                size={15}
                weight="fill"
                className="text-yellow-500"
            />

            <span className="text-sm text-zinc-300">
                {value}/5
            </span>
        </div>
    );
}