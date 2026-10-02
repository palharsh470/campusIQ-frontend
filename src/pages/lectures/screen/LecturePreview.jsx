import { useState } from "react";
import { useLocation } from "react-router-dom";

function LecturePreview() {
    const location = useLocation();
    const [loading, setLoading] = useState(true)
    const url = location.state?.url;

    if (!url) {
        return <p className="text-white">Video not found</p>;
    }

    const newurl = new URL(url);
    const videoId = newurl.searchParams.get("v");

    return (
        <div className="w-full m-5 max-w-5xl mx-auto">
            <div className="text-white mb-3 text-center text-2xl">Lecture Preview</div>
            {loading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-900 z-10">
                    <div className="h-8 w-8 border-4 border-neutral-700 border-t-green-500 rounded-full animate-spin" />

                    <p className="mt-3 text-sm text-zinc-400">
                        Loading video...
                    </p>
                </div>
            )}
            <iframe
                className="w-full aspect-video"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                title="YouTube video"
                allow="autoplay; encrypted-media"
                allowFullScreen
                onLoad={() => setLoading(false)}
            />
        </div>
    );
}

export default LecturePreview;