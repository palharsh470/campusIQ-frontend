import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
    const { user } = useAuth()
    console.log(user)
    const [mobileOpen, setMobileOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <>


            <section
                id="home"
                className="relative min-h-screen flex flex-col items-center bg-black text-white overflow-hidden bg-[url(https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/green-gradient-bg.svg)] bg-top bg-no-repeat"
            >


                <nav className="z-50 flex items-center justify-between w-full py-5 px-6 md:px-16 lg:px-24 xl:px-32 backdrop-blur">

                    <button
                        onClick={() => navigate("/")}
                        className="text-2xl font-bold tracking-tight"
                    >
                        <span className="text-green-500">Campus</span>IQ
                    </button>


                    <div className="hidden md:flex items-center gap-8 border border-green-900 bg-green-950/70 px-10 py-3 rounded-full">
                        <a
                            href="#home"
                            className="text-sm hover:text-green-400 transition"
                        >
                            Home
                        </a>

                        <a
                            href="#features"
                            className="text-sm hover:text-green-400 transition"
                        >
                            Features
                        </a>

                        <a
                            href="#how-it-works"
                            className="text-sm hover:text-green-400 transition"
                        >
                            How it Works
                        </a>

                        <a
                            href="#about"
                            className="text-sm hover:text-green-400 transition"
                        >
                            About
                        </a>
                        <button
                            onClick={()=>{
                                if(user?.role === "DIRECTOR")
                                    navigate("/director")
                                else if(user?.role === "TEACHER")
                                    navigate("/teacher")
                                else if(user?.role === "STUDENT")
                                    navigate("/student")
                                else 
                                    navigate("/org/login")
                            }}
                            className="text-sm hover:text-green-400 transition"
                        >
                            Dashboard
                        </button>
                    </div>

                 

                    {user ? (
                        <div className=" flex gap-2 flex-row">
                         <div className="hidden md:flex items-center gap-3 bg-green-950/70 border border-green-900 px-4 py-2 rounded-full">
                            <div className="w-9 h-9 rounded-full bg-green-600 flex items-center justify-center font-semibold">
                                {user.username?.charAt(0).toUpperCase()}
                            </div>

                            <div>
                                <p className="text-sm font-medium">
                                    {user.username}
                                </p>
                                <p className="text-xs text-green-400 capitalize">
                                    {user.role}
                                </p>
                            </div>
                        </div>
                        <button onClick={() => navigate("/logout")}>
                            Logout
                        </button>
                        </div>
                    ) : (
                        <div className="flex gap-3">
                            <button className="bg-green-600 px-7 py-3 rounded-full" onClick={() => navigate("/org/login")}>
                                Login
                            </button>

                            <button onClick={() => navigate("/org/register")}>
                                Get Started
                            </button>
                        </div>
                    )}

                    <button
                        onClick={() => setMobileOpen(true)}
                        className="md:hidden text-white"
                    >
                        <svg
                            width="26"
                            height="26"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M4 5h16" />
                            <path d="M4 12h16" />
                            <path d="M4 19h16" />
                        </svg>
                    </button>
                </nav>
                <div
                    className={`fixed inset-0 z-50 bg-black/90 backdrop-blur flex flex-col items-center justify-center gap-8 text-lg md:hidden transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "-translate-x-full"
                        }`}
                >
                    <a href="#home" onClick={() => setMobileOpen(false)}>
                        Home
                    </a>

                    <a href="#features" onClick={() => setMobileOpen(false)}>
                        Features
                    </a>

                    <a href="#how-it-works" onClick={() => setMobileOpen(false)}>
                        How it Works
                    </a>

                    <a href="#about" onClick={() => setMobileOpen(false)}>
                        About
                    </a>

                    <button
                        onClick={() => {
                            setMobileOpen(false);
                            navigate("/org/login");
                        }}
                        className="bg-green-600 px-7 py-3 rounded-full"
                    >
                        Login
                    </button>

                    <button
                        onClick={() => setMobileOpen(false)}
                        className="absolute top-6 right-6"
                    >
                        ✕
                    </button>
                </div>

                <div className="flex items-center gap-2 rounded-full bg-green-950/80 border border-green-900 px-2 py-2 mt-28">
                    <span className="bg-green-600 text-xs px-3 py-1 rounded-full">
                        CAMPUSIQ
                    </span>

                    <div className="flex items-center text-green-400 text-sm px-2">
                        <span>One platform for smarter campus learning</span>
                    </div>
                </div>


                <h1 className="text-center text-4xl md:text-6xl lg:text-7xl leading-tight mt-6 font-semibold max-w-4xl px-5">
                    Empowering{" "}
                    <span className="text-green-500">
                        Smarter Campuses
                    </span>
                    .
                </h1>

                <p className="text-center text-sm md:text-base leading-7 text-slate-300 max-w-2xl mt-5 px-5">
                    CampusIQ brings students, teachers, and organizations
                    together in one intelligent platform for learning,
                    assessments, doubt solving, and placement readiness.
                </p>


                <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">

                    <button
                        onClick={() => navigate("/org/register")}
                        className="bg-green-600 hover:bg-green-700 text-white rounded-full px-8 py-3 transition active:scale-95"
                    >
                        Get Started
                    </button>

                    <a
                        href="#features"
                        className="flex items-center gap-2 border border-green-900 hover:bg-green-950 transition rounded-full px-7 py-3 text-slate-200"
                    >
                        Explore CampusIQ
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M5 12h14" />
                            <path d="m13 6 6 6-6 6" />
                        </svg>
                    </a>

                </div>


                <div className="relative mt-20 mx-5 w-full max-w-5xl">
                    <div className="absolute inset-0 bg-green-500/20 blur-3xl rounded-full" />

                    <div className="relative border border-green-900/70 bg-slate-950/80 rounded-2xl p-3 shadow-2xl">

                        <div className="flex items-center gap-2 px-3 py-2 border-b border-slate-800">
                            <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                            <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />

                            <div className="ml-4 h-6 flex-1 rounded-md bg-slate-900 border border-slate-800" />
                        </div>


                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6">

                            <div className="hidden md:block md:col-span-1 space-y-3">
                                <div className="h-8 bg-green-500/20 rounded-lg" />
                                <div className="h-8 bg-slate-800 rounded-lg" />
                                <div className="h-8 bg-slate-800 rounded-lg" />
                                <div className="h-8 bg-slate-800 rounded-lg" />
                                <div className="h-8 bg-slate-800 rounded-lg" />
                            </div>

                            <div className="md:col-span-3 space-y-4">

                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    <div className="h-24 bg-slate-900 border border-slate-800 rounded-xl p-4">
                                        <p className="text-xs text-slate-400">
                                            Courses
                                        </p>
                                        <p className="text-2xl font-semibold mt-2">
                                            12
                                        </p>
                                    </div>

                                    <div className="h-24 bg-slate-900 border border-slate-800 rounded-xl p-4">
                                        <p className="text-xs text-slate-400">
                                            Assessments
                                        </p>
                                        <p className="text-2xl font-semibold mt-2">
                                            28
                                        </p>
                                    </div>

                                    <div className="hidden md:block h-24 bg-slate-900 border border-slate-800 rounded-xl p-4">
                                        <p className="text-xs text-slate-400">
                                            Placement Ready
                                        </p>
                                        <p className="text-2xl font-semibold text-green-400 mt-2">
                                            84%
                                        </p>
                                    </div>
                                </div>

                                <div className="h-52 bg-slate-900 border border-slate-800 rounded-xl p-5">
                                    <div className="h-4 w-40 bg-slate-700 rounded mb-6" />

                                    <div className="flex items-end gap-3 h-32">
                                        <div className="w-full h-16 bg-green-500/30 rounded-t-lg" />
                                        <div className="w-full h-24 bg-green-500/40 rounded-t-lg" />
                                        <div className="w-full h-20 bg-green-500/50 rounded-t-lg" />
                                        <div className="w-full h-28 bg-green-500/60 rounded-t-lg" />
                                        <div className="w-full h-32 bg-green-500/80 rounded-t-lg" />
                                        <div className="w-full h-24 bg-green-500/50 rounded-t-lg" />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </section>



            <section
                id="features"
                className="bg-black text-white py-24 px-6 md:px-16 lg:px-24"
            >
                <div className="max-w-6xl mx-auto">

                    <div className="text-center max-w-2xl mx-auto">
                        <p className="text-green-500 text-sm font-medium">
                            EVERYTHING IN ONE PLACE
                        </p>

                        <h2 className="text-3xl md:text-5xl font-semibold mt-3">
                            Built for the entire campus
                        </h2>

                        <p className="text-slate-400 mt-4">
                            From daily learning to placement preparation,
                            CampusIQ connects every part of the academic
                            journey.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-5 mt-14">

                        <FeatureCard
                   
                            title="For Students"
                            description="Access lectures, assignments, assessments, doubt solving, feedback, and placement-focused programs."
                        />

                        <FeatureCard
                            title="For Teachers"
                            description="Manage classes, upload lectures, create assignments, solve student doubts, and track performance."
                        />

                        <FeatureCard
                           
                            title="For Organizations"
                            description="Launch programs, manage departments, monitor student progress, and build a placement-ready ecosystem."
                        />

                    </div>
                </div>
            </section>



            <section
                id="how-it-works"
                className="bg-slate-950 text-white py-24 px-6 md:px-16 lg:px-24"
            >
                <div className="max-w-6xl mx-auto">

                    <div className="text-center">
                        <p className="text-green-500 text-sm">
                            HOW CAMPUSIQ WORKS
                        </p>

                        <h2 className="text-3xl md:text-5xl font-semibold mt-3">
                            Learn. Practice. Improve.
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mt-14">

                        <Step
                            number="01"
                            title="Learn"
                            text="Watch lectures and access structured learning content from your teachers."
                        />

                        <Step
                            number="02"
                            title="Practice"
                            text="Complete assignments and assessments to test your understanding."
                        />

                        <Step
                            number="03"
                            title="Improve"
                            text="Use performance reports, doubt solving, and placement programs to improve continuously."
                        />

                    </div>
                </div>
            </section>



            <section
                id="about"
                className="bg-black text-white py-24 px-6 text-center"
            >
                <div className="max-w-3xl mx-auto">

                    <h2 className="text-3xl md:text-5xl font-semibold">
                        Make your campus smarter with{" "}
                        <span className="text-green-500">
                            CampusIQ
                        </span>
                    </h2>

                    <p className="text-slate-400 mt-5">
                        Bring learning, assessments, communication, and
                        placement preparation together on one platform.
                    </p>

                    <button
                        onClick={() => navigate("/org/register")}
                        className="mt-8 bg-green-600 hover:bg-green-700 px-8 py-3 rounded-full transition"
                    >
                        Get Started
                    </button>

                </div>
            </section>

        </>
    );
};


const FeatureCard = ({ title, description }) => {
    return (
        <div  className="border border-slate-800 bg-slate-950 rounded-2xl p-7 hover:border-green-900 transition">
            <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400">
                ✦
            </div>

            <h3 className="text-xl font-semibold mt-5">
                {title}
            </h3>

            <p className="text-slate-400 text-sm leading-6 mt-3">
                {description}
            </p>
        </div>
    );
};


const Step = ({ number, title, text }) => {
    return (
        <div className="relative border border-slate-800 rounded-2xl p-7 bg-black">
            <span className="text-green-500 text-sm font-semibold">
                {number}
            </span>

            <h3 className="text-xl font-semibold mt-4">
                {title}
            </h3>

            <p className="text-slate-400 text-sm leading-6 mt-3">
                {text}
            </p>
        </div>
    );
};


export default Home;