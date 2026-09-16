import React from "react";
import { BoundingBoxIcon, CaretDownIcon } from "@phosphor-icons/react";
import { ordinal } from "../utils/helperFunctions";

const getClassGroupLabel = (group) =>
    `${group.course} ${ordinal(group.year)} year ${group.branch} - ${group.section}`;

const DropdownMenu = ({ classGroups, selected, onSelect }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const label = selected ? getClassGroupLabel(selected) : "Select Class Group";

    return (
        <div className="flex flex-col">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center justify-between gap-3 py-3 px-4 w-full transition-colors
                    ${selected
                        ? "border-r-4 md:border-r-[6px] bg-green-600/10 border-green-600 text-green-500"
                        : "border-r-4 md:border-r-[6px] border-transparent hover:bg-neutral-900 text-zinc-500"
                    }`}
            >
                <span className="flex items-center gap-3 min-w-0">
                    <BoundingBoxIcon size={25} className="shrink-0" />
                    <span className="md:block hidden truncate text-left">{label}</span>
                </span>
                <CaretDownIcon
                    size={16}
                    className={`md:block hidden shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"}`}
                />
            </button>

            {isOpen && (
                <div className="md:flex hidden flex-col bg-black/40">
                    {classGroups.map((group) => (
                        <button
                            key={group.id}
                            type="button"
                            onClick={() => {
                                onSelect(group);
                                setIsOpen(false);
                            }}
                            className={`text-left pl-14 pr-4 py-2.5 text-sm truncate transition-colors
                                ${selected?.id === group.id
                                    ? "text-green-500 bg-green-600/10"
                                    : "text-zinc-500 hover:text-white hover:bg-neutral-900"
                                }`}
                        >
                            {getClassGroupLabel(group)}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DropdownMenu;