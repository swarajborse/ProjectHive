from fastapi import APIRouter
from backend.controllers.monitor_controller import start_monitoring, stop_monitoring, get_status, get_logs

router = APIRouter(tags=["monitor"])

@router.post("/start-monitoring")
def start():
    return start_monitoring()

@router.post("/stop-monitoring")
def stop():
    return stop_monitoring()

@router.get("/status")
def status():
    return get_status()

@router.get("/logs")
def logs():
    return get_logs()
