FROM python:3.11-slim
WORKDIR /app

# Install runtime dependencies
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir --default-timeout=1000 -r requirements.txt

# Copy the backend source
COPY backend/ .

ENV PYTHONPATH=/app
EXPOSE 8001

CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8001"]
