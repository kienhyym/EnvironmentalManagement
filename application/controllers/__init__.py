from application.extensions import jinja

from application.models.model_user import *
from application.models.model_danhmuc import *
from application.models.model_baocao import *



def init_controllers(app):
    
    import application.controllers.danhmuc_api
    import application.controllers.donvi_api
    import application.controllers.user
    import application.controllers.baocao_api

    @app.route('/')
    def index(request):
        return jinja.render('index.html', request)