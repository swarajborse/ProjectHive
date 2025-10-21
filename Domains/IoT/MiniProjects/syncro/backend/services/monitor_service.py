import threading
import time
from backend.services.vision_service import VisionService
from backend.services.sequence_service import SequenceService
from backend.utils.logger import logger
from backend.utils.config import SEQUENCE_STEPS, YOLO_MODEL, CAMERA_SOURCE

class MonitorService:
    def __init__(self):
        self._running = False
        self._thread = None
        self.vision = VisionService(source=CAMERA_SOURCE, model_name=YOLO_MODEL)
        self.sequence = SequenceService(steps=SEQUENCE_STEPS)
        self._logs = []

    def start(self):
        if self._running:
            return
        self._running = True
        self._thread = threading.Thread(target=self._loop, daemon=True)
        self._thread.start()
        logger.info("Monitoring started")

    def stop(self):
        self._running = False
        if self._thread:
            self._thread.join(timeout=2)
        self.vision.release()
        logger.info("Monitoring stopped")

    def _loop(self):
        while self._running:
            frame = self.vision.read()
            if frame is None:
                time.sleep(0.05)
                continue
            detections = self.vision.detect(frame)
            result = self.sequence.update(detections)
            log_entry = {"ts": time.time(), "detections": detections, "result": result}
            self._logs.append(log_entry)
            logger.debug(str(log_entry))
            time.sleep(0.05)

    def status(self):
        return {
            "running": self._running,
            "current_step": self.sequence.current_step,
            "completed": self.sequence.completed,
        }

    def get_logs(self, limit: int = 50):
        return self._logs[-limit:]
