from application.extensions import jinja

from application.models.model_user import *
from application.models.model_danhmuc import *
from application.models.model_baocao import *
from application.models.model_vesinhgiadinh import *
from application.models.model_hdhgd import *
from application.models.thongtuquychuannc import *
from application.models.model_kehoachbcc import *



def init_controllers(app):
    
    import application.controllers.danhmuc_api
    import application.controllers.donvi_api
    import application.controllers.user
    import application.controllers.baocao_api
    import application.controllers.vesinhgiadinh_api
    import application.controllers.model_hdhgd_api
    import application.controllers.thongtuquychuannc_api
    import application.controllers.kehoachbcc_api

    @app.route('/')
    def index(request):
        return jinja.render('index.html', request)