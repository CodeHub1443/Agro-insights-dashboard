import React, { createContext, useContext, useState, useCallback } from 'react';
import { User, UserRole, CabbageDetection, InferenceJob, DetectionSummary } from '@/types/agro';
import { mockCurrentUser, calculateSummary } from '@/lib/mockData';

interface AppContextType {
  // User state
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  hasRole: (roles: UserRole[]) => boolean;

  // Detections state
  detections: CabbageDetection[];
  setDetections: (detections: CabbageDetection[]) => void;
  detectionSummary: DetectionSummary;
  setDetectionSummary: (summary: DetectionSummary) => void;

  // Result URLs
  videoUrl: string;
  setVideoUrl: (url: string) => void;
  mapUrl: string | undefined;
  setMapUrl: (url: string | undefined) => void;

  // Inference state
  currentInference: InferenceJob | null;
  setCurrentInference: (job: InferenceJob | null) => void;
  isInferenceRunning: boolean;

  // UI state
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  activeNavItem: string;
  setActiveNavItem: (item: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // User state - using mock user as placeholder
  const [currentUser, setCurrentUser] = useState<User | null>(mockCurrentUser);

  // Detection data
  const [detections, setDetections] = useState<CabbageDetection[]>([]);
  const [detectionSummary, setDetectionSummary] = useState<DetectionSummary>({
    total: 0,
    normal: 0,
    infected: 0,
    dead: 0
  });

  // Result URLs
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [mapUrl, setMapUrl] = useState<string | undefined>(undefined);

  // Inference job state
  const [currentInference, setCurrentInference] = useState<InferenceJob | null>(null);

  // UI state
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState('dashboard');

  // Role checking helper
  const hasRole = useCallback((roles: UserRole[]): boolean => {
    if (!currentUser) return false;
    return roles.includes(currentUser.role);
  }, [currentUser]);

  // Check if inference is running
  const isInferenceRunning = currentInference?.status === 'uploading' ||
    currentInference?.status === 'processing' ||
    currentInference?.status === 'mapping';

  const value: AppContextType = {
    currentUser,
    setCurrentUser,
    hasRole,
    detections,
    setDetections,
    detectionSummary,
    setDetectionSummary,
    videoUrl,
    setVideoUrl,
    mapUrl,
    setMapUrl,
    currentInference,
    setCurrentInference,
    isInferenceRunning,
    sidebarCollapsed,
    setSidebarCollapsed,
    activeNavItem,
    setActiveNavItem,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
