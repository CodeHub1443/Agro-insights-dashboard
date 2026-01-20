import React, { useState, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { Maximize2, ExternalLink } from 'lucide-react';

interface MapContainerProps {
  mapUrl?: string;      // REAL backend HTML map URL
  className?: string;
}

const MapContainer: React.FC<MapContainerProps> = ({
  mapUrl,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    const el = containerRef.current;
    if (!el) return;

    if (!document.fullscreenElement) {
      el.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  if (!mapUrl) {
    return <div className="h-full w-full bg-muted rounded-xl" />;
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative bg-background rounded-xl border border-border overflow-hidden',
        className
      )}
    >
      {/* Header / Controls */}
      <div className="absolute top-3 right-3 z-20 flex gap-2">
        <a
          href={mapUrl}
          target="_blank"
          rel="noreferrer"
          className="p-2 bg-card/90 backdrop-blur-sm rounded-lg border border-border hover:bg-accent transition-smooth"
          title={t.map.openInNewTab}
        >
          <ExternalLink size={18} />
        </a>
        <button
          onClick={toggleFullscreen}
          className="p-2 bg-card/90 backdrop-blur-sm rounded-lg border border-border hover:bg-accent transition-smooth"
          title={t.map.fullscreen}
        >
          <Maximize2 size={18} />
        </button>
      </div>

      {/* Map Content */}
      <iframe
        src={mapUrl}
        className="w-full rounded-xl"
        style={{
          border: "none",
          height: "600px",
        }}
        sandbox="allow-scripts allow-same-origin"
      />

    </div>
  );
};

export default MapContainer;
