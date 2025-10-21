# Configuration for SYNCRO backend
import os

# YOLOv8 Model Selection (for high accuracy, use yolov8l or yolov8x)
YOLO_MODEL = os.getenv("YOLO_MODEL", "yolov8m.pt")  # medium (balanced)
# Options: yolov8n.pt, yolov8s.pt, yolov8m.pt, yolov8l.pt, yolov8x.pt

# Camera source (0 = default webcam, or path to video file)
CAMERA_SOURCE = int(os.getenv("CAMERA_SOURCE", "0"))

# Assembly sequence steps (customize for your use case)
SEQUENCE_STEPS = [
    "pick_screw",
    "pick_tool",
    "tighten_screw"
]

# Detection confidence threshold
CONFIDENCE_THRESHOLD = float(os.getenv("CONFIDENCE_THRESHOLD", "0.5"))
