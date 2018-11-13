from sqlalchemy.dialects.postgresql import UUID
from application.database import db
from application.database.model import CommonModel


class Test(db.Model):
    __tablename__ = "test"
    id = db.Column(UUID(as_uuid=True), primary_key=True)
    name = db.Column(db.String(50))
    image = db.Column(db.String(255))
    price = db.Column(db.Decimal(10,2))
    describe = db.Column(db.Text())

