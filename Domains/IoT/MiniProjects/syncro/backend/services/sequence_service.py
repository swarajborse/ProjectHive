from typing import List, Dict

class SequenceService:
    def __init__(self, steps: List[str]):
        self.steps = steps
        self.index = 0
        self.completed = False

    @property
    def current_step(self):
        if self.completed:
            return None
        return self.steps[self.index]

    def update(self, detections: List[Dict]):
        if self.completed:
            return {"status": "done"}
        labels = {d.get("label") for d in detections}
        if self.current_step in labels:
            self.index += 1
            if self.index >= len(self.steps):
                self.completed = True
                return {"status": "completed"}
            return {"status": "next", "current_step": self.current_step}
        return {"status": "waiting", "current_step": self.current_step}
