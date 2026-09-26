import React from "react"
import { getYoutubeThumbnail } from "../utils/youtube"
import { useNavigate } from "react-router-dom"


const PlayIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 5v14l11-7-11-7Z" fill="#fff" />
    </svg>
)

const LectureCard = React.memo(({ lecture }) => {
    const thumbnail = getYoutubeThumbnail(lecture.url)
    const navigate = useNavigate()

    function handleVideoPreview(url){
  
        navigate("preview", {
            state : {
                url : url
            }
        })
    }

    return (
        <div
            onClick={()=>{
                handleVideoPreview(lecture.url)
            }}
            className="group bg-neutral-900 border border-neutral-800 hover: rounded-2xl overflow-hidden flex flex-col transition-colors"
        >
            <div className="relative aspect-video bg-neutral-950">
                {thumbnail ? (
                    <img
                        src={thumbnail}
                        alt={lecture.title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-600 text-xs">
                        Preview unavailable
                    </div>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-11 h-11 rounded-full bg-green-600 flex items-center justify-center">
                        <PlayIcon />
                    </div>
                </div>
            </div>

            <div className="p-3">
                <h3 className="text-sm font-medium text-white line-clamp-1">{lecture.title}</h3>
                {lecture.description && (
                    <p className="text-xs text-zinc-500 mt-1 line-clamp-2">{lecture.description}</p>
                )}
            </div>
        </div>
    )
})

export default LectureCard