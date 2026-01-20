import React from 'react';
import { DetectionSummary } from '@/types/agro';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { Leaf, Bug, Skull, BarChart3, Radio } from 'lucide-react';

interface DetectionSummaryPanelProps {
  summary?: DetectionSummary;   // ← now optional (real backend flow)
  isLoading?: boolean;
  isLive?: boolean;
  className?: string;
}

const DetectionSummaryPanel: React.FC<DetectionSummaryPanelProps> = ({
  summary,
  isLoading,
  isLive,
  className,
}) => {
  const { t } = useLanguage();

  const safeSummary: DetectionSummary = {
    total: summary?.total ?? 0,
    normal: 0, // Force 0 (placeholder)
    infected: 0, // Force 0 (placeholder)
    dead: 0, // Force 0 (placeholder)
  };

  const stats = [
    {
      label: t.detection.totalCabbages,
      value: safeSummary.total,
      icon: BarChart3,
      colorClass: 'text-foreground',
      bgClass: 'bg-muted',
    },
    {
      label: t.detection.normal,
      value: safeSummary.normal,
      icon: Leaf,
      colorClass: 'text-detection-normal',
      bgClass: 'bg-detection-normal/10',
      dotClass: 'marker-normal',
    },
    {
      label: t.detection.insectInfected,
      value: safeSummary.infected,
      icon: Bug,
      colorClass: 'text-detection-infected',
      bgClass: 'bg-detection-infected/10',
      dotClass: 'marker-infected',
    },
    {
      label: t.detection.dead,
      value: safeSummary.dead,
      icon: Skull,
      colorClass: 'text-detection-dead',
      bgClass: 'bg-detection-dead/10',
      dotClass: 'marker-dead',
    },
  ];

  return (
    <div className={cn('bg-card border-t border-border', className)}>
      <div className="px-6 py-4">


        <div className="grid grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={stat.label} className="flex items-center gap-4">
              {/* Icon */}
              <div
                className={cn(
                  'flex items-center justify-center w-12 h-12 rounded-xl',
                  stat.bgClass
                )}
              >
                <stat.icon size={24} className={stat.colorClass} />
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  {stat.dotClass && (
                    <span
                      className={cn('w-2 h-2 rounded-full', stat.dotClass)}
                    />
                  )}
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    {stat.label}
                  </span>
                </div>

                <div
                  className={cn(
                    'text-2xl font-bold tabular-nums',
                    isLoading ? 'text-muted-foreground' : stat.colorClass
                  )}
                >
                  {isLoading ? '—' : stat.value.toLocaleString()}
                </div>
              </div>

              {/* Separator */}
              {index < stats.length - 1 && (
                <div className="hidden lg:block w-px h-12 bg-border" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetectionSummaryPanel;
