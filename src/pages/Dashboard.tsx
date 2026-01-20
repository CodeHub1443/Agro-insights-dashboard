import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { useLanguage } from '@/contexts/LanguageContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import MainViewArea from '@/components/view/MainViewArea';
import InferencePanel from '@/components/inference/InferencePanel';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { mockField } from '@/lib/mockData';
import { Clock, MapPin, Wifi, Cloud } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { detections, detectionSummary, currentInference, isInferenceRunning } = useApp();
  const { t, language } = useLanguage();

  const showDetections = Boolean(currentInference?.outputs);
  const currentTime = new Date().toLocaleTimeString(language === 'ko' ? 'ko-KR' : 'en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
  const currentDate = new Date().toLocaleDateString(language === 'ko' ? 'ko-KR' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <DashboardLayout>
      {/* Top Status Bar */}
      <header className="flex items-center justify-between px-6 py-3 bg-card border-b border-border">
        <div className="flex items-center gap-6">
          {/* Field Info */}
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-primary" />
            <span className="text-sm font-medium text-foreground">{mockField.name}</span>
          </div>

          {/* Time */}
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock size={14} />
            <span className="text-xs">{currentTime}</span>
            <span className="text-xs opacity-50">|</span>
            <span className="text-xs">{currentDate}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Language Switcher */}
          <LanguageSwitcher />

          {/* Status Indicators */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Wifi size={14} className="text-primary" />
            <span>{t.status.connected}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Cloud size={14} />
            <span>24°C {t.status.sunny}</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Main View Area - Video/Map with tabs */}
        <MainViewArea
          detections={detections}
          detectionSummary={detectionSummary}
          showDetections={showDetections}
          isInferenceRunning={isInferenceRunning}
          inferenceVideoUrl=""
          className="flex-1"
        />

        {/* Right Sidebar - Controls */}
        <aside className="w-80 bg-background border-l border-border p-4 overflow-y-auto">
          <InferencePanel />

          {/* Quick Stats Card */}
          {showDetections && (
            <div className="mt-4 bg-card rounded-xl border border-border p-5">
              <h3 className="text-sm font-semibold text-foreground mb-4">
                {t.dashboard.detectionOverview}
              </h3>

              <div className="space-y-3">
                {/* Health Score */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-muted-foreground">{t.dashboard.cropHealthScore}</span>
                    <span className="font-medium text-foreground">
                      {((detectionSummary.normal / detectionSummary.total) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-detection-normal rounded-full transition-all"
                      style={{ width: `${(detectionSummary.normal / detectionSummary.total) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Infection Rate */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-muted-foreground">{t.dashboard.infectionRate}</span>
                    <span className="font-medium text-detection-infected">
                      {((detectionSummary.infected / detectionSummary.total) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-detection-infected rounded-full transition-all"
                      style={{ width: `${(detectionSummary.infected / detectionSummary.total) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Mortality Rate */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-muted-foreground">{t.dashboard.mortalityRate}</span>
                    <span className="font-medium text-detection-dead">
                      {((detectionSummary.dead / detectionSummary.total) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-detection-dead rounded-full transition-all"
                      style={{ width: `${(detectionSummary.dead / detectionSummary.total) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Legend */}
          <div className="mt-4 bg-card rounded-xl border border-border p-5">
            <h3 className="text-sm font-semibold text-foreground mb-3">
              {t.dashboard.mapLegend}
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full marker-normal" />
                <span className="text-sm text-muted-foreground">{t.detection.normalCabbage}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full marker-infected" />
                <span className="text-sm text-muted-foreground">{t.detection.insectInfected}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full marker-dead" />
                <span className="text-sm text-muted-foreground">{t.detection.deadCabbage}</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
