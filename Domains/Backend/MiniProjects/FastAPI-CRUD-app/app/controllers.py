from typing import List, Optional

from sqlalchemy.orm import Session

from . import models, schemas


def get_items(db: Session, skip: int = 0, limit: int = 100) -> List[models.Item]:
    """
    Return a list of items from the database.

    Args:
        db: SQLAlchemy Session
        skip: number of records to skip (offset)
        limit: maximum number of records to return

    Returns:
        List of Item instances.
    """
    return db.query(models.Item).offset(skip).limit(limit).all()


def get_item(db: Session, item_id: int) -> Optional[models.Item]:
    """
    Return a single item by id or None if not found.
    """
    return db.query(models.Item).filter(models.Item.id == item_id).first()


def create_item(db: Session, item: schemas.ItemCreate) -> models.Item:
    """
    Create and persist a new item.

    Commits the transaction and refreshes the instance to populate generated fields (e.g. id).
    """
    db_item = models.Item(
        title=item.title, description=item.description, price=item.price
    )
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item


def update_item(db: Session, item_id: int, item: schemas.ItemCreate) -> Optional[models.Item]:
    """
    Update fields of an existing item.

    Returns the updated item or None if the item does not exist.
    """
    db_item = db.query(models.Item).filter(models.Item.id == item_id).first()
    if db_item is None:
        return None
    db_item.title = item.title
    db_item.description = item.description
    db_item.price = item.price
    db.commit()
    db.refresh(db_item)
    return db_item


def delete_item(db: Session, item_id: int) -> Optional[models.Item]:
    """
    Delete an item by id.

    Returns the deleted item (detached) or None if not found.
    """
    db_item = db.query(models.Item).filter(models.Item.id == item_id).first()
    if db_item is None:
        return None
    db.delete(db_item)
    db.commit()
    return db_item