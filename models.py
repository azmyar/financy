from sqlalchemy import Column, Integer, String, ARRAY
from database import Base 

class Item(Base):
    __tablename__ = 'items'
    id      = Column(Integer, primary_key=True)
    user    = Column(String(256))
    balance = Column(Integer)
    history = Column(String(256))