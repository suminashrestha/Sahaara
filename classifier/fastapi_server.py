from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
from PIL import Image
import io
from ultralytics import YOLO

app = FastAPI()

# Allow CORS
origins = [
    "http://localhost:5173",  # React app runs on this address
    # FastAPI app runs on this address (if you access it from the browser)
    "http://localhost:8001",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load your YOLO model
model = YOLO(
    "../classifier/runs/classify/train8/weights/best.pt")


@app.post("/classify")
async def classify_image(file: UploadFile = File(...)):
    # Read image file
    contents = await file.read()
    image = Image.open(io.BytesIO(contents)).convert("RGB")

    # Convert image to numpy array
    image_np = np.array(image)

    # Run the model
    results = model(image_np)

    # Extract probabilities and map to class names
    probs = results[0].probs.data.tolist()
    labels = {0: 'cat', 1: 'dog'}

    # Prepare the response based on the highest probability
    max_prob = max(probs)
    identified_class_idx = np.argmax(probs)
    identified_class = labels[identified_class_idx]

    response = {
        "predictions": probs,
        "label": identified_class if max_prob >= 0.5 else "Not identified"
    }
    return JSONResponse(content=response)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
