from pydantic import BaseModel
from typing import List, Optional, Any, Dict

class Detection(BaseModel):
    label: str
    conf: float

class LogEntry(BaseModel):
    ts: float
    detections: List[Dict[str, Any]]
    result: Dict[str, Any]

class Status(BaseModel):
    running: bool
    current_step: Optional[str]
    completed: bool
