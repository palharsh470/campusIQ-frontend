import { DotsThreeVerticalIcon } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function TeacherActionsMenu({ teacher }) {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(e) {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={menuRef} className=" flex flex-1 justify-center items-center flex-col w-32 text-sm">
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className="border rounded bg-black/10 text-gray-700 border-gray-800 shadow-sm hover:bg-gray-900 focus:outline-none"
            >
                <DotsThreeVerticalIcon color="gray" size={25} />
            </button>

            {open && (
                <div className="absolute right-0 top-40 z-10 overflow-hidden w-40 bg-black border border-gray-900 rounded shadow-md mt-2 py-1">
                    <Link to={`${teacher.id}/feedback`} state={{ teacher }} 
                        onClick={function () {
                            setOpen(false);
                        }}
                        className="block px-4 py-2 text-white hover:bg-gray-500/10 cursor-pointer"
                    >
                        Show Feedbacks
                    </Link>
                    <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="block w-full text-left px-4 py-2 text-white hover:bg-gray-500/10 cursor-pointer"
                    >
                        Copy link
                    </button>
                    <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="block w-full text-left px-4 py-2 text-white hover:bg-gray-500/10 cursor-pointer"
                    >
                        Edit file
                    </button>
                    <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="block w-full text-left px-4 py-2 hover:bg-red-500/10 text-red-500 cursor-pointer"
                    >
                        Suspend
                    </button>
                </div>
            )}
        </div>
    );
}