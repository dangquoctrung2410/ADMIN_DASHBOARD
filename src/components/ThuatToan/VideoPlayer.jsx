import React, { useState, useRef } from "react";
import "./VideoPlayer.css";
import SignalBars from "./SignalBar";

const VideoPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const videoRef = useRef(null);

    const togglePlay = () => {
        if (isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    console.log(videoRef);

    const toggleFullscreen = () => {
        if (!isFullscreen) {
            if (videoRef.current.requestFullscreen) {
                videoRef.current.requestFullscreen();
            } else if (videoRef.current.mozRequestFullScreen) {
                videoRef.current.mozRequestFullScreen();
            } else if (videoRef.current.webkitRequestFullscreen) {
                videoRef.current.webkitRequestFullscreen();
            } else if (videoRef.current.msRequestFullscreen) {
                videoRef.current.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
        setIsFullscreen(!isFullscreen);
    };
    const signalStrength = 5;
    const videoURL = "./video/video.mp4";
    return (
        <div className="video-player-container">
            <video className="video" ref={videoRef} controls>
                <source src={videoURL} type="video/mp4" />
            </video>
            <div className="progess">
                <SignalBars signalStrength={signalStrength} />
            </div>
            <button className="btn" onClick={togglePlay}>
                {isPlaying ? "Pause" : "Play"}
            </button>
            <button className="fullscreen-btn" onClick={toggleFullscreen}>
                {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            </button>
        </div>
    );
};

export default VideoPlayer;
