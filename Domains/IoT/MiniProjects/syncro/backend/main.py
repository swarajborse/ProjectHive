from fastapi import FastAPI
from backend.routes.monitor_routes import router as monitor_router

app = FastAPI(title="SYNCRO - Assembly Sequence Monitoring")

app.include_router(monitor_router, prefix="/api")

@app.get("/")
def root():
    return {"service": "SYNCRO", "status": "ok"}
