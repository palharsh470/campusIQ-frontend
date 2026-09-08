import BenefitItem from "../pages/directorDashboard/components/BenefitItem"
import ActivityIndicator from "./ActivityIndicator"

const TwoColumnFormLayout = ({ eyebrow, heading, description, benefits, watermark, formTitle, submitLabel, error, children, handleSubmit, loading}) => {
    return (

            <div className="w-full bg-black px-4 flex flex-col items-center justify-center min-h-screen">
                <div className="w-full max-w-275 flex flex-col md:flex-row gap-6 sm:gap-10">

                    <div className="w-full md:w-[50%] bg-green-600 rounded-[20px] p-6 md:p-12 relative overflow-hidden flex flex-col">
                        <div className="relative z-10 flex-col flex h-full">
                            <p className="text-sm font-medium text-white/70 uppercase mb-2">{eyebrow}</p>
                            <h1 className="text-3xl sm:text-[42px] font-medium text-white mt-1">{heading}</h1>
                            <p className="text-base text-white/90 mt-3">{description}</p>

                            <div className="flex flex-col gap-4 mt-8 sm:mt-12">
                                {benefits.map((b, i) => (
                                    <BenefitItem key={i} icon={b.icon} text={b.text} />
                                ))}
                            </div>
                        </div>
                        <div className="absolute bottom-4 right-6 font-semibold text-[80px] sm:text-[110px] text-green-500/60 leading-none select-none pointer-events-none">
                            {watermark}
                        </div>
                    </div>

                    <div className="w-full md:w-[50%] bg-neutral-900 border border-neutral-800 rounded-[20px] p-6 md:p-8">
                        <h2 className="text-2xl md:text-[28px] font-medium text-white mb-6">{formTitle}</h2>
                        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                        <form onSubmit={handleSubmit}>
                            {children}
                            <button
                                type="submit"
                                className="w-full flex justify-center bg-green-600 hover:bg-green-700 text-white text-sm py-3.5 rounded-lg transition-colors cursor-pointer mt-3"
                            >
                               {loading ? <ActivityIndicator size="sm" /> : `${submitLabel}`}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
    )
}

export default TwoColumnFormLayout