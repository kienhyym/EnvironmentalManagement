""" App entry point. """

from gatco import Gatco
from .config import Config
from gatco.sessions import CookieSessionInterface

app = Gatco(name=__name__)
app.session_interface = CookieSessionInterface()
app.config.from_object(Config)

from application.database import init_database
from application.extensions import init_extensions
from application.controllers import init_controllers

static_endpoint = app.config.get("STATIC_URL", None)
if (static_endpoint is not None) and not ((static_endpoint.startswith( 'http://' ) or (static_endpoint.startswith( 'https://' )))):
    app.static(static_endpoint, './static')

init_database(app)
init_extensions(app)
init_controllers(app)
