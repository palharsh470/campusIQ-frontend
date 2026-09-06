import { Outlet } from "react-router-dom"

const DirectorDashboard = () => {


    return (
        <section className='bg-black min-h-screen py-16 px-4'>
            <div className='flex items-center flex-col justify-center text-center'>
                <span className='bg-neutral-800 text-sm text-white/80 px-6 py-2.5 rounded-full'>Director Dashboard</span>
                <Outlet/>
            </div>
        </section>
    )
}

export default DirectorDashboard