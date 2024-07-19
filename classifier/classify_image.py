import sys
import torch
from ultralytics import YOLO


def classify_image(image_path):
    # Load the trained YOLOv8 model
    # Update this path to your model's path
    model = YOLO(r'C:\Users\ACER\runs\classify\train8\weights\best.pt')

    # Perform inference
    results = model(image_path)

    # Extract classification result
    class_id = results[0].boxes.cls[0].item()
    class_name = model.names[int(class_id)]

    return class_name


if __name__ == "__main__":
    image_path = sys.argv[1]
    result = classify_image(image_path)
    print(result)
