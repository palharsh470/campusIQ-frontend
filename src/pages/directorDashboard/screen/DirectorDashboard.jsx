import { Outlet } from "react-router-dom"
import Header from "../components/Header"

const DirectorDashboard = () => {


    return (
        <section className='bg-black min-h-screen'>
            <div className='flex p-10 flex-col'>
               
                <Outlet/>
            </div>
        </section>
    )
}

export default DirectorDashboard