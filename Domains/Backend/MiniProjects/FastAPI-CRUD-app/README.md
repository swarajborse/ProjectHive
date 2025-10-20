# FastAPI CRUD App

**Contributor:** AksharGoyal

## Overview
Simple, starter FastAPI application demonstrating CRUD operations backed by SQLAlchemy ORM. Includes a minimal API for creating, listing, updating and deleting "items".

## Tech stack
- Python 3.12+
- FastAPI
- SQLAlchemy
- Uvicorn (ASGI server)
- "uv" as the local environment manager (see pyproject.toml)

## Prerequisites
- Linux (dev container in this repo is Ubuntu 24.04.2 LTS)
- Python 3.12+
- The `uv` tool is used in these instructions as the environment manager. Commands that use `uv` are shown with the `uv` prefix.

## Quickstart 
1. Create and activate the virtual environment
```sh
curl -LsSf https://astral.sh/uv/install.sh | sh # Install uv
uv venv --python=3.12 # creates .venv by default
source .venv/bin/activate
```

1. Install dependencies
```sh
uv pip install -r requirements.txt
```

1. Run the server
```sh
uv run uvicorn app.main:app --reload
```

1. Open the API in your browser
```sh
$BROWSER http://127.0.0.1:8000/docs
```
The root path returns 404 by default; use the documented endpoints (e.g. /items/).

## API endpoints
- GET /items/        — List items
- POST /items/       — Create item
- GET /items/{id}    — Retrieve single item
- PUT /items/{id}    — Update item
- DELETE /items/{id} — Delete item

## Examples 
List items:
```sh
curl -X GET http://127.0.0.1:8000/items/
# returns: []
```

Create an item:
```sh
curl -X POST http://127.0.0.1:8000/items/ \
  -H "Content-Type: application/json" \
  -d '{"title":"A Nice Hoodie","description":"A nice hoodie to wear with style.","price":39.99}'
```

Update item with id 1:
```sh
curl -X PUT http://127.0.0.1:8000/items/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"A Cool Hoodie","description":"A nice hoodie to wear with style.","price":49.99}'
```

Delete item with id 1:
```sh
curl -X DELETE http://127.0.0.1:8000/items/1
```
