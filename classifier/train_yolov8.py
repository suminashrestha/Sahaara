from ultralytics import YOLO

model = YOLO("yolov8n-cls.pt")
model.train(data="C:/Users/ACER/Desktop/sahaara_dataset/images",
            epochs=50, imgsz=640)
