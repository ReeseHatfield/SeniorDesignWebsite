
interface VideoProps {
    youtubeLink: string;
}

const Video = ({ youtubeLink }: VideoProps) => {
    return (
        <div className="video-responsive">
            <iframe
                width="853"
                height="480"
                src={youtubeLink}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
            />
        </div>
    );
};

export default Video;
