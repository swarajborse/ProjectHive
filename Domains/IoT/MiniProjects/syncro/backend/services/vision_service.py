from typing import List, Dict, Any, Optional
import cv2
from ultralytics import YOLO

class VisionService:
    def __init__(self, source: int = 0, model_name: str = "yolov8m.pt"):
        """
        Initialize Vision Service with camera and YOLOv8 model.
        
        Args:
            source: Camera device index (0 for default webcam)
            model_name: YOLOv8 model to use. Options:
                - yolov8n.pt (nano, fastest, lowest accuracy)
                - yolov8s.pt (small)
                - yolov8m.pt (medium, balanced) - DEFAULT
                - yolov8l.pt (large, high accuracy)
                - yolov8x.pt (extra large, highest accuracy, slowest)
        """
        self.cap = cv2.VideoCapture(source)
        if not self.cap.isOpened():
            self.cap = None
        
        # Load YOLOv8 model (downloads automatically on first run)
        try:
            self.model = YOLO(model_name)
            self.label_map = self._create_label_map()
        except Exception as e:
            print(f"Warning: Failed to load YOLO model: {e}")
            self.model = None
            self.label_map = {}

    def _create_label_map(self) -> Dict[str, str]:
        """
        Map COCO class names to assembly sequence steps.
        Customize this based on your detected objects.
        """
        return {
            # Tools
            "scissors": "pick_tool",
            "knife": "pick_tool",
            # Hardware (you may need custom trained model for specific parts)
            "bottle": "pick_screw",  # placeholder
            "cup": "pick_screw",     # placeholder
        }

    def read(self) -> Optional["cv2.Mat"]:
        if self.cap is None:
            return None
        ok, frame = self.cap.read()
        return frame if ok else None

    def detect(self, frame) -> List[Dict[str, Any]]:
        """
        Run YOLOv8 detection on frame and return mapped detections.
        
        Returns:
            List of detections with 'label' and 'conf' keys
        """
        if frame is None or self.model is None:
            return []
        
        try:
            # Run inference (verbose=False to reduce console output)
            results = self.model(frame, verbose=False)
            
            detections = []
            for result in results:
                for box in result.boxes:
                    class_id = int(box.cls[0])
                    confidence = float(box.conf[0])
                    class_name = result.names[class_id]
                    
                    # Map COCO class to assembly step if available
                    mapped_label = self.label_map.get(class_name, class_name)
                    
                    detections.append({
                        "label": mapped_label,
                        "conf": confidence,
                        "original_class": class_name
                    })
            
            return detections
        except Exception as e:
            print(f"Detection error: {e}")
            return []

    def release(self):
        if self.cap is not None:
            self.cap.release()
