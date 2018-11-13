import uuid
from sqlalchemy.dialects.postgresql import UUID
from application.database import db

#from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import (
    Column, String, Integer,
    DateTime, Date, Boolean,
    event, func
)


def default_uuid():
    return str(uuid.uuid4())

def model_oncreate_listener(mapper, connection, instance):
    instance.created_at = func.now()
    instance.updated_at = func.now()
    
def model_onupdate_listener(mapper, connection, instance):
    instance.created_at = instance.created_at
    instance.updated_at = func.now()
    if instance.deleted is True:
        instance.deleted_at = func.now()

# CommonModel
# a common model using to add all below attributes into model class
# using CommonModel as argument of Model Class
class CommonModel(db.Model):
    __abstract__ = True
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    created_at = db.Column(DateTime)
    created_by = db.Column(UUID(as_uuid=True), nullable=True)
    updated_at = db.Column(DateTime)
    updated_by = db.Column(UUID(as_uuid=True), nullable=True)
    deleted = db.Column(Boolean, default=False)
    deleted_by = db.Column(UUID(as_uuid=True), nullable=True)
    deleted_at = db.Column(DateTime)
    
event.listen(CommonModel, 'before_insert', model_oncreate_listener, propagate=True)
event.listen(CommonModel, 'before_update', model_onupdate_listener, propagate=True)