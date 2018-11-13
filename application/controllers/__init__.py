from application.extensions import jinja

from application.models.models import *
from application.models.model_danhmuc import *



def init_controllers(app):
    
    import application.controllers.danhmuc_api
    import application.controllers.donvi_api
    import application.controllers.user

    @app.route('/')
    def index(request):
        return jinja.render('index.html', request)