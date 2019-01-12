import asyncio
import aiohttp
import hashlib
import ujson
from application.extensions import apimanager
from application.server import app
from application.database import db
from sqlalchemy.orm import aliased, joinedload_all
from gatco.response import json, text, html

from .helpers import *
from application.models.model_vesinhhogiadinh import *
from application.models.model_truong_tramyte_vesinh_capnuoc import Phieu_DieuTra_Truonghoc_TramYTe_Vesinh_CapNuoc
from sqlalchemy import or_, and_, desc
from application.client import HTTPClient 
from gatco_restapi.helpers import to_dict
from application.models.model_user import TinhTrangBaocaoEnum
from datetime import datetime


@app.route('api/v1/thongkevesinh', methods=['GET'])
async def ThongKe_VESINH(request):
    nambaocao = request.args.get("nambaocao", None)
    loaikybaocao = request.args.get("loaikybaocao", None)
    kybaocao = request.args.get("kybaocao", None)
    tinhthanh_id = request.args.get("tinhthanh_id", None)
    
    currentuser = await current_user(request)
    if currentuser is None:
        return json({"error_code":"SESSION_EXPIRED","error_message":"Hết phiên hoạt động, vui lòng đăng nhập lại"}, status=520)
      
    if "loaikybaocao" is None or "kybaocao" is None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Kỳ báo cáo không hợp lệ"}, status=520)
    if "nambaocao" is None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Chưa chọn năm báo cáo"}, status=520)
    records = None
    if(currentuser.donvi.tuyendonvi_id ==1):
        records = db.session.query(VSCapXa).filter(and_(VSCapXa.tinhthanh_id == tinhthanh_id, \
                                                        VSCapXa.loaikybaocao == loaikybaocao, \
                                                        VSCapXa.kybaocao == kybaocao, \
                                                        VSCapXa.nambaocao == nambaocao)).all()
    elif(currentuser.donvi.tuyendonvi_id ==2):
        records = db.session.query(VSCapXa).filter(and_(VSCapXa.tinhthanh_id == currentuser.donvi.tinhthanh_id, \
                                                        VSCapXa.loaikybaocao == loaikybaocao, \
                                                        VSCapXa.kybaocao == kybaocao, \
                                                        VSCapXa.nambaocao == nambaocao)).all() 
    elif(currentuser.donvi.tuyendonvi_id ==3):
        records = db.session.query(VSCapXa).filter(and_(VSCapXa.quanhuyen_id == currentuser.donvi.quanhuyen_id, \
                                                        VSCapXa.loaikybaocao == loaikybaocao, \
                                                        VSCapXa.kybaocao == kybaocao, \
                                                        VSCapXa.nambaocao == nambaocao)).all()  
    elif(currentuser.donvi.tuyendonvi_id == 4):
        records = db.session.query(VSCapXa).filter(and_(VSCapXa.xaphuong_id == currentuser.donvi.xaphuong_id, \
                                                        VSCapXa.loaikybaocao == loaikybaocao, \
                                                        VSCapXa.kybaocao == kybaocao, \
                                                        VSCapXa.nambaocao == nambaocao)).all()                                                                                                                                     
    if records is None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Không tìm thấy báo cáo của các đơn vị, vui lòng kiểm tra lại"}, status=520)
    else:
        results = []
        for baocao in records:
            bcxa = {}
            bcxa['tenxaphuong'] = baocao.xaphuong.ten
            bcxa['tenquanhuyen'] = baocao.quanhuyen.ten
            bcxa['tentinhthanh'] = baocao.tinhthanh.ten
            bcxa['tongxa'] = len(records)
            if(baocao.tong_soho is None or baocao.tong_soho <= 0):
                bcxa['tyle_conhatieu'] = 0
                bcxa['tyle_nhatieu_caithien'] = 0
                bcxa['tyle_diemruatay'] = 0
                bcxa['tong_soho'] = 0
                bcxa['tong_danso'] = 0
                bcxa['tong_chuholanu'] = 0
                bcxa['tong_sohodtts'] = 0
                bcxa['tyle_chuholanu'] = 0
                bcxa['tyle_hodtts'] = 0
            else:
                bcxa['tyle_conhatieu'] = (baocao.tong_soho - baocao.tong_khongnhatieu/baocao.tong_soho)*100
                bcxa['tyle_conhatieu_hvs'] = (baocao.tong_hopvs/baocao.tong_soho)*100
                bcxa['tyle_tuhoai_hvs'] = (baocao.tong_tuhoai_hvs/baocao.tong_soho)*100
                bcxa['tyle_thamdoi_hvs'] = (baocao.tong_thamdoi_hvs/baocao.tong_soho)*100
                bcxa['tyle_2ngan_hvs'] = (baocao.tong_2ngan_hvs/baocao.tong_soho)*100
                bcxa['tyle_ongthonghoi_hvs'] = (baocao.tong_ongthonghoi_hvs/baocao.tong_soho)*100

                bcxa['tyle_nhatieu_caithien_hvs'] = (baocao.tong_caithien_hvs/baocao.tong_soho)*100
                bcxa['tyle_caithien_hongheo_hvs'] = (baocao.tong_caithien_hongheo_hvs/baocao.tong_soho)*100
                bcxa['tyle_diemruatay'] = (baocao.tong_diemruatay/baocao.tong_soho)*100
                
                results.append(bcxa)
        return json(results)

@app.route('api/v1/tiendovstx', methods=['GET'])
async def ThongKe_TienDo_VSTX(request):
    nambaocao = request.args.get("nambaocao", None)
    loaikybaocao = request.args.get("loaikybaocao", None)
    kybaocao = request.args.get("kybaocao", None)
    tinhthanh_id = request.args.get("tinhthanh_id", None)
    
    currentuser = await current_user(request)
    if currentuser is None:
        return json({"error_code":"SESSION_EXPIRED","error_message":"Hết phiên hoạt động, vui lòng đăng nhập lại"}, status=520)
      
    if "loaikybaocao" is None or "kybaocao" is None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Kỳ báo cáo không hợp lệ"}, status=520)
    if "nambaocao" is None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Chưa chọn năm báo cáo"}, status=520)
    records = None
    if(currentuser.donvi.tuyendonvi_id ==1):
        records = db.session.query(VSCapXa).filter(and_(VSCapXa.tinhthanh_id == tinhthanh_id, \
                                                        VSCapXa.loaikybaocao == loaikybaocao, \
                                                        VSCapXa.kybaocao == kybaocao, \
                                                        VSCapXa.nambaocao == nambaocao)).all()
    elif(currentuser.donvi.tuyendonvi_id ==2):
        records = db.session.query(VSCapXa).filter(and_(VSCapXa.tinhthanh_id == currentuser.donvi.tinhthanh_id, \
                                                        VSCapXa.loaikybaocao == loaikybaocao, \
                                                        VSCapXa.kybaocao == kybaocao, \
                                                        VSCapXa.nambaocao == nambaocao)).all() 
    elif(currentuser.donvi.tuyendonvi_id ==3):
        records = db.session.query(VSCapXa).filter(and_(VSCapXa.quanhuyen_id == currentuser.donvi.quanhuyen_id, \
                                                        VSCapXa.loaikybaocao == loaikybaocao, \
                                                        VSCapXa.kybaocao == kybaocao, \
                                                        VSCapXa.nambaocao == nambaocao)).all()  
    elif(currentuser.donvi.tuyendonvi_id == 4):
        records = db.session.query(VSCapXa).filter(and_(VSCapXa.xaphuong_id == currentuser.donvi.xaphuong_id, \
                                                        VSCapXa.loaikybaocao == loaikybaocao, \
                                                        VSCapXa.kybaocao == kybaocao, \
                                                        VSCapXa.nambaocao == nambaocao)).all()                                                                                                                                     
    if records is None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Không tìm thấy báo cáo của các đơn vị, vui lòng kiểm tra lại"}, status=520)
    else:
        results = []
        for baocao in records:
            bcxa = {}
            bcxa['tenxaphuong'] = baocao.xaphuong.ten
            bcxa['tenquanhuyen'] = baocao.quanhuyen.ten
            bcxa['tentinhthanh'] = baocao.tinhthanh.ten
            bcxa['tongxa'] = len(records)
            bcxa['tyle_nhatieu_caithien'] = (baocao.tong_caithien/baocao.tong_soho)*100
            bcxa['tyle_diemruatay'] = (baocao.tong_diemruatay/baocao.tong_soho)*100
            bcxa['tong_soho'] = baocao.tong_soho
            bcxa['tong_danso'] = baocao.tong_danso
            bcxa['tong_chuholanu'] = baocao.tong_chuholanu
            bcxa['tong_sohodtts'] = baocao.tong_sohodtts
            bcxa['tyle_chuholanu'] = (baocao.tong_chuholanu/baocao.tong_soho)*100
            bcxa['tyle_hodtts'] = (baocao.tong_sohodtts/baocao.tong_soho)*100

            record_truong_tram = db.session.query(Phieu_DieuTra_Truonghoc_TramYTe_Vesinh_CapNuoc).filter(
                and_(Phieu_DieuTra_Truonghoc_TramYTe_Vesinh_CapNuoc.xaphuong_id == baocao.xaphuong_id, \
                Phieu_DieuTra_Truonghoc_TramYTe_Vesinh_CapNuoc.loaikybaocao == loaikybaocao, \
                Phieu_DieuTra_Truonghoc_TramYTe_Vesinh_CapNuoc.kybaocao == kybaocao, \
                Phieu_DieuTra_Truonghoc_TramYTe_Vesinh_CapNuoc.nambaocao == nambaocao)).all()
            if record_truong_tram is None:
                bcxa['tyle_truong_hvs'] = 0
                bcxa['tongso_hocsinh'] = 0
                bcxa['tyle_tramyte_hvs'] = 0
            else:
                tongso_truong = 0
                tongso_truong_hvs = 0
                tongso_tramyte = 0
                tongso_tramyte_hvs = 0
                tongso_hocsinh = 0
                for bc_truongtram in record_truong_tram:
                    if (bc_truongtram.loai_truong_tramyte is not None and bc_truongtram.loai_truong_tramyte == 7):
                        tongso_tramyte +=1
                        if bc_truongtram.ketluan is not None and bc_truongtram.ketluan ==1:
                            tongso_tramyte_hvs +=1
                    if (bc_truongtram.loai_truong_tramyte is not None and bc_truongtram.loai_truong_tramyte in [1,2,3,4,5,6]):
                        tongso_truong +=1
                        tongso_hocsinh += bc_truongtram.truong_sohocsinh_moibuoi
                        if bc_truongtram.ketluan is not None and bc_truongtram.ketluan ==1:
                            tongso_truong_hvs +=1
                bcxa['tongso_truong']= tongso_truong
                bcxa['tongso_truong_hvs']= tongso_truong_hvs
                bcxa['tongso_tramyte']= tongso_tramyte
                bcxa['tongso_tramyte_hvs']= tongso_tramyte_hvs
                bcxa['tongso_hocsinh']= tongso_hocsinh
                if(tongso_truong>0):
                    bcxa['tyle_truong_hvs']= (tongso_truong_hvs/tongso_truong)*100
                else:
                    bcxa['tyle_truong_hvs'] = 0
                if tongso_tramyte >0:
                    bcxa['tyle_tramyte_hvs']= (tongso_tramyte_hvs/tongso_tramyte)*100
                else:
                    bcxa['tyle_tramyte_hvs'] = 0
            results.append(bcxa)
        return json(results)
    
@app.route('api/v1/tiendovstx_benvung', methods=['GET'])
async def ThongKe_TienDo_VSTX_BENVUNG(request):
    nambaocao = request.args.get("nambaocao", None)
    loaikybaocao = request.args.get("loaikybaocao", None)
    kybaocao = request.args.get("kybaocao", None)
    tinhthanh_id = request.args.get("tinhthanh_id", None)
    
    currentuser = await current_user(request)
    if currentuser is None:
        return json({"error_code":"SESSION_EXPIRED","error_message":"Hết phiên hoạt động, vui lòng đăng nhập lại"}, status=520)
      
    if "loaikybaocao" is None or "kybaocao" is None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Kỳ báo cáo không hợp lệ"}, status=520)
    if "nambaocao" is None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Chưa chọn năm báo cáo"}, status=520)
    records = None
    if(currentuser.donvi.tuyendonvi_id ==1):
        records = db.session.query(DuyetVeSinhToanXa).filter(DuyetVeSinhToanXa.tinhthanh_id == tinhthanh_id).all()
    elif(currentuser.donvi.tuyendonvi_id ==2):
        records = db.session.query(DuyetVeSinhToanXa).filter(DuyetVeSinhToanXa.tinhthanh_id == currentuser.donvi.tinhthanh_id).all() 
    elif(currentuser.donvi.tuyendonvi_id ==3):
        records = db.session.query(DuyetVeSinhToanXa).filter(DuyetVeSinhToanXa.quanhuyen_id == currentuser.donvi.quanhuyen_id).all()  
    elif(currentuser.donvi.tuyendonvi_id == 4):
        records = db.session.query(DuyetVeSinhToanXa).filter(DuyetVeSinhToanXa.xaphuong_id == currentuser.donvi.xaphuong_id).all()                                                                                                                                     
    if records is None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Không tìm thấy báo cáo của các đơn vị, vui lòng kiểm tra lại"}, status=520)
    else:
        results = []
        for baocao in records:
            bcxa = {}
            bcxa['tenxaphuong'] = baocao.xaphuong.ten
            bcxa['tenquanhuyen'] = baocao.quanhuyen.ten
            bcxa['tentinhthanh'] = baocao.tinhthanh.ten
            bcxa['tongxa'] = len(records)
            bcxa['namdat_vstx'] = baocao.nam_datvesinh_toanxa
            bcxa['namdat_vstx_benvung'] = baocao.nam_datvesinh_toanxa_benvung
            record_truong_tram = db.session.query(Phieu_DieuTra_Truonghoc_TramYTe_Vesinh_CapNuoc).filter(
                and_(Phieu_DieuTra_Truonghoc_TramYTe_Vesinh_CapNuoc.xaphuong_id == baocao.xaphuong_id, \
                Phieu_DieuTra_Truonghoc_TramYTe_Vesinh_CapNuoc.loaikybaocao == loaikybaocao, \
                Phieu_DieuTra_Truonghoc_TramYTe_Vesinh_CapNuoc.kybaocao == kybaocao, \
                Phieu_DieuTra_Truonghoc_TramYTe_Vesinh_CapNuoc.nambaocao == nambaocao)).all()
            if record_truong_tram is None:
                bcxa['tongso_truong'] = 0
                bcxa['tongso_tramyte'] = 0
                bcxa['tongso_truong_hvs'] = 0
                bcxa['tongso_tramyte_hvs'] = 0
                bcxa['tyle_truong_hvs'] = 0
                bcxa['tyle_tramyte_hvs'] = 0
            else:
                tongso_truong = 0
                tongso_truong_hvs = 0
                tongso_tramyte = 0
                tongso_tramyte_hvs = 0
                for bc_truongtram in record_truong_tram:
                    if (bc_truongtram.loai_truong_tramyte is not None and bc_truongtram.loai_truong_tramyte == 7):
                        tongso_tramyte +=1
                        if bc_truongtram.ketluan is not None and bc_truongtram.ketluan ==1:
                            tongso_tramyte_hvs +=1
                    if (bc_truongtram.loai_truong_tramyte is not None and bc_truongtram.loai_truong_tramyte in [1,2,3,4,5,6]):
                        tongso_truong +=1
                        if bc_truongtram.ketluan is not None and bc_truongtram.ketluan ==1:
                            tongso_truong_hvs +=1
                bcxa['tongso_truong']= tongso_truong
                bcxa['tongso_truong_hvs']= tongso_truong_hvs
                bcxa['tongso_tramyte']= tongso_tramyte
                bcxa['tongso_tramyte_hvs']= tongso_tramyte_hvs
                if(tongso_truong>0):
                    bcxa['tyle_truong_hvs']= (tongso_truong_hvs/tongso_truong)*100
                else:
                    bcxa['tyle_truong_hvs'] = 0
                if tongso_tramyte >0:
                    bcxa['tyle_tramyte_hvs']= (tongso_tramyte_hvs/tongso_tramyte)*100
                else:
                    bcxa['tyle_tramyte_hvs'] = 0
            results.append(bcxa)
        return json(results)

def congdonTongCong(Baocao, current_user, data=None):
    notdict = ['_created_at','_updated_at','_deleted','_deleted_at','_etag','id','donvi_id',\
               'nambaocao','kybaocao','mabaocao','nguoibaocao_id','thoigianbaocao','tinhtrang']
    
    curdonvi_id = current_user.donvi_id
    baocaos = db.session.query(Baocao, DonVi).\
            filter(Baocao.donvi_id == DonVi.id).\
            filter(or_(DonVi.captren_id == curdonvi_id, Baocao.donvi_id == curdonvi_id)).\
            filter(Baocao.loaikybaocao == data['loaikybaocao']).\
            filter(Baocao.kybaocao == data['kybaocao']).\
            filter(Baocao.nambaocao == data['nambaocao']).all()
    
    resp = []
    for baocao, donvi in baocaos:
        print("baocathon=====",baocao)
        resp.append(to_dict(baocao))
#         for c in Baocao.__table__.c:
#             if c.name not in notdict:
#                 if (c.name not in resp) or (resp[c.name] is None):
#                     resp[c.name] = getattr(baocao, c.name)
#                 else:
#                     if (resp[c.name] is None):
#                         resp[c.name] = 0
#                     val = getattr(baocao, c.name)
#                     if (val is None or c.name == "datetime.datetime"):
#                         val = 0
#                     resp[c.name] = resp[c.name] +  val
    return resp

async def baocao_prepost_vscapthon(request=None, data=None, Model=None, **kw):
    currentuser = await current_user(request)
    if currentuser is None:
        return json({"error_code":"SESSION_EXPIRED","error_message":"Hết phiên hoạt động, vui lòng đăng nhập lại"}, status=520)
      
    if "thonxom_id" not in data or data["thonxom_id"] is None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Chưa chọn thôn xóm"}, status=520)
    if "nambaocao" not in data or data["nambaocao"] is None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Chưa chọn năm báo cáo"}, status=520)
    
    record = db.session.query(VSCapThon).filter(and_(VSCapThon.donvi_id == currentuser.donvi_id,\
                                                      VSCapThon.thonxom_id == data['thonxom_id'], \
                                                      VSCapThon.loaikybaocao == data['loaikybaocao'], \
                                                      VSCapThon.kybaocao == data['kybaocao'], \
                                                      VSCapThon.nambaocao == data['nambaocao'])).first()
    if record is not None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Báo cáo của đơn vị hiện tại đã được tạo, vui lòng kiểm tra lại"}, status=520)
    
    data['tenthon'] = data['thonxom']['ten']
    data['tinhtrang'] = TinhTrangBaocaoEnum.taomoi
    data['donvi_id'] = currentuser.donvi_id
    data['nguoibaocao_id'] = currentuser.id
    data['ngaybaocao'] = str(datetime.now())
    await process_baocao_vesinh_capthon(currentuser,data)
    
    
async def pre_put_vscapthon(request=None, instance_id=None, data=None, **kw):
    currentuser = await current_user(request)
    if currentuser is None:
        return json({"error_code":"SESSION_EXPIRED","error_message":"Hết phiên hoạt động, vui lòng đăng nhập lại"}, status=520)
    
    await process_baocao_vesinh_capthon(currentuser,data)
    
async def pre_put_vscapxa(request=None, instance_id=None, data=None, **kw):
    currentuser = await current_user(request)
    if currentuser is None:
        return json({"error_code":"SESSION_EXPIRED","error_message":"Hết phiên hoạt động, vui lòng đăng nhập lại"}, status=520)
    
    await process_baocao_vesinh_capXaHuyenTinh(currentuser,VSCapXa,data)
    
async def pre_put_vscaphuyen(request=None, instance_id=None, data=None, **kw):
    currentuser = await current_user(request)
    if currentuser is None:
        return json({"error_code":"SESSION_EXPIRED","error_message":"Hết phiên hoạt động, vui lòng đăng nhập lại"}, status=520)
    
    await process_baocao_vesinh_capXaHuyenTinh(currentuser,VSCapHuyen,data)

async def pre_put_vscaptinh(request=None, instance_id=None, data=None, **kw):
    currentuser = await current_user(request)
    if currentuser is None:
        return json({"error_code":"SESSION_EXPIRED","error_message":"Hết phiên hoạt động, vui lòng đăng nhập lại"}, status=520)
    
    await process_baocao_vesinh_capXaHuyenTinh(currentuser,VSCapTinh,data)  
    
async def process_baocao_vesinh_capthon(currentuser=None, data=None):
    BaoCao = VSCapThon
    kybaocaotruoc = 1
    nambaocao_truoc = None
    if (data['kybaocao'] > 1):
        kybaocaotruoc = data['kybaocao'] - 1
        nambaocao_truoc = data['nambaocao']
    else:
        nambaocao_truoc = data['nambaocao'] - 1
        if (data['loaikybaocao'] == LoaiKyBaoCao.QUY):
            kybaocaotruoc = 4
        elif (data['loaikybaocao'] == LoaiKyBaoCao.THANG):
            kybaocaotruoc = 12
        elif (data['loaikybaocao'] == LoaiKyBaoCao.SAUTHANG):
            kybaocaotruoc = 2
            
    baocaokytruoc = db.session.query(BaoCao).filter(and_(BaoCao.donvi_id == currentuser.donvi_id,\
#                                                       VSCapThon.thonxom_id == data['thonxom_id'], \
                                                      BaoCao.loaikybaocao == data['loaikybaocao'], \
                                                      BaoCao.kybaocao == kybaocaotruoc, \
                                                      BaoCao.nambaocao == nambaocao_truoc)).first()    
    
    if baocaokytruoc is not None:
        data["tong_soho_conhatieu_truocbaocao"] = baocaokytruoc.tong_soho - baocaokytruoc.tong_khongnhatieu
        data["tong_soho_conhatieu_hvs_truocbaocao"] = baocaokytruoc.tong_hopvs
        data["tong_soho_conhatieu_tuhoai_hvs_truocbaocao"] = baocaokytruoc.tong_tuhoai_hvs
        data["tong_soho_conhatieu_thamdoi_hvs_truocbaocao"] = baocaokytruoc.tong_thamdoi_hvs
        data["tong_soho_conhatieu_2ngan_hvs_truocbaocao"] = baocaokytruoc.tong_2ngan_hvs
        data["tong_soho_conhatieu_vip_hvs_truocbaocao"] = baocaokytruoc.tong_ongthonghoi_hvs
        data["tong_soho_conhatieu_caithien_hvs_truocbaocao"] = baocaokytruoc.tong_caithien_hvs
        data["tong_soho_conhatieu_caithien_hongheo_hvs_truocbaocao"] = baocaokytruoc.tong_caithien_hongheo_hvs
        
        nhatieuthon_kytruoc  = baocaokytruoc.nhatieuthonhvs
        nhatieuthon_kyhientai = data["nhatieuthonhvs"]
        tong_soho_conhatieu_hvs_xuongcap = 0
        tong_soho_conhatieu_tuhoai_hvs_xuongcap = 0
        tong_soho_conhatieu_thamdoi_hvs_xuongcap = 0
        tong_soho_conhatieu_2ngan_hvs_xuongcap = 0
        tong_soho_conhatieu_vip_hvs_xuongcap = 0
        tong_soho_conhatieu_caithien_hvs_xuongcap = 0
        tong_soho_conhatieu_caithien_hongheo_hvs_xuongcap = 0
        for nt_truoc in nhatieuthon_kytruoc:
            for nt_sau in nhatieuthon_kyhientai:
                if nt_truoc["maho"] == nt_sau["maho"]:
                    if(nt_truoc["hopvesinh"] == 1 and (nt_sau["hopvesinh"] is None or nt_sau["hopvesinh"] == 0)):
                        tong_soho_conhatieu_hvs_xuongcap += 1
                    
                    if((nt_truoc["tuhoai"] == 1 and nt_truoc["hopvesinh"] == 1) and (nt_sau["tuhoai"] is None or nt_sau["tuhoai"] == 0 or nt_sau["hopvesinh"] is None or nt_sau["hopvesinh"] == 0)):
                        tong_soho_conhatieu_tuhoai_hvs_xuongcap += 1
                    
                    if((nt_truoc["thamdoi"] == 1 and nt_truoc["hopvesinh"] == 1) and (nt_sau["thamdoi"] is None or nt_sau["thamdoi"]== 0  or nt_sau["hopvesinh"] is None or nt_sau["hopvesinh"] == 0)):
                        tong_soho_conhatieu_thamdoi_hvs_xuongcap += 1
                    
                    if((nt_truoc["haingan"] == 1 and nt_truoc["hopvesinh"] == 1) and (nt_sau["haingan"] is None or nt_sau["haingan"] == 0 or nt_sau["hopvesinh"] is None or nt_sau["hopvesinh"] == 0)):
                        tong_soho_conhatieu_2ngan_hvs_xuongcap += 1
                        
                    if((nt_truoc["chimco_oth"] == 1 and nt_truoc["hopvesinh"] == 1 ) and (nt_sau["chimco_oth"] is None or nt_sau["chimco_oth"] == 0 or nt_sau["hopvesinh"] is None or nt_sau["hopvesinh"] == 0)):
                        tong_soho_conhatieu_vip_hvs_xuongcap += 1
                        
                    if((nt_truoc["caithien"] == 1 and nt_truoc["hopvesinh"] == 1) and (nt_sau["caithien"] is None or nt_sau["caithien"] == 0 or nt_sau["hopvesinh"] is None or nt_sau["hopvesinh"] == 0)):
                        tong_soho_conhatieu_caithien_hvs_xuongcap += 1
                        if(nt_truoc["hongheo"] == 1 and nt_sau["hongheo"] == 1):
                            tong_soho_conhatieu_caithien_hongheo_hvs_xuongcap += 1
        tong_soho_conhatieu_hvs_xuongcap = 0
        tong_soho_conhatieu_tuhoai_hvs_xuongcap = 0
        tong_soho_conhatieu_thamdoi_hvs_xuongcap = 0
        tong_soho_conhatieu_2ngan_hvs_xuongcap = 0
        tong_soho_conhatieu_vip_hvs_xuongcap = 0
        tong_soho_conhatieu_caithien_hvs_xuongcap = 0
        tong_soho_conhatieu_caithien_hongheo_hvs_xuongcap = 0                  
        data["tong_soho_conhatieu_hvs_xuongcap"] = tong_soho_conhatieu_hvs_xuongcap
        data["tong_soho_conhatieu_tuhoai_hvs_xuongcap"] = tong_soho_conhatieu_tuhoai_hvs_xuongcap
        data["tong_soho_conhatieu_thamdoi_hvs_xuongcap"] = tong_soho_conhatieu_thamdoi_hvs_xuongcap
        data["tong_soho_conhatieu_2ngan_hvs_xuongcap"] = tong_soho_conhatieu_2ngan_hvs_xuongcap
        data["tong_soho_conhatieu_vip_hvs_xuongcap"] = tong_soho_conhatieu_vip_hvs_xuongcap
        data["tong_soho_conhatieu_caithien_hvs_xuongcap"] = tong_soho_conhatieu_caithien_hvs_xuongcap
        data["tong_soho_conhatieu_caithien_hongheo_hvs_xuongcap"] = tong_soho_conhatieu_caithien_hongheo_hvs_xuongcap

async def process_baocao_vesinh_capXaHuyenTinh(currentuser=None,BaoCao=None, data=None):
    baocaokytruoc = db.session.query(BaoCao).filter(and_(BaoCao.donvi_id == currentuser.donvi_id, BaoCao.id !=data['id'])).order_by(desc(BaoCao.created_at)).first()    
    print("baocaokytruoc",to_dict(baocaokytruoc))
    if baocaokytruoc is not None:
        
        data["tong_soho_conhatieu_truocbaocao"] = (int(baocaokytruoc.tong_soho) - int(baocaokytruoc.tong_khongnhatieu))
        data["tong_soho_conhatieu_hvs_truocbaocao"] = baocaokytruoc.tong_hopvs
        data["tong_soho_conhatieu_tuhoai_hvs_truocbaocao"] = baocaokytruoc.tong_tuhoai_hvs
        data["tong_soho_conhatieu_thamdoi_hvs_truocbaocao"] = baocaokytruoc.tong_thamdoi_hvs
        data["tong_soho_conhatieu_2ngan_hvs_truocbaocao"] = baocaokytruoc.tong_2ngan_hvs
        data["tong_soho_conhatieu_vip_hvs_truocbaocao"] = baocaokytruoc.tong_ongthonghoi_hvs
        data["tong_soho_conhatieu_caithien_hvs_truocbaocao"] = baocaokytruoc.tong_caithien_hvs
        data["tong_soho_conhatieu_caithien_hongheo_hvs_truocbaocao"] = baocaokytruoc.tong_caithien_hongheo_hvs
        
        data["tong_soho_conhatieu_hvs_xuongcap"] = baocaokytruoc.tong_soho_conhatieu_hvs_xuongcap
        data["tong_soho_conhatieu_tuhoai_hvs_xuongcap"] = baocaokytruoc.tong_soho_conhatieu_tuhoai_hvs_xuongcap
        data["tong_soho_conhatieu_thamdoi_hvs_xuongcap"] = baocaokytruoc.tong_soho_conhatieu_thamdoi_hvs_xuongcap
        data["tong_soho_conhatieu_2ngan_hvs_xuongcap"] = baocaokytruoc.tong_soho_conhatieu_2ngan_hvs_xuongcap
        data["tong_soho_conhatieu_vip_hvs_xuongcap"] = baocaokytruoc.tong_soho_conhatieu_vip_hvs_xuongcap
        data["tong_soho_conhatieu_caithien_hvs_xuongcap"] = baocaokytruoc.tong_soho_conhatieu_caithien_hvs_xuongcap
        data["tong_soho_conhatieu_caithien_hongheo_hvs_xuongcap"] = baocaokytruoc.tong_soho_conhatieu_caithien_hongheo_hvs_xuongcap
                
    
async def baocao_prepost_vscapxa(request=None, data=None, Model=None, **kw):
    currentuser = await current_user(request)
    if currentuser is None:
        return json({"error_code":"SESSION_EXPIRED","error_message":"Hết phiên hoạt động, vui lòng đăng nhập lại"}, status=520)
      
    if "xaphuong_id" not in data or data["xaphuong_id"] is None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Chưa chọn thông tin Xã/Phường"}, status=520)
    if "nambaocao" not in data or data["nambaocao"] is None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Chưa chọn năm báo cáo"}, status=520)
    record = db.session.query(VSCapXa).filter(and_(VSCapXa.donvi_id == currentuser.donvi_id,\
                                                      VSCapXa.xaphuong_id == data['xaphuong_id'], \
                                                      VSCapXa.loaikybaocao == data['loaikybaocao'], \
                                                      VSCapXa.kybaocao == data['kybaocao'], \
                                                      VSCapXa.nambaocao == data['nambaocao'])).first()
    
    if record is not None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Báo cáo năm của đơn vị hiện tại đã được tạo, vui lòng kiểm tra lại"}, status=520)
      
    data['tenxa'] = data['xaphuong']['ten']  
    data['tinhtrang'] = TinhTrangBaocaoEnum.taomoi
    data['donvi_id'] = currentuser.donvi_id
    data['nguoibaocao_id'] = currentuser.id
    data['ngaybaocao'] = str(datetime.now())
    await process_baocao_vesinh_capXaHuyenTinh(currentuser,VSCapXa,data)
    
async def baocao_prepost_vscaphuyen(request=None, data=None, Model=None, **kw):
    currentuser = await current_user(request)
    if currentuser is None:
        return json({"error_code":"SESSION_EXPIRED","error_message":"Hết phiên hoạt động, vui lòng đăng nhập lại"}, status=520)
      
    if "quanhuyen_id" not in data or data["quanhuyen_id"] is None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Chưa chọn cấp huyện"}, status=520)
    if "nambaocao" not in data or data["nambaocao"] is None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Chưa chọn năm báo cáo"}, status=520)
    record = db.session.query(VSCapHuyen).filter(and_(VSCapHuyen.donvi_id == currentuser.donvi_id,\
                                                      VSCapHuyen.quanhuyen_id == data['quanhuyen_id'], \
                                                      VSCapHuyen.loaikybaocao == data['loaikybaocao'], \
                                                      VSCapHuyen.kybaocao == data['kybaocao'], \
                                                      VSCapHuyen.nambaocao == data['nambaocao'])).first()
    
    if record is not None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Báo cáo năm hiện tại đã được tạo, vui lòng kiểm tra lại"}, status=520)
    data['tenhuyen'] = data['quanhuyen']['ten']
    data['tinhtrang'] = TinhTrangBaocaoEnum.taomoi
    data['donvi_id'] = currentuser.donvi_id
    data['nguoibaocao_id'] = currentuser.id
    data['ngaybaocao'] = str(datetime.now())
    await process_baocao_vesinh_capXaHuyenTinh(currentuser,VSCapHuyen,data)
    
async def baocao_prepost_vscaptinh(request=None, data=None, Model=None, **kw):
    currentuser = await current_user(request)
    if currentuser is None:
        return json({"error_code":"SESSION_EXPIRED","error_message":"Hết phiên hoạt động, vui lòng đăng nhập lại"}, status=520)
      
    if "tinhthanh_id" not in data or data["tinhthanh_id"] is None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Chưa chọn cấp Tỉnh"}, status=520)
    if "nambaocao" not in data or data["nambaocao"] is None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Chưa chọn năm báo cáo"}, status=520)
    record = db.session.query(VSCapTinh).filter(and_(VSCapTinh.donvi_id == currentuser.donvi_id,\
                                                      VSCapTinh.tinhthanh_id == data['tinhthanh_id'], \
                                                      VSCapTinh.loaikybaocao == data['loaikybaocao'], \
                                                      VSCapTinh.kybaocao == data['kybaocao'], \
                                                      VSCapTinh.nambaocao == data['nambaocao'])).first()
    
    if record is not None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Báo cáo năm hiện tại đã được tạo, vui lòng kiểm tra lại"}, status=520)
    data['tentinh'] = data['tinhthanh']['ten']
    data['tinhtrang'] = TinhTrangBaocaoEnum.taomoi
    data['donvi_id'] = currentuser.donvi_id
    data['nguoibaocao_id'] = currentuser.id
    data['ngaybaocao'] = str(datetime.now())
    await process_baocao_vesinh_capXaHuyenTinh(currentuser,VSCapTinh,data)

async def reponse_capxa_get_single(request=None, Model=None, result=None, **kw):
    currentuser = await current_user(request)
    obj = to_dict(result)
    
#     list_baocao = congdonTongCong(VSCapThon,currentuser, obj['nambaocao'])
#     obj['danhsachbaocao'] = list_baocao
    list_baocao = []
    if (obj['tinhtrang'] == TinhTrangBaocaoEnum.taomoi):
        list_baocao = congdonTongCong(VSCapThon,currentuser, obj)
        obj['danhsachbaocao'] = list_baocao
    result = obj
    
async def reponse_caphuyen_get_single(request=None, Model=None, result=None, **kw):
    currentuser = await current_user(request)
    obj = to_dict(result)
    
#     list_baocao = congdonTongCong(VSCapXa,currentuser, obj['nambaocao'])
#     obj['danhsachbaocao'] = list_baocao
    list_baocao = []
    if (obj['tinhtrang'] == TinhTrangBaocaoEnum.taomoi):
        list_baocao = congdonTongCong(VSCapXa,currentuser, obj)
        obj['danhsachbaocao'] = list_baocao
        
    result = obj
    print(result)
    
async def reponse_captinh_get_single(request=None, Model=None, result=None, **kw):
    currentuser = await current_user(request)
    obj = to_dict(result)
    list_baocao = []
    if (obj['tinhtrang'] == TinhTrangBaocaoEnum.taomoi):
        list_baocao = congdonTongCong(VSCapHuyen,currentuser, obj)
        obj['danhsachbaocao'] = list_baocao
    result = obj
    print(result)
    
async def prepost_duyetvstoanxa(request=None, data=None, Model=None, **kw):
    currentuser = await current_user(request)
    if currentuser is None:
        return json({"error_code":"SESSION_EXPIRED","error_message":"Hết phiên hoạt động, vui lòng đăng nhập lại"}, status=520)
      
    if "xaphuong_id" not in data or data["xaphuong_id"] is None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Chưa chọn thông tin Xã/Phường"}, status=520)
    record = db.session.query(DuyetVeSinhToanXa).filter(and_(DuyetVeSinhToanXa.donvi_id == currentuser.donvi_id,\
                                                      DuyetVeSinhToanXa.xaphuong_id == data['xaphuong_id'])).first()
    
    if record is not None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Xã đã được duyệt, vui lòng chọn xã khác"}, status=520)
      
    data['tinhtrang'] = TinhTrangBaocaoEnum.taomoi
    data['donvi_id'] = currentuser.donvi_id
    data['nguoibaocao_id'] = currentuser.id
    

apimanager.create_api(HoGiaDinh,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[]),
    collection_name='hogiadinh')

apimanager.create_api(VSCapThon,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func,entity_pregetmany], POST=[auth_func, baocao_prepost_vscapthon], PUT_SINGLE=[auth_func, pre_put_vscapthon], DELETE_SINGLE=[auth_func]),
    postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[]),
    collection_name='vscapthon')

# apimanager.create_api(NhaTieuThonHVS,
#     methods=['GET', 'POST', 'DELETE', 'PUT'],
#     url_prefix='/api/v1',
#     preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
#     collection_name='nhatieuthonhvs')

apimanager.create_api(VSCapXa,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func, entity_pregetmany], POST=[auth_func, baocao_prepost_vscapxa], PUT_SINGLE=[auth_func, pre_put_vscapxa], DELETE_SINGLE=[auth_func]),
    postprocess=dict(GET_SINGLE=[reponse_capxa_get_single], PUT_SINGLE=[], DELETE_SINGLE=[]),
    collection_name='vscapxa')


apimanager.create_api(VSCapHuyen,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func, entity_pregetmany], POST=[auth_func, baocao_prepost_vscaphuyen], PUT_SINGLE=[auth_func,pre_put_vscaphuyen], DELETE_SINGLE=[auth_func]),
    postprocess=dict(GET_SINGLE=[reponse_caphuyen_get_single], PUT_SINGLE=[], DELETE_SINGLE=[]),
    collection_name='vscaphuyen')


apimanager.create_api(VSCapTinh,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func, entity_pregetmany], POST=[auth_func, baocao_prepost_vscaptinh], PUT_SINGLE=[auth_func,pre_put_vscaptinh], DELETE_SINGLE=[auth_func]),
    postprocess=dict(GET_SINGLE=[reponse_captinh_get_single], PUT_SINGLE=[], DELETE_SINGLE=[]),
    collection_name='vscaptinh')


apimanager.create_api(TienDoVeSinhToanXa,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    collection_name='tiendovesinhtoanxa')


apimanager.create_api(BaoCaoTienDoDuyTriVSTXBenVung,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    collection_name='baocao_tiendo_duytri_vstx_benvung')

apimanager.create_api(DuyetVeSinhToanXa,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func, prepost_duyetvstoanxa], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    collection_name='duyet_vesinh_toanxa')

