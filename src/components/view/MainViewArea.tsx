import React, { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { useApp } from '@/contexts/AppContext';

import MapContainer from '@/components/map/MapContainer';
import VideoPlayer from '@/components/video/VideoPlayer';
import DetectionSummaryPanel from '@/components/detection/DetectionSummaryPanel';

import { Video, Map, LayoutGrid } from 'lucide-react';

type ViewTab = 'video' | 'map';

interface MainViewAreaProps {
  showDetections: boolean;
  isInferenceRunning: boolean;
  className?: string;
  detections: any[];
  detectionSummary: any;
  inferenceVideoUrl?: string;
}

const MainViewArea: React.FC<MainViewAreaProps> = ({
  showDetections,
  isInferenceRunning: propIsInferenceRunning, // Renamed to avoid conflict with context variable
  className,
}) => {
  const { t } = useLanguage();
  /* 
    FIX: Do not use videoUrl from context (which uses /static).
    Construct it locally using currentInference.outputs 
    to point to /outputs path as required by backend.
  */
  const { currentInference, detectionSummary, isInferenceRunning } = useApp();

  const outputs = currentInference?.outputs;

  const mapUrl = outputs?.map
    ? `http://127.0.0.1:8000/outputs/${outputs.map}`
    : undefined;

  const videoUrl = outputs?.video
    ? `http://127.0.0.1:8000/outputs/${outputs.video}`
    : '';

  const [activeTab, setActiveTab] = useState<ViewTab>('video');
  const [liveFrameSummary, setLiveFrameSummary] = useState<any>(null);

  const handleFrameChange = useCallback((summary: any) => {
    setLiveFrameSummary(summary);
  }, []);

  /* 
    FIX: Lock summary to final backend results (currentInference.outputs).
    Map 'total_cabbages' -> 'total' to match DetectionSummary interface.
    Process liveFrameSummary for overlay ONLY, not for numbers.
  */
  const displaySummary = currentInference?.outputs ? {
    total: currentInference.outputs.total_cabbages,
    normal: 0,
    infected: 0,
    dead: 0
  } : detectionSummary;

  return (
    <div className={cn('flex flex-col min-w-0', className)}>
      {/* Tabs */}
      {showDetections && (
        <div className="flex items-center justify-between px-4 py-2 bg-card border-b border-border">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveTab('video')}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium',
                activeTab === 'video'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent'
              )}
            >
              <Video size={16} />
              {t.tabs.videoResult}
            </button>

            <button
              onClick={() => setActiveTab('map')}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium',
                activeTab === 'map'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent'
              )}
            >
              <Map size={16} />
              {t.tabs.mapView}
            </button>
          </div>

          {activeTab === 'video' && (
            <div className="flex items-center gap-2 text-xs">
              <LayoutGrid size={14} className="text-primary" />
              <span className="text-muted-foreground">
                {t.video.realtimeSync}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="flex-1 relative overflow-hidden">
        {/* VIDEO RENDER: if outputs exist & video tab active */}
        {outputs && activeTab === 'video' && (
          <VideoPlayer
            videoUrl={videoUrl}
            className="w-full h-full"
            onFrameChange={handleFrameChange}
          />
        )}

        {/* MAP RENDER: if outputs exist & map tab active */}
        {outputs && activeTab === 'map' && (
          <MapContainer mapUrl={mapUrl} className="w-full h-full" />
        )}

        {/* EMPTY STATE: if no outputs */}
        {!outputs && (
          <MapContainer className="w-full h-full" />
        )}
      </div>

      {/* Summary */}
      <DetectionSummaryPanel
        summary={displaySummary}
        isLoading={isInferenceRunning}
        isLive={activeTab === 'video' && !!liveFrameSummary}
      />
    </div>
  );
};

export default MainViewArea;
