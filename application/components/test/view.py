from application.extensions import apimanager
from .model import Test


apimanager.create_api(
    Test,
    methods = ["GET", "POST", "PUT", "DELETE"],
    url_prefix='/api',
    collection_name = "test"
)
