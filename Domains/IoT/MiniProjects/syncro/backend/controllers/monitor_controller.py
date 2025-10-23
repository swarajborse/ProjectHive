from backend.services.monitor_service import MonitorService

monitor = MonitorService()

def start_monitoring():
    monitor.start()
    return {"started": True}

def stop_monitoring():
    monitor.stop()
    return {"stopped": True}

def get_status():
    return monitor.status()

def get_logs():
    return {"logs": monitor.get_logs()}
