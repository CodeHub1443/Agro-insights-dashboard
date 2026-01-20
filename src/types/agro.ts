// User role types
export type UserRole = 'farmer' | 'admin' | 'super_admin';

// Detection classification types
export type DetectionType = 'normal' | 'infected' | 'dead';

// Individual cabbage detection
export interface CabbageDetection {
  id: string;
  lat: number;
  lng: number;
  type: DetectionType;
  confidence: number;
  timestamp: string;
}

// Inference job status
export type InferenceStatus =
  | 'idle'
  | 'uploading'
  | 'processing'
  | 'mapping'
  | 'complete'
  | 'error';

// Inference job data
export interface InferenceJob {
  id: string;
  videoFileName: string;
  status: InferenceStatus;
  progress: number;
  statusText: string;
  detections: CabbageDetection[];
  createdAt: string;
  completedAt?: string;
  outputs?: {
    total_cabbages: number;
    video: string;
    map: string;
  };
}

// Detection summary stats
export interface DetectionSummary {
  total: number;
  normal: number;
  infected: number;
  dead: number;
}

// Field/Farm data
export interface Field {
  id: string;
  name: string;
  bounds: {
    north: number;
    south: number;
    east: number;
    west: number;
  };
  centerLat: number;
  centerLng: number;
}

// User data
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
}

// Navigation menu item
export interface NavItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  roles: UserRole[]; // Which roles can see this item
}
