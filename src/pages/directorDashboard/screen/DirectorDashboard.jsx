import { Outlet } from "react-router-dom"

const DirectorDashboard = () => {


    return (
        <section className='bg-black min-h-screen py-16 px-4'>
            <div className='flex items-center flex-col justify-center text-center'>
                
                <Outlet/>
            </div>
        </section>
    )
}

export default DirectorDashboard