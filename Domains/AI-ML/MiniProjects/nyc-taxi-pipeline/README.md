
# NYC Taxi Data Pipeline (Beginner)

This project is a beginner-friendly data engineering pipeline that demonstrates:
- Environment management with `uv`
- Extraction of an open dataset (NYC Yellow Taxi Parquet)
- Transformation with `pandas`
- Storage and fast analytics with `duckdb`
- Orchestration with `Prefect`
- Simple testing with `pytest`

## Structure
```
nyc-taxi-pipeline/
├── data/
│   ├── raw/
│   └── processed/
├── src/
│   ├── __init__.py
│   ├── extract.py
│   ├── transform.py
│   ├── load.py
│   └── pipeline.py
├── tests/
│   └── test_pipeline.py
├── pyproject.toml
├── uv.lock   # created by uv when you run uv sync / uv add
├── README.md
└── .github/workflows/ci.yml
```

## Quickstart (using `uv`)
```bash
# Initialize project (if you haven't already)
uv init nyc-taxi-pipeline
cd nyc-taxi-pipeline

# Add dependencies
uv add pandas requests duckdb prefect sqlalchemy pytest --dev
# or add individual packages as needed; uv will create pyproject.toml and uv.lock

# Run pipeline locally (Prefect's local flow runner)
uv run python -m src.pipeline

# Run tests
uv run pytest
```

## Notes
- The `extract` step downloads a Parquet file from a public CDN (NYC data). If you prefer, you can download manually into `data/raw/`.
- `duckdb` is used for storage and quick analytical queries; the pipeline writes a DuckDB file at `data/nyc_taxi.duckdb`.
- Prefect orchestrates the steps: extract -> transform -> load. For production, consider Prefect Cloud / Prefect Orion deployment.
