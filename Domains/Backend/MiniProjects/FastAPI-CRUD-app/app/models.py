from sqlalchemy import Column, Integer, String, Float, Text

from .database import Base


class Item(Base):
    """
    SQLAlchemy ORM model for an item.

    Columns:
    - id: primary key
    - title: short title of the item
    - description: longer description (Text)
    - price: numeric price stored as a float
    """
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False, index=True)
    description = Column(Text, nullable=True)
    price = Column(Float, nullable=False)
