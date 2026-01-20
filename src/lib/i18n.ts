export type Language = 'en' | 'ko';

export const translations = {
  en: {
    // Navigation
    nav: {
      dashboard: 'Dashboard',
      uploadInference: 'Upload & Inference',
      detectionHistory: 'Detection History',
      mapView: 'Map View',
      fieldManagement: 'Field Management',
      userManagement: 'User Management',
      settings: 'Settings',
    },

    // Roles
    roles: {
      farmer: 'Farmer',
      admin: 'Admin',
      super_admin: 'Super Admin',
    },

    // Status bar
    status: {
      connected: 'Connected',
      sunny: 'Sunny',
    },

    // Detection summary
    detection: {
      totalCabbages: 'Total Cabbages',
      normal: 'Normal',
      insectInfected: 'Insect Infected',
      dead: 'Dead',
      normalCabbage: 'Normal Cabbage',
      deadCabbage: 'Dead Cabbage',
    },

    // Dashboard
    dashboard: {
      detectionOverview: 'Detection Overview',
      cropHealthScore: 'Crop Health Score',
      infectionRate: 'Infection Rate',
      mortalityRate: 'Mortality Rate',
      mapLegend: 'Map Legend',
    },

    // Inference panel
    inference: {
      title: 'Upload & Inference',
      subtitle: 'Upload 4K drone video for AI analysis',
      dropVideoHere: 'Drop video file here or click to browse',
      supports: 'Supports',
      runAiInference: 'Run AI Inference',
      uploadNewVideo: 'Upload New Video',
      inferenceComplete: 'Inference complete — detections mapped',
      uploading: 'Uploading video...',
      processing: 'Running AI inference...',
      mapping: 'Mapping detections...',
      complete: 'Inference complete',
    },

    // Map
    map: {
      awaitingResults: 'Awaiting Inference Results',
      uploadDescription: 'Upload a drone video and run AI inference to see cabbage detections plotted on the map',
      zoom: 'Zoom',
      openInNewTab: 'Open in New Tab',
      fullscreen: 'Fullscreen',
    },

    // Tabs
    tabs: {
      videoResult: 'Video Result',
      mapView: 'Map View',
    },

    // Video player
    video: {
      browserNotSupported: 'Your browser does not support the video tag.',
      inferenceVideoReady: 'Inference Video Ready',
      videoDescription: 'Video with YOLO bounding boxes showing detected cabbages. Play to see real-time detection counts.',
      realtimeSync: 'Real-time sync with video',
      liveDetection: 'Live Detection',
    },
  },

  ko: {
    // Navigation
    nav: {
      dashboard: '대시보드',
      uploadInference: '업로드 & 추론',
      detectionHistory: '탐지 기록',
      mapView: '지도 보기',
      fieldManagement: '농지 관리',
      userManagement: '사용자 관리',
      settings: '설정',
    },

    // Roles
    roles: {
      farmer: '농부',
      admin: '관리자',
      super_admin: '최고 관리자',
    },

    // Status bar
    status: {
      connected: '연결됨',
      sunny: '맑음',
    },

    // Detection summary
    detection: {
      totalCabbages: '총 배추 수',
      normal: '정상',
      insectInfected: '해충 감염',
      dead: '고사',
      normalCabbage: '정상 배추',
      deadCabbage: '고사 배추',
    },

    // Dashboard
    dashboard: {
      detectionOverview: '탐지 개요',
      cropHealthScore: '작물 건강 점수',
      infectionRate: '감염률',
      mortalityRate: '고사율',
      mapLegend: '지도 범례',
    },

    // Inference panel
    inference: {
      title: '업로드 & 추론',
      subtitle: 'AI 분석을 위해 4K 드론 영상을 업로드하세요',
      dropVideoHere: '여기에 영상 파일을 놓거나 클릭하여 찾아보기',
      supports: '지원 형식',
      runAiInference: 'AI 추론 실행',
      uploadNewVideo: '새 영상 업로드',
      inferenceComplete: '추론 완료 — 탐지 결과가 지도에 표시됨',
      uploading: '영상 업로드 중...',
      processing: 'AI 추론 실행 중...',
      mapping: '탐지 결과 매핑 중...',
      complete: '추론 완료',
    },

    // Map
    map: {
      awaitingResults: '추론 결과 대기 중',
      uploadDescription: '드론 영상을 업로드하고 AI 추론을 실행하여 지도에 배추 탐지 결과를 확인하세요',
      zoom: '확대',
      openInNewTab: '새 탭에서 열기',
      fullscreen: '전체화면',
    },

    // Tabs
    tabs: {
      videoResult: '영상 결과',
      mapView: '지도 보기',
    },

    // Video player
    video: {
      browserNotSupported: '브라우저가 비디오 태그를 지원하지 않습니다.',
      inferenceVideoReady: '추론 영상 준비 완료',
      videoDescription: 'YOLO 바운딩 박스로 탐지된 배추를 보여주는 영상입니다. 재생하여 실시간 탐지 수를 확인하세요.',
      realtimeSync: '영상과 실시간 동기화',
      liveDetection: '실시간 탐지',
    },
  },
} as const;

// Type for nested translation structure
type TranslationStructure = {
  nav: {
    dashboard: string;
    uploadInference: string;
    detectionHistory: string;
    mapView: string;
    fieldManagement: string;
    userManagement: string;
    settings: string;
  };
  roles: {
    farmer: string;
    admin: string;
    super_admin: string;
  };
  status: {
    connected: string;
    sunny: string;
  };
  detection: {
    totalCabbages: string;
    normal: string;
    insectInfected: string;
    dead: string;
    normalCabbage: string;
    deadCabbage: string;
  };
  dashboard: {
    detectionOverview: string;
    cropHealthScore: string;
    infectionRate: string;
    mortalityRate: string;
    mapLegend: string;
  };
  inference: {
    title: string;
    subtitle: string;
    dropVideoHere: string;
    supports: string;
    runAiInference: string;
    uploadNewVideo: string;
    inferenceComplete: string;
    uploading: string;
    processing: string;
    mapping: string;
    complete: string;
  };
  map: {
    awaitingResults: string;
    uploadDescription: string;
    zoom: string;
    openInNewTab: string;
    fullscreen: string;
  };
  tabs: {
    videoResult: string;
    mapView: string;
  };
  video: {
    browserNotSupported: string;
    inferenceVideoReady: string;
    videoDescription: string;
    realtimeSync: string;
    liveDetection: string;
  };
};

export type TranslationKeys = TranslationStructure;
