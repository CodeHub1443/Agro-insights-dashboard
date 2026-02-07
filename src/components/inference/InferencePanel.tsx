import React, { useState, useRef, useCallback } from 'react';
import { useApp } from '@/contexts/AppContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { uploadVideoReal, runInferenceReal } from '@/lib/api';
import { InferenceStatus } from '@/types/agro';
import { cn } from '@/lib/utils';
import { getStaticUrl } from '@/config';
import {
  Upload,
  FileVideo,
  X,
  Play,
  CheckCircle2,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

const ACCEPTED_FORMATS = ['.mp4', '.mov', '.avi', '.mkv'];

const InferencePanel: React.FC = () => {
  const { setDetections, setCurrentInference, setDetectionSummary, setVideoUrl, setMapUrl } = useApp();
  const { t } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [status, setStatus] = useState<InferenceStatus>('idle');
  const [statusText, setStatusText] = useState('');
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Localized status text
  const getLocalizedStatusText = (statusKey: InferenceStatus): string => {
    switch (statusKey) {
      case 'uploading':
        return t.inference.uploading;
      case 'processing':
        return t.inference.processing;
      case 'mapping':
        return t.inference.mapping;
      case 'complete':
        return t.inference.complete;
      default:
        return '';
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setError(null);
      setStatus('idle');
      setProgress(0);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('video/')) {
      setSelectedFile(file);
      setError(null);
      setStatus('idle');
      setProgress(0);
    }
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const clearFile = () => {
    setSelectedFile(null);
    setStatus('idle');
    setProgress(0);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  /**
   * REAL BACKEND INFERENCE
   */
  const runInference = async () => {
    if (!selectedFile) return;

    setError(null);
    setStatus('uploading');
    setStatusText(getLocalizedStatusText('uploading'));
    setProgress(5);

    const jobId = `job-${Date.now()}`;

    try {
      // 1️⃣ Upload video
      const { filename } = await uploadVideoReal(selectedFile);

      setStatus('processing');
      setStatusText(getLocalizedStatusText('processing'));
      setProgress(20);

      // 2️⃣ Run inference
      const result = await runInferenceReal(filename);
      console.log("RUN RESULT:", result);

      setDetectionSummary({
        total: result.total_cabbages ?? 0,
        normal: result.total_cabbages ?? 0, // temporary until class-wise counts exist
        infected: 0,
        dead: 0,
      });

      setVideoUrl(getStaticUrl(result.video) || '');
      setMapUrl(getStaticUrl(result.map));

      // Update global app state
      setDetections([]); // detections are spatially rendered via map/video now
      setCurrentInference({
        id: jobId,
        videoFileName: selectedFile.name,
        status: 'complete',
        progress: 100,
        statusText: t.inference.complete,
        detections: [],
        createdAt: new Date().toISOString(),
        completedAt: new Date().toISOString(),
        outputs: result,
      });

      setStatus('complete');
      setStatusText(getLocalizedStatusText('complete'));
      setProgress(100);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Inference failed');
      setStatus('idle');
      setProgress(0);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const isRunning =
    status === 'uploading' ||
    status === 'processing' ||
    status === 'mapping';

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-border">
        <h3 className="text-sm font-semibold text-foreground">
          {t.inference.title}
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          {t.inference.subtitle}
        </p>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        {/* File Upload Area */}
        {!selectedFile ? (
          <div
            className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 hover:bg-muted/30 transition-all cursor-pointer"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload size={32} className="mx-auto mb-3 text-muted-foreground" />
            <p className="text-sm font-medium text-foreground mb-1">
              {t.inference.dropVideoHere}
            </p>
            <p className="text-xs text-muted-foreground">
              {t.inference.supports} {ACCEPTED_FORMATS.join(', ')}
            </p>
          </div>
        ) : (
          <div className="bg-muted/30 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileVideo size={20} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatFileSize(selectedFile.size)}
                </p>
              </div>
              {!isRunning && status !== 'complete' && (
                <button
                  onClick={clearFile}
                  className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-smooth"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="video/*"
          onChange={handleFileSelect}
          className="hidden"
        />

        {/* Progress */}
        {isRunning && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground flex items-center gap-2">
                <Loader2 size={14} className="animate-spin text-primary" />
                {statusText}
              </span>
              <span className="font-medium text-foreground tabular-nums">
                {progress.toFixed(0)}%
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        {/* Success */}
        {status === 'complete' && (
          <div className="flex items-center gap-2 text-sm text-primary">
            <CheckCircle2 size={16} />
            <span>{t.inference.inferenceComplete}</span>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 text-sm text-destructive">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {/* Action Button */}
        {selectedFile && !isRunning && status !== 'complete' && (
          <Button onClick={runInference} className="w-full" size="lg">
            <Play size={18} className="mr-2" />
            {t.inference.runAiInference}
          </Button>
        )}

        {status === 'complete' && (
          <Button
            onClick={clearFile}
            variant="outline"
            className="w-full"
            size="lg"
          >
            {t.inference.uploadNewVideo}
          </Button>
        )}
      </div>
    </div>
  );
};

export default InferencePanel;
