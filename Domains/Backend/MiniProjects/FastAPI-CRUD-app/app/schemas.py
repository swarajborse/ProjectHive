from pydantic import BaseModel, Field


class ItemBase(BaseModel):
    """
    Shared properties for an item used for input validation.
    """
    title: str
    description: str | None = None
    price: float


class ItemCreate(ItemBase):
    """
    Properties required to create/update an item.
    Inherits from ItemBase; separated for clarity and future extension.
    """
    pass


class Item(ItemBase):
    """
    Item schema returned by the API.
    Note: orm_mode is enabled to allow returning SQLAlchemy models directly.
    """
    id: int
