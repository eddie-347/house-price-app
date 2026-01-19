from pathlib import Path
import logging

BASE_DIR = Path(__file__).resolve().parent

MODEL_PATH = BASE_DIR / "artifacts" / "xgboost_model_refined.joblib"
ENCODER_PATH = BASE_DIR / "artifacts" / "label_encoder.joblib"
FEATURES_PATH = BASE_DIR / "data" / "features.json"
LOG_DIR = BASE_DIR / "logs"
LOG_DIR.mkdir(exist_ok=True)

logging.basicConfig(
    filename=LOG_DIR / "app.log",
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(name)s - %(message)s",
)
logger = logging.getLogger("house-price-backend")
