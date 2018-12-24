from datetime import datetime
from application.extensions import apimanager
from gatco_restapi.helpers import to_dict
from application.server import app
from sqlalchemy import or_, and_
from gatco.response import json
from application.database import db
import ujson
import asyncio
import aiohttp
from application.models.model_danhmuc import XaPhuong
from application.models.model_baocao import CapXa, CapThon
from application.models.model_user import TinhTrangBaocaoEnum
from .helpers import *


async def reponse_capxa_single(request=None, Model=None, result=None, **kw):
    obj = to_dict(result)
    capthon = db.session.query(CapThon).filter(CapThon.tenxa_id == obj['tenxa_id']).all()
    thons = []
    for thon in capthon:
        thons.append(to_dict(thon))
    obj['capthon'] = thons
    result = obj

async def pre_post_capxa(request=None, data=None, Model=None, **kw):
    currentuser = await current_user(request)
    if currentuser is None:
        return json({"error_code":"SESSION_EXPIRED","error_message":"Hết phiên hoạt động, vui lòng đăng nhập lại"}, status=520)
      
    if "tenxa_id" not in data or data["tenxa_id"] is None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Chưa chọn cấp xã"}, status=520)
    if "danhgianam" not in data or data["danhgianam"] is None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Chưa chọn năm báo cáo"}, status=520)
    
    record = db.session.query(CapXa).filter(and_(CapXa.tenxa_id == data['tenxa_id'], CapXa.danhgianam == data['danhgianam'])).first()
    if record is not None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Báo cáo năm hiện tại đã được tạo, vui lòng kiểm tra lại"}, status=520)
    data['tinhtrang'] = TinhTrangBaocaoEnum.taomoi
    data['donvi_id'] = currentuser.donvi_id
    data['nguoibaocao_id'] = currentuser.id
    
    
async def baocao_prepost_thon(request=None, data=None, Model=None, **kw):
    currentuser = await current_user(request)
    if currentuser is None:
        return json({"error_code":"SESSION_EXPIRED","error_message":"Hết phiên hoạt động, vui lòng đăng nhập lại"}, status=520)
      
    if "thon_id" not in data or data["thon_id"] is None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Chưa chọn thôn xóm"}, status=520)
    if "danhgianam" not in data or data["danhgianam"] is None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Chưa chọn năm báo cáo"}, status=520)
    
    record = db.session.query(CapThon).filter(and_(CapThon.thon_id == data['thon_id'], CapThon.danhgianam == data['danhgianam'])).first()
    if record is not None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Báo cáo năm của đơn vị hiện tại đã được tạo, vui lòng kiểm tra lại"}, status=520)
    data['tenthon'] = data['thon']['ten']
    data['tinhtrang'] = TinhTrangBaocaoEnum.taomoi
    data['donvi_id'] = currentuser.donvi_id
    data['nguoibaocao_id'] = currentuser.id
    
async def baocao_preput_thon(request=None, data=None, Model=None, **kw):
    data['tenthon'] = data['thon']['ten']
      
async def post_capthon(request=None, Model=None, result=None, **kw):
    obj = to_dict(result)
#     obj['tenthon'] = obj['thon']['ten']
#     result = obj
#     nhatieuxa = NhaTieuXaHVS()
#     nhatieuxa.capxa_id = obj['capxa_id']
#     nhatieuxa.capthon_id = obj['id']
#     nhatieuxa.tenthon = obj['tenthon']
# #     nhatieuxa.hotrongthon = obj['hotrongthon']
#     nhatieuxa.nuchuho = obj['chuholanu']
#     nhatieuxa.sohongheo = obj['sohongheo']
#     nhatieuxa.sodtts = obj['sohodtts']
#     nhatieuxa.created_at = datetimee.now()
#     nhatieuxa.updated_at = datetimee.now()
#     db.session.add(nhatieuxa)
#     db.session.commit()


    
      
    
                

    