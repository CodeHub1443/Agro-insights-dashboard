import { 
  CabbageDetection, 
  DetectionSummary, 
  InferenceJob, 
  User, 
  NavItem,
  Field 
} from '@/types/agro';

// Current user placeholder - will be replaced with auth
export const mockCurrentUser: User = {
  id: 'user-1',
  name: 'John Farmer',
  email: 'john@agrofarm.com',
  role: 'farmer', // Change to 'admin' or 'super_admin' to test role-based UI
};

// Mock field data
export const mockField: Field = {
  id: 'field-1',
  name: 'North Cabbage Field',
  bounds: {
    north: 35.7050,
    south: 35.6950,
    east: 139.7550,
    west: 139.7450,
  },
  centerLat: 35.7000,
  centerLng: 139.7500,
};

// Generate mock detection data
export const generateMockDetections = (count: number = 150): CabbageDetection[] => {
  const detections: CabbageDetection[] = [];
  const types: ('normal' | 'infected' | 'dead')[] = ['normal', 'normal', 'normal', 'normal', 'normal', 'normal', 'infected', 'dead'];
  
  for (let i = 0; i < count; i++) {
    const type = types[Math.floor(Math.random() * types.length)];
    detections.push({
      id: `detection-${i}`,
      lat: mockField.centerLat + (Math.random() - 0.5) * 0.008,
      lng: mockField.centerLng + (Math.random() - 0.5) * 0.01,
      type,
      confidence: 0.75 + Math.random() * 0.24,
      timestamp: new Date().toISOString(),
    });
  }
  
  return detections;
};

// Calculate detection summary from detections
export const calculateSummary = (detections: CabbageDetection[]): DetectionSummary => {
  return {
    total: detections.length,
    normal: detections.filter(d => d.type === 'normal').length,
    infected: detections.filter(d => d.type === 'infected').length,
    dead: detections.filter(d => d.type === 'dead').length,
  };
};

// Mock inference job for completed state
export const mockCompletedInference: InferenceJob = {
  id: 'job-1',
  videoFileName: 'drone_scan_20250111.mp4',
  status: 'complete',
  progress: 100,
  statusText: 'Inference complete',
  detections: generateMockDetections(1404),
  createdAt: new Date(Date.now() - 3600000).toISOString(),
  completedAt: new Date().toISOString(),
};

// Navigation items with role-based visibility (translation keys)
export const navigationItems: NavItem[] = [
  {
    id: 'dashboard',
    label: 'dashboard', // Translation key
    icon: 'LayoutDashboard',
    path: '/',
    roles: ['farmer', 'admin', 'super_admin'],
  },
  {
    id: 'upload',
    label: 'uploadInference', // Translation key
    icon: 'Upload',
    path: '/upload',
    roles: ['farmer', 'admin', 'super_admin'],
  },
  {
    id: 'history',
    label: 'detectionHistory', // Translation key
    icon: 'History',
    path: '/history',
    roles: ['farmer', 'admin', 'super_admin'],
  },
  {
    id: 'map',
    label: 'mapView', // Translation key
    icon: 'Map',
    path: '/map',
    roles: ['farmer', 'admin', 'super_admin'],
  },
  {
    id: 'fields',
    label: 'fieldManagement', // Translation key
    icon: 'Landmark',
    path: '/fields',
    roles: ['admin', 'super_admin'],
  },
  {
    id: 'users',
    label: 'userManagement', // Translation key
    icon: 'Users',
    path: '/users',
    roles: ['super_admin'],
  },
  {
    id: 'settings',
    label: 'settings', // Translation key
    icon: 'Settings',
    path: '/settings',
    roles: ['farmer', 'admin', 'super_admin'],
  },
];
