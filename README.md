# Agro Insights Dashboard

A professional React-based precision agriculture dashboard designed to visualize cabbage detection and localization data from drone imagery.

## 🚀 Features
* **Real-time Detection View:** Visualize crop health and detection boxes.
* **Geospatial Mapping:** Integration with Mapbox/Leaflet to show crop coordinates.
* **Inference Panels:** Detailed analysis of YOLOv8 + SAHI tiled inference results.
* **Responsive Design:** Built with Tailwind CSS and shadcn/ui for all screen sizes.

## 🛠️ Tech Stack
* **Framework:** React 18 (Vite)
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **UI Components:** shadcn/ui
* **Icons:** Lucide React

## 💻 Getting Started

### Prerequisites
* Node.js (v18 or higher)
* npm or bun

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/CodeHub1443/Agro-insights-dashboard.git
   cd Agro-insights-dashboard
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the backend API (separate repo, see [drone-cabbage-detection-yolov8-sahi](https://github.com/CodeHub1443/drone-cabbage-detection-yolov8-sahi)); it must be running on `http://127.0.0.1:8000`.
4. Start the dashboard:
   ```bash
   npm run dev
   ```
   Open the URL printed by Vite (port 8080).

### Configuration
The backend URL defaults to `http://127.0.0.1:8000`. To use another backend, set it before starting or building:
```bash
VITE_API_BASE_URL=https://your-backend.example.com npm run dev
```

### Usage
Upload a drone `.mp4` together with its matching `.srt` telemetry file, then run inference to see detections and the geospatial map.
