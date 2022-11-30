from fastapi import FastAPI, Header, Body, Depends
from fastapi.middleware.cors import CORSMiddleware
from database import Base, engine, SessionLocal
from sqlalchemy.orm import Session 
import schemas
import models

Base.metadata.create_all(engine)

def get_session():
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()

app = FastAPI()

origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials= True,
    allow_methods=["*"],
    allow_headers = ["*"]
)

@app.get("/")
def getItems(session: Session = Depends(get_session)):
    items = session.query(models.Item).all()
    return items

@app.get("/{id}")
def getItem(id:int, session: Session = Depends(get_session)):
    item = session.query(models.Item).get(id)
    return item

@app.post("/")
def addItem(item:schemas.Item, session: Session = Depends(get_session)):
    item = models.Item(user = item.user, balance = item.balance, history = item.history)
    session.add(item)
    session.commit()
    session.refresh(item)
    return item

@app.put("/{id}")
def updateItem(id:int, item:schemas.Item, session: Session = Depends(get_session)):
    itemObject = session.query(models.Item).get(id)
    itemObject.user = item.user
    itemObject.balance = item.balance
    itemObject.history = item.history
    session.commit()
    return itemObject


@app.delete("/{id}")
def deleteItem(id:int, session: Session = Depends(get_session)):
    itemObject = session.query(models.Item).get(id)
    session.delete(itemObject)
    session.commit()
    session.close()
    return 'Item was deleted...'