import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { DetectionSummary } from '@/types/agro';
import { cn } from '@/lib/utils';
import { Play, Pause, Maximize2, Volume2, VolumeX } from 'lucide-react';

interface FrameDetection {
  timestamp: number; // seconds
  normal: number;
  infected: number;
  dead: number;
  total: number;
}

interface VideoPlayerProps {
  videoUrl: string;              // REAL backend video URL
  className?: string;
  onFrameChange?: (summary: DetectionSummary) => void;
}

/**
 * TEMP: frame-level stats are still mocked.
 * This keeps your per-frame UI working until
 * real per-frame metadata is wired from backend.
 */
const generateMockFrameDetections = (): FrameDetection[] => {
  const detections: FrameDetection[] = [];
  const duration = 30;

  for (let i = 0; i <= duration; i += 0.5) {
    const baseNormal = 800 + Math.floor(Math.random() * 400);
    const baseInfected = 100 + Math.floor(Math.random() * 80);
    const baseDead = 20 + Math.floor(Math.random() * 20);

    detections.push({
      timestamp: i,
      normal: baseNormal,
      infected: baseInfected,
      dead: baseDead,
      total: baseNormal + baseInfected + baseDead,
    });
  }

  return detections;
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  className,
  onFrameChange,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [frameDetections] = useState<FrameDetection[]>(generateMockFrameDetections);

  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  // Play / pause
  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, []);

  // Mute
  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  }, []);

  // Progress click
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    const progressBar = progressRef.current;
    if (!video || !progressBar) return;

    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = clickX / rect.width;
    video.currentTime = percent * duration;
  };

  // Fullscreen
  const toggleFullscreen = useCallback(() => {
    const container = videoRef.current?.parentElement;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  // Sync time + per-frame stats
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);

      const closestFrame = frameDetections.reduce((prev, curr) =>
        Math.abs(curr.timestamp - video.currentTime) <
          Math.abs(prev.timestamp - video.currentTime)
          ? curr
          : prev
      );

      if (onFrameChange) {
        onFrameChange({
          total: closestFrame.total,
          normal: closestFrame.normal,
          infected: closestFrame.infected,
          dead: closestFrame.dead,
        });
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('ended', handleEnded);
    };
  }, [frameDetections, onFrameChange]);

  // Auto-hide controls
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isPlaying) {
      timeout = setTimeout(() => setShowControls(false), 2500);
    }

    return () => clearTimeout(timeout);
  }, [isPlaying, currentTime]);

  const progressPercent =
    duration > 0 ? (currentTime / duration) * 100 : 0;

  if (!videoUrl) return null;

  return (
    <div
      className={cn(
        'relative bg-black rounded-lg overflow-hidden group',
        className
      )}
    // Removed mouse handlers for custom controls since we use native controls
    >
      {/* REAL VIDEO - Native Controls */}
      <video
        key={videoUrl}
        ref={videoRef}
        src={videoUrl}
        controls
        playsInline
        preload="metadata"
        className="w-full rounded-xl"
        style={{ height: "600px", backgroundColor: "black" }}
        muted={isMuted}
      />
    </div>
  );
};

export default VideoPlayer;
