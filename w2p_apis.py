from fastapi import FastAPI, Path
from typing import Optional
from pydantic import BaseModel
from starlette.responses import FileResponse
import json
import pickle
import sys

from model import *

from fastapi.middleware.cors import CORSMiddleware

origins = ["*"]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class State(BaseModel):
    N: float
    P: float
    K: float
    temp: float
    humidity: float
    ph: float
    rainfall: float

@app.get("/")
def index():
    return FileResponse('landing_page.html')

@app.post("/suggest_crop/")
def suggest_crop(State: State):
    crop = suggestCrop(State.N, State.P, State.K, State.temp, State.humidity, State.ph, State.rainfall)
    return {'status': 'OK', 'data': crop}


# {
#   "N": 20,
#   "P": 30,
#   "K": 20,
#   "temp": 45,
#   "humidity": 20,
#   "ph": 4,
#   "rainfall": 200
# }