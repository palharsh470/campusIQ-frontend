import { Link } from "react-router-dom";
import { actions } from "../utils/dashboardactions";

export default function Actions() {
    return (
        <>

            <h2 className='text-white font-medium text-4xl md:text-[40px] mt-6'>Manage your organization</h2>
            <p className='text-base text-white/60 max-w-lg mt-2'>Create programs, build class groups, assign teachers and enroll students — all from one place.</p>
            <div className='w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10'>
                {actions.map((action, index) => (
                    <Link
                        to={action.to}
                        key={index}
                        className='bg-neutral-900 border border-neutral-800 rounded-2xl hover:-translate-y-3 hover:border-green-600/50 transition duration-300 p-6 flex flex-col text-left'
                    >
                        <div className='w-12 h-12 rounded-xl bg-[#262626] flex items-center justify-center mb-6'>
                            {action.icon}
                        </div>
                        <h3 className='text-base font-medium text-white'>{action.title}</h3>
                        <p className='text-sm text-white/50 mt-2'>{action.description}</p>
                    </Link>
                ))}
            </div>
        </>
    )
}