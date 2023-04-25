import base64
from fastapi import FastAPI
from pydantic import BaseModel
from model_demo import predict
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
origins = [
    "http://localhost:3000",
]

# add middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class InputData(BaseModel):
    data: str


@app.post("/predict")
async def upload(file: InputData):
    try:
        true_base64_file = file.data.split(",", 1)[1].encode("ascii")
        decoded_image = base64.b64decode(true_base64_file)
        img_file = open("uploadImage.jpg", "wb")
        img_file.write(decoded_image)
        img_file.close()
        classification_label: str = predict("uploadImage.jpg")
        return {"status": "ok", "image": file.data, "class_label": classification_label}
    except:
        return {"status": "error"}
