**Contributor:** k4niz

# SYNCRO - Real-Time Assembly Sequence Monitoring (IoT + AI)

Backend service built with FastAPI that captures camera frames, detects parts using YOLOv8, and validates assembly sequence order in real-time.

## Features
-  Camera capture (OpenCV)
-  YOLOv8 object detection with configurable accuracy models
-  Assembly sequence validation and logging
-  REST API: start/stop/status/logs
-  postman collection included

## YOLOv8 Models (Accuracy vs Speed)
- `yolov8n.pt` - Nano (fastest, lowest accuracy)
- `yolov8s.pt` - Small
- `yolov8m.pt` - Medium (**default**, balanced)
- `yolov8l.pt` - Large (high accuracy)
- `yolov8x.pt` - Extra Large (highest accuracy, slowest)

## API Endpoints
- `POST /api/start-monitoring` - Start monitoring loop
- `POST /api/stop-monitoring` - Stop monitoring
- `GET /api/status` - Current status and sequence step
- `GET /api/logs` - Last 50 detection logs

## Setup

1. **Navigate to syncro folder:**
   ```powershell
   cd Domains\IoT\MiniProjects\syncro
   ```

2. **Install dependencies:**
   ```powershell
   cd backend
   pip install -r requirements.txt
   cd ..
   ```

3. **(Optional) Configure model:**
   Copy `.env.example` to `.env` and edit:
   ```
   YOLO_MODEL=yolov8l.pt  # For high accuracy
   ```

4. **Run the server:**
   ```powershell
   uvicorn backend.main:app --reload
   ```

5. **Test with Swagger UI:**
   Open `http://127.0.0.1:8000/docs`

6. **Or import Postman collection:**
   `backend/SYNCRO.postman_collection.json`

## How It Works

1. **Camera** captures frames continuously
2. **YOLOv8** detects objects in each frame
3. **Label Mapper** converts COCO classes to assembly steps
4. **Sequence Validator** checks if steps are in correct order
5. **Logger** records all detections with timestamps
6. **API** exposes status and logs in real-time

## Customization

### Change YOLO Model
Edit `backend/utils/config.py` or set env var:
```powershell
$env:YOLO_MODEL="yolov8x.pt"  # Highest accuracy
```

### Customize Assembly Sequence
Edit `backend/utils/config.py`:
```python
SEQUENCE_STEPS = [
    "pick_part_a",
    "pick_part_b",
    "assemble"
]
```

### Map Custom Objects
Edit `vision_service.py` → `_create_label_map()`:
```python
return {
    "screw": "pick_screw",
    "wrench": "pick_tool",
    "bolt": "tighten_screw"
}
```

## Notes
- First run downloads the YOLO model (~50MB for yolov8m)
- If no camera is available, detection returns empty results
- For custom part detection, train a custom YOLOv8 model on your assembly dataset
