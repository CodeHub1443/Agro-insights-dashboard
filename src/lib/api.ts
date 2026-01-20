import { InferenceJob, CabbageDetection } from '@/types/agro';
import { generateMockDetections } from './mockData';

// ===================== REAL BACKEND INTEGRATION =====================
// Gradually replacing mock pipeline with FastAPI

const API = "http://127.0.0.1:8000";

/**
 * REAL: Upload video to FastAPI backend
 */
export const uploadVideoReal = async (
  file: File
): Promise<{ filename: string }> => {
  const fd = new FormData();
  fd.append("file", file);

  const res = await fetch(`${API}/upload`, {
    method: "POST",
    body: fd,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Upload failed: ${text}`);
  }

  return res.json();
};

/**
 * REAL: Run inference via FastAPI
 */
export const runInferenceReal = async (
  filename: string
): Promise<{
  total_cabbages: number;
  video: string;
  map: string;
}> => {
  const res = await fetch(
    `${API}/run?filename=${encodeURIComponent(filename)}`,
    { method: "POST" }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Inference failed: ${text}`);
  }

  return res.json();
};


const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Upload video file to server
 * @placeholder Will integrate with FastAPI file upload endpoint
 */
export const uploadVideo = async (
  file: File,
  onProgress: (progress: number) => void
): Promise<string> => {
  // Simulate upload progress
  for (let i = 0; i <= 100; i += 10) {
    await delay(200);
    onProgress(i);
  }
  
  // Return mock video ID - will be replaced with actual API response
  return `video-${Date.now()}`;
};

/**
 * Start AI inference on uploaded video
 * @placeholder Will integrate with AI inference service
 */
export const startInference = async (videoId: string): Promise<string> => {
  // Placeholder: Returns job ID
  await delay(500);
  return `job-${Date.now()}`;
};

/**
 * Poll inference job status
 * @placeholder Will integrate with backend status endpoint
 */
export const getInferenceStatus = async (jobId: string): Promise<InferenceJob> => {
  // Placeholder: Returns mock job status
  await delay(300);
  
  return {
    id: jobId,
    videoFileName: 'uploaded_video.mp4',
    status: 'processing',
    progress: Math.random() * 100,
    statusText: 'Processing frames...',
    detections: [],
    createdAt: new Date().toISOString(),
  };
};

/**
 * Get detections for a completed inference job
 * @placeholder Will integrate with database
 */
export const getDetections = async (jobId: string): Promise<CabbageDetection[]> => {
  await delay(500);
  return generateMockDetections(1404);
};

/**
 * Run full inference pipeline with progress callbacks
 * Handles: upload → inference → mapping
 */
export const runInferencePipeline = async (
  file: File,
  callbacks: {
    onStatusChange: (status: InferenceJob['status'], text: string) => void;
    onProgress: (progress: number) => void;
    onComplete: (detections: CabbageDetection[]) => void;
    onError: (error: string) => void;
  }
): Promise<void> => {
  try {
    // Phase 1: Uploading
    callbacks.onStatusChange('uploading', 'Uploading video...');
    for (let i = 0; i <= 30; i += 5) {
      await delay(150);
      callbacks.onProgress(i);
    }

    // Phase 2: Running AI inference
    callbacks.onStatusChange('processing', 'Running AI inference...');
    for (let i = 30; i <= 75; i += 3) {
      await delay(200);
      callbacks.onProgress(i);
    }

    // Phase 3: Mapping detections
    callbacks.onStatusChange('mapping', 'Mapping detections...');
    for (let i = 75; i <= 100; i += 5) {
      await delay(150);
      callbacks.onProgress(i);
    }

    // Complete
    const detections = generateMockDetections(1404);
    callbacks.onStatusChange('complete', 'Inference complete');
    callbacks.onProgress(100);
    callbacks.onComplete(detections);
    
  } catch (error) {
    callbacks.onError(error instanceof Error ? error.message : 'Unknown error occurred');
    callbacks.onStatusChange('error', 'Inference failed');
  }
};

/**
 * Fetch user by ID
 * @placeholder Will integrate with auth/user service
 */
export const fetchUser = async (userId: string) => {
  await delay(200);
  // Placeholder
  return null;
};

/**
 * Fetch all fields for current user
 * @placeholder Will integrate with database
 */
export const fetchFields = async () => {
  await delay(300);
  // Placeholder
  return [];
};
