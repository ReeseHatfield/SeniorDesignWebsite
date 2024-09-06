import React from "react";
import ReactPlayer from "react-player";

interface VideoProps{
    youtubeLink: string
};

const Video = ({ youtubeLink }: VideoProps) => {
    return (
        <div>
            <ReactPlayer url={youtubeLink}/>
        </div>
    )
}

export default Video;