import { useLocation } from "react-router-dom";

function LecturePreview() {
    const location = useLocation();

    const url = location.state?.url;

    if (!url) {
        return <p className="text-white">Video not found</p>;
    }
    const newurl = new URL(url);
    const videoId = newurl.searchParams.get("v");

    return (
        <div className="w-full m-5 max-w-5xl mx-auto">
            <div className="text-white mb-3 text-center text-2xl">Lecture Preview</div>
            <iframe
                className="w-full aspect-video"
                 src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                title="YouTube video"
                allow="autoplay; encrypted-media"
                allowFullScreen
            />
        </div>
    );
}

export default LecturePreview;