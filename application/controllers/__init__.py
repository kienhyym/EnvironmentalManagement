from application.extensions import jinja


def init_controllers(app):
    
    import application.controllers.danhmuc_api
    import application.controllers.donvi_api
    import application.controllers.user
    import application.controllers.forgot_password
#     import application.controllers.baocao_api
    import application.controllers.vesinhhogiadinh_api
#     import application.controllers.model_hdhgd_api
#     import application.controllers.thongtuquychuannc_api
#     import application.controllers.baocao_api
#     import application.controllers.vesinhgiadinh_api
#     import application.controllers.model_hdhgd_api
    import application.controllers.thongtuquychuannuoc_api
    import application.controllers.kehoachbcc_api
    import application.controllers.truong_tramyte_vesinh_capnuoc_api

    @app.route('/')
    def index(request):
        return jinja.render('index.html', request)
    
    @app.route('/huongdansudung')
    def index(request):
        return jinja.render('huongdansudung/huongdansudung.html', request)
