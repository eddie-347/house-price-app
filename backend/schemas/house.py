from typing import Dict, Any
from pydantic import BaseModel, Field


class HouseFeatures(BaseModel):
    # use a generic dict so we can reuse the existing frontend easily
    features: Dict[str, Any] = Field(..., description="Raw feature dictionary")


class PredictionResponse(BaseModel):
    predicted_price: float = Field(..., description="Estimated house price")
    currency: str = "INR"
    model_version: str = "xgboost_refined_v1"
