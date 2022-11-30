from pydantic import BaseModel

class Item(BaseModel):
    user    :str
    balance :int
    history :str
    
    class Config:
        orm_mode = True