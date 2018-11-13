# Register Blueprints/Views.
from application.extensions import jinja

# import all component here
from .location.model import Country, City


def init_components(app):
    import application.components.location.view
    import application.components.webhook.ipos
    pass
    
    @app.route('/')
    def index(request):
        return jinja.render('index.html', request)