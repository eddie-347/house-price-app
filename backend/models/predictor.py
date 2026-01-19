import json
from typing import Dict, Any, List

import joblib
import numpy as np
import pandas as pd

from config import MODEL_PATH, ENCODER_PATH, FEATURES_PATH, logger



class HousePricePredictor:
    def __init__(self):
        logger.info("Loading model and encoder")
        self.model = joblib.load(MODEL_PATH)
        self.label_encoder = joblib.load(ENCODER_PATH)
        with open(FEATURES_PATH, "r") as f:
            self.features: List[str] = json.load(f)

    def _prepare_input(self, payload: Dict[str, Any]) -> pd.DataFrame:
        """Prepare DataFrame for XGBoost - simplified version."""
        # Normalize incoming payload keys to lowercase for flexible matching
        norm_payload = {k.lower(): v for k, v in payload.items()}
        row = {}

        for feature in self.features:
            lf = feature.lower()
            value = None

            # Special handling for location / encoding: do this first to avoid substring
            if ("location" in lf) or ("locality" in lf) or ("city" in lf):
                loc = norm_payload.get("location") or norm_payload.get("city") or norm_payload.get("locality")
                if loc is not None:
                    try:
                        enc = self.label_encoder.transform([loc])[0]
                        value = int(enc)
                    except Exception:
                        value = 0
                else:
                    value = None
            else:
                # Direct match by normalized key
                if lf in norm_payload:
                    value = norm_payload[lf]
                else:
                    # Try to match by substring: if a payload key is a substring of the feature name
                    for k, v in norm_payload.items():
                        if k in lf or lf in k:
                            value = v
                            break

            if value is None:
                logger.warning(f"Missing feature '{feature}', defaulting to 0")
                value = 0

            # Cast booleans to integers and attempt numeric casting where appropriate
            if isinstance(value, bool):
                value = int(value)
            else:
                try:
                    # preserve strings that are clearly non-numeric (e.g., 'north')
                    if isinstance(value, (int, float)):
                        pass
                    else:
                        # try convert numeric strings
                        if str(value).replace('.', '', 1).lstrip('-').isdigit():
                            if '.' in str(value):
                                value = float(value)
                            else:
                                value = int(value)
                except Exception:
                    pass

            row[feature] = value

        df = pd.DataFrame([row])
        return df

    def predict(self, payload: Dict[str, Any]) -> float:
        df = self._prepare_input(payload)
        pred = self.model.predict(df)[0]
        return float(pred)
