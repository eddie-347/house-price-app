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

# In production, allow requests from Vercel
# In development, allow localhost
app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=".*",  # Allow all origins temporarily to debug
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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