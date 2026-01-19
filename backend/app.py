from pathlib import Path
import logging
import sys

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from schemas.house import HouseFeatures, PredictionResponse
from models.predictor import HousePricePredictor
from config import logger


BASE_DIR = Path(__file__).resolve().parent

MODEL_PATH = BASE_DIR / "artifacts" / "xgboost_model_refined.joblib"
ENCODER_PATH = BASE_DIR / "artifacts" / "label_encoder.joblib"
FEATURES_PATH = BASE_DIR / "data" / "features.json"

app = FastAPI(
    title="House Price API",
    version="1.0.0",
    description="Backend for house price prediction using XGBoost.",
)

import os

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:5175",
    "http://127.0.0.1:5175",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://frontend:80",
    "http://frontend",
]

# Add frontend URL from environment (for production)
frontend_url = os.getenv("FRONTEND_URL")
if frontend_url:
    origins.append(frontend_url)

# Also allow https versions for production
if frontend_url:
    origins.append(frontend_url.replace("http://", "https://"))

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
    max_age=3600,
)

predictor = HousePricePredictor()


@app.get("/health")
async def health():
    return {"status": "ok"}


@app.post("/predict", response_model=PredictionResponse)
async def predict_price(body: HouseFeatures):
    try:
        logger.info(f"Request received with {len(body.features)} features")
        logger.debug(f"Features: {body.features}")
        price = predictor.predict(body.features)
        logger.info(f"Prediction result: {price}")
        return PredictionResponse(predicted_price=price)
    except Exception as e:
        logger.exception(f"Prediction failed: {e}")
        raise HTTPException(status_code=500, detail="Prediction failed")