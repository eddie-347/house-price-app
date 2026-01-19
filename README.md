(This project contains a React frontend and a FastAPI backend for house price estimation.)

**Run with Docker**
- Build and start both services with one command:

# House Price App

This repository contains a React frontend and a FastAPI backend that together provide an AI-powered house price estimator. The frontend is a premium-styled React app (Vite + Tailwind) and the backend is a FastAPI service that loads an XGBoost model to produce predictions.

## What we used
- Frontend: React, Vite, Tailwind CSS, Framer Motion, Lucide icons
- Backend: FastAPI, Uvicorn, scikit-learn, xgboost, pandas, numpy, joblib
- Dev tooling: npm, pip, Python 3.11
- Optional: Docker + Docker Compose for one-command run

## What we did in this repo
- Implemented a premium UI for Home / Predict / Insights pages in `frontend/src`.
- Wire-up of frontend -> backend API: `frontend/src/services/api.js` posts `{ features: { ... } }` to `/predict`.
- Backend exposes `/predict` (POST) and `/health` (GET) in `backend/app.py` and loads model artifacts from `backend/artifacts/`.
- Streamlit-based prototype was removed in favor of the React UI (the file was archived/removed).
- Dockerfiles and a `docker-compose.yml` are provided to build and run both services together.

## Run with Docker (recommended for unified runs)
1. Make sure Docker Desktop (or Docker Engine) is installed and running on your machine.
2. From the repository root run:

```bash
docker compose up --build
```

This will:
- build the backend image (Python + deps) and the frontend (Node build served by nginx)
- start the backend on port `8001` and the frontend on port `5175` (nginx serving the built static files)

Default exposed endpoints after compose up:
- Frontend web UI: http://localhost:5175
- Backend API: http://localhost:8001

To stop and remove containers and images created by compose:

```bash
docker compose down --rmi all --remove-orphans
```

Notes about Docker configuration
- The frontend Dockerfile accepts a `VITE_API_BASE` build-arg and the compose file sets it to `http://backend:8001` so the built static site will call the backend container when both are running under Compose networking.

## Run locally without Docker
If you prefer running services directly on your machine for development:

Frontend (dev server with hot reload):
```bash
cd frontend
npm install
npm run dev
```

Backend (dev server):
```bash
cd backend
python -m pip install -r requirements.txt
python -m uvicorn app:app --reload --port 8001
```

Open the frontend at `http://localhost:5175` (Vite will print the exact URL it uses).

## Quick API test (curl)
Example payload shape — the frontend posts `{ "features": { ... } }`.

```bash
curl -X POST http://localhost:8001/predict \
	-H "Content-Type: application/json" \
	-d '{ "features": { "Area": 1200, "No. of Bedrooms": 2, "Total_Amenities": 4, "Location_encoded": 1 } }'
```

Response example:
```json
{ "predicted_price": 3209535.5 }
```

## Troubleshooting
- If `docker compose up` fails with connection errors, ensure Docker Desktop/Engine is running.
- If the backend returns HTTP 500, check `backend/logs/app.log` for detailed errors (issues with feature mapping or model unpickling commonly appear there).
- If frontend shows wrong API URL, confirm `VITE_API_BASE` is correctly set during build/run. When running locally in dev, set `.env` in `frontend` or run Vite with `VITE_API_BASE` in your environment.

## Notes & Next steps
- The backend includes heuristic mapping of frontend keys to model features (`backend/models/predictor.py`) — this helps when frontend names differ from the model's feature names.
- The saved label encoder/Model were trained with older sklearn versions; you may see `InconsistentVersionWarning` when unpickling. Re-training or re-exporting artifacts with matching package versions is recommended for production.

If you'd like, I can:
- Rebuild and run the Docker Compose stack and stream the logs here, or
- Start backend + frontend locally and run a few example predictions to verify the end-to-end behavior.

