import asyncio
import aiohttp
import hashlib
import ujson
from copy import deepcopy
from application.extensions import apimanager
from application.server import app
from application.database import db
from sqlalchemy.orm import aliased, joinedload_all
from gatco.response import json, text, html

from .helpers import *
from application.models.model_vesinhhogiadinh import *
from application.models.model_danhmuc import *
from application.models.model_truong_tramyte_vesinh_capnuoc import Phieu_DieuTra_Truonghoc_TramYTe_Vesinh_CapNuoc
from sqlalchemy import or_, and_, desc
from application.client import HTTPClient 
from gatco_restapi.helpers import to_dict
from application.models.model_user import TinhTrangBaocaoEnum
from datetime import datetime

@app.route('api/v1/checkSUP', methods=['GET'])
async def check_donvi_thuocSUP(request):
    currentuser = await current_user(request)
    if currentuser is None:
        return json({"error_code":"SESSION_EXPIRED","error_message":"Hết phiên hoạt động, vui lòng đăng nhập lại"}, status=520)
      
    check_SUP = db.session.query(DanhSachDonViThuocSUP)
    if(currentuser.donvi.tuyendonvi_id ==2):
        check_SUP = check_SUP.filter(DanhSachDonViThuocSUP.tinhthanh_id == currentuser.donvi.tinhthanh_id).first()
    elif(currentuser.donvi.tuyendonvi_id ==3):
        check_SUP = check_SUP.filter(DanhSachDonViThuocSUP.quanhuyen_id == currentuser.donvi.quanhuyen_id).first()
    elif(currentuser.donvi.tuyendonvi_id ==4):
        check_SUP = check_SUP.filter(DanhSachDonViThuocSUP.xaphuong_id == currentuser.donvi.xaphuong_id).first()
    else:
        check_SUP = None
    print("check_SUP===",check_SUP)
    if check_SUP is not None:
        return json({"data":True,"error_message":"successful!"}, status=200)
    else:
        return json({"data":False,"error_message":"successful!"}, status=200)

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
        # if tinhthanh_id is None or tinhthanh_id == "undefined" or tinhthanh_id == "":
        #     return json({"error_code":"PARAMS_ERROR", "error_message":"Vui lòng chọn thông tin tỉnh thành!"}, status=520)
        records = db.session.query(VSCapXa).filter(and_(VSCapXa.loaikybaocao == loaikybaocao, \
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
        baocao_all = []
        tong_soho = 0
        tong_khongnhatieu = 0
        tong_hopvs = 0
        tong_tuhoai_hvs =0
        tong_thamdoi_hvs =0
        tong_2ngan_hvs =0
        tong_ongthonghoi_hvs =0
        tong_caithien_hvs = 0
        tong_caithien_hongheo_hvs = 0
        tong_diemruatay = 0
        tentinhthanh = ""
        tenquanhuyen = ""
        tenxaphuong = ""
        data_result_tinhthanh = {}
        for baocao in records:
            if baocao.tinhthanh_id not in data_result_tinhthanh:
                data_result_tinhthanh[baocao.tinhthanh_id] = {}
                
            results = data_result_tinhthanh[baocao.tinhthanh_id]
            print("thongkevesinh===baocao===",to_dict(baocao))   

#             print("thongkevesinh===baocao===",ujson.dumps(ujson.loads(baocao)))   
            results['tentinhthanh'] = baocao.tinhthanh.ten
            results['tenquanhuyen'] = baocao.quanhuyen.ten
            results['tenxaphuong'] = baocao.xaphuong.ten
            if("tong_soho" not in results):
                results["tong_soho"] = 0
            results["tong_soho"] += baocao.tong_soho if baocao.tong_soho is not None else 0
            
            if("tong_khongnhatieu" not in results):
                results["tong_khongnhatieu"] = 0
            results["tong_khongnhatieu"] += baocao.tong_khongnhatieu
            
            if("tong_hopvs" not in results):
                results["tong_hopvs"] = 0
            results["tong_hopvs"] += baocao.tong_hopvs
            if("tong_tuhoai_hvs" not in results):
                results["tong_tuhoai_hvs"] = 0
            results["tong_tuhoai_hvs"] += baocao.tong_tuhoai_hvs
            
            if("tong_thamdoi_hvs" not in results):
                results["tong_thamdoi_hvs"] = 0
            results["tong_thamdoi_hvs"] += baocao.tong_thamdoi_hvs
            if("tong_2ngan_hvs" not in results):
                results["tong_2ngan_hvs"] = 0
            results["tong_2ngan_hvs"] += baocao.tong_2ngan_hvs
            if("tong_ongthonghoi_hvs" not in results):
                results["tong_ongthonghoi_hvs"] = 0
            results["tong_ongthonghoi_hvs"] += baocao.tong_ongthonghoi_hvs
            if("tong_caithien_hvs" not in results):
                results["tong_caithien_hvs"] = 0
            results["tong_caithien_hvs"] += baocao.tong_caithien_hvs
            if("tong_caithien_hongheo_hvs" not in results):
                results["tong_caithien_hongheo_hvs"] = 0
            results["tong_caithien_hongheo_hvs"] += baocao.tong_caithien_hongheo_hvs
            if("tong_diemruatay" not in results):
                results["tong_diemruatay"] = 0
            results["tong_diemruatay"] += baocao.tong_diemruatay
            tong_soho = results["tong_soho"]
            results['tyle_conhatieu'] = 0 if tong_soho == 0 else round(((tong_soho - results["tong_khongnhatieu"])/tong_soho)*100, 2)
            results['tyle_conhatieu_hvs'] = 0 if tong_soho == 0 else round((results["tong_hopvs"]/tong_soho)*100, 2)
            results['tyle_tuhoai_hvs'] =  0 if tong_soho == 0 else round((results["tong_tuhoai_hvs"]/tong_soho)*100, 2)
            results['tyle_thamdoi_hvs'] =  0 if tong_soho == 0 else round((results["tong_thamdoi_hvs"]/tong_soho)*100, 2)
            results['tyle_2ngan_hvs'] =  0 if tong_soho == 0 else round((results["tong_2ngan_hvs"]/tong_soho)*100, 2)
            results['tyle_ongthonghoi_hvs'] =  0 if tong_soho == 0 else round((results["tong_ongthonghoi_hvs"]/tong_soho)*100, 2)
            results['tyle_nhatieu_caithien_hvs'] =  0 if tong_soho == 0 else round((results["tong_caithien_hvs"]/tong_soho)*100, 2)
            results['tyle_caithien_hongheo_hvs'] =  0 if tong_soho == 0 else round((results["tong_caithien_hongheo_hvs"]/tong_soho)*100, 2)
            results['tyle_diemruatay'] =  0 if tong_soho == 0 else round((results["tong_diemruatay"]/tong_soho)*100, 2)
#             results['tentinhthanh'] = tentinhthanh
#             results['tenquanhuyen'] = tenquanhuyen
#             results['tenxaphuong'] = tenxaphuong
            data_result_tinhthanh[baocao.tinhthanh_id]= results
            
        for key, value in data_result_tinhthanh.items():
            baocao_all.append(value)
        if (len(baocao_all) > 0):
            tong_63tinh = {}
            tong_tyle_conhatieu = 0
            tong_tyle_conhatieu_hvs = 0
            tong_tyle_tuhoai_hvs = 0
            tong_tyle_thamdoi_hvs = 0
            tong_tyle_2ngan_hvs = 0
            tong_tyle_ongthonghoi_hvs = 0
            tong_tyle_nhatieu_caithien_hvs = 0
            tong_tyle_caithien_hongheo_hvs = 0
            tong_tyle_diemruatay = 0

            for bctong in baocao_all:
                tong_tyle_conhatieu += (bctong['tyle_conhatieu'])
                tong_63tinh['tyle_conhatieu'] = 0 if tong_tyle_conhatieu == 0 else round((tong_tyle_conhatieu/len(baocao_all)), 2)
                tong_tyle_conhatieu_hvs += (bctong['tyle_conhatieu_hvs'])
                tong_63tinh['tyle_conhatieu_hvs'] = 0 if tong_tyle_conhatieu_hvs == 0 else round((tong_tyle_conhatieu_hvs/len(baocao_all)), 2)
                tong_tyle_tuhoai_hvs += (bctong['tyle_tuhoai_hvs'])
                tong_63tinh['tyle_tuhoai_hvs'] = 0 if tong_tyle_tuhoai_hvs == 0 else round((tong_tyle_tuhoai_hvs/len(baocao_all)), 2)
                tong_tyle_thamdoi_hvs += (bctong['tyle_thamdoi_hvs'])
                tong_63tinh['tyle_thamdoi_hvs'] = 0 if tong_tyle_thamdoi_hvs == 0 else round((tong_tyle_thamdoi_hvs/len(baocao_all)), 2)
                tong_tyle_2ngan_hvs += (bctong['tyle_2ngan_hvs'])
                tong_63tinh['tyle_2ngan_hvs'] = 0 if tong_tyle_2ngan_hvs == 0 else round((tong_tyle_2ngan_hvs/len(baocao_all)), 2)
                tong_tyle_ongthonghoi_hvs += (bctong['tyle_ongthonghoi_hvs'])
                tong_63tinh['tyle_ongthonghoi_hvs'] = 0 if tong_tyle_ongthonghoi_hvs == 0 else round((tong_tyle_ongthonghoi_hvs/len(baocao_all)), 2)
                tong_tyle_nhatieu_caithien_hvs += (bctong['tyle_nhatieu_caithien_hvs'])
                tong_63tinh['tyle_nhatieu_caithien_hvs'] = 0 if tong_tyle_nhatieu_caithien_hvs == 0 else round((tong_tyle_nhatieu_caithien_hvs/len(baocao_all)), 2)
                tong_tyle_caithien_hongheo_hvs += (bctong['tyle_caithien_hongheo_hvs'])
                tong_63tinh['tyle_caithien_hongheo_hvs'] = 0 if tong_tyle_caithien_hongheo_hvs == 0 else round((tong_tyle_caithien_hongheo_hvs/len(baocao_all)), 2)
                tong_tyle_diemruatay += (bctong['tyle_diemruatay'])
                tong_63tinh['tyle_diemruatay'] = 0 if tong_tyle_diemruatay == 0 else round((tong_tyle_diemruatay/len(baocao_all)), 2)
            tong_63tinh['tentinhthanh'] = "Tổng"
            tong_63tinh['tenquanhuyen'] = ""
            tong_63tinh['tenxaphuong'] = ""
                
                    
            baocao_all.append(tong_63tinh)

            return json(baocao_all)
        else:
            return json({"error_code":"PARAMS_ERROR", "error_message":"Không tìm thấy báo cáo của các đơn vị, vui lòng kiểm tra lại"}, status=520)
        

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
        if tinhthanh_id is None or tinhthanh_id == "undefined" or tinhthanh_id == "":
            return json({"error_code":"PARAMS_ERROR", "error_message":"Vui lòng chọn thông tin tỉnh thành!"}, status=520)

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
            bcxa['tyle_nhatieu_caithien'] = round((baocao.tong_caithien/baocao.tong_soho)*100, 2) if (baocao.tong_soho is not None and baocao.tong_soho >0) else 0
            bcxa['tyle_diemruatay'] = round((baocao.tong_diemruatay/baocao.tong_soho)*100, 2)  if (baocao.tong_soho is not None and baocao.tong_soho >0) else 0
            bcxa['tong_soho'] = baocao.tong_soho
            bcxa['tong_danso'] = baocao.tong_danso
            bcxa['tong_chuholanu'] = baocao.tong_chuholanu
            bcxa['tong_sohodtts'] = baocao.tong_sohodtts
            bcxa['tyle_chuholanu'] = round((baocao.tong_chuholanu/baocao.tong_soho)*100, 2)  if (baocao.tong_soho is not None and baocao.tong_soho >0) else 0
            bcxa['tyle_hodtts'] = round((baocao.tong_sohodtts/baocao.tong_soho)*100, 2) if (baocao.tong_soho is not None and baocao.tong_soho >0) else 0

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
                    bcxa['tyle_truong_hvs']= round((tongso_truong_hvs/tongso_truong)*100, 2)
                else:
                    bcxa['tyle_truong_hvs'] = 0
                if tongso_tramyte >0:
                    bcxa['tyle_tramyte_hvs']= round((tongso_tramyte_hvs/tongso_tramyte)*100, 2)
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
        if tinhthanh_id is None or tinhthanh_id == "undefined" or tinhthanh_id == "":
            return json({"error_code":"PARAMS_ERROR", "error_message":"Vui lòng chọn thông tin tỉnh thành!"}, status=520)

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
                    bcxa['tyle_truong_hvs']= round((tongso_truong_hvs/tongso_truong)*100, 2)
                else:
                    bcxa['tyle_truong_hvs'] = 0
                if tongso_tramyte >0:
                    bcxa['tyle_tramyte_hvs']= round((tongso_tramyte_hvs/tongso_tramyte)*100, 2)
                else:
                    bcxa['tyle_tramyte_hvs'] = 0
            results.append(bcxa)
        return json(results)

@app.route('api/v1/timkiembaocao_vesinh', methods=['GET'])
async def TimKiemBaoCaoVeSinh(request):
    nambaocao = request.args.get("nambaocao", None)
    loaikybaocao = request.args.get("loaikybaocao", None)
    kybaocao = request.args.get("kybaocao", None)
    xaphuong_id = request.args.get("xaphuong_id", None)
    
    currentuser = await current_user(request)
    if currentuser is None:
        return json({"error_code":"SESSION_EXPIRED","error_message":"Hết phiên hoạt động, vui lòng đăng nhập lại!"}, status=520)
      
    if "loaikybaocao" is None or "kybaocao" is None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Kỳ báo cáo không hợp lệ!"}, status=520)
    if "nambaocao" is None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Chưa chọn năm báo cáo!"}, status=520)
    records = None
    response = []
    if loaikybaocao is not None and kybaocao is not None and nambaocao is not None and xaphuong_id is not None:
        records = db.session.query(VSCapXa).filter(and_(VSCapXa.nambaocao == nambaocao, \
                                                        VSCapXa.loaikybaocao == loaikybaocao, \
                                                        VSCapXa.kybaocao == kybaocao, \
                                                        VSCapXa.xaphuong_id == xaphuong_id)).first()
        print("vesinhhogiadinh.TimKiemBaoCaoVeSinh.data recordsss", records)
    response = to_dict(records)
    if response is not None:
        return json(response)
    else:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Không tìm thấy báo cáo của đơn vị!"}, status=520)
   

def congdonTongCong(Baocao, current_user, data=None):
    notdict = ['_created_at','_updated_at','_deleted','_deleted_at','_etag','id','donvi_id',\
               'nambaocao','kybaocao','mabaocao','nguoibaocao_id','thoigianbaocao','tinhtrang']
    
    curdonvi_id = current_user.donvi_id
    baocaos = db.session.query(Baocao, DonVi).\
            filter(Baocao.donvi_id == DonVi.id).\
            filter(or_(DonVi.captren_id == data['donvi_id'], Baocao.donvi_id == data['donvi_id'])).\
            filter(Baocao.loaikybaocao == data['loaikybaocao']).\
            filter(Baocao.kybaocao == data['kybaocao']).\
            filter(Baocao.nambaocao == data['nambaocao']).all()
    
    resp = []
    for baocao, donvi in baocaos:
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
    
async def pre_put_vscapthon(request=None, data=None, Model=None, **kw):
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
                                                      
    # if record is None:
    #     return json({"error_code":"PARAMS_ERROR", "error_message":"Báo cáo của đơn vị không tồn tại, vui lòng kiểm tra lại"}, status=520)
    if (record is not None and str(record.id) != data['id']):
        return json({"error_code":"PARAMS_ERROR", "error_message":"Báo cáo của đơn vị đã tồn tại, vui lòng kiểm tra lại"}, status=520)
    
    data['tenthon'] = data['thonxom']['ten']
    data['nguoibaocao_id'] = currentuser.id
    data['ngaybaocao'] = str(datetime.now())
    await process_baocao_vesinh_capthon(currentuser,data)
    
async def pre_put_vscapxa(request=None, instance_id=None, data=None, **kw):
    currentuser = await current_user(request)
    if currentuser is None:
        return json({"error_code":"SESSION_EXPIRED","error_message":"Hết phiên hoạt động, vui lòng đăng nhập lại"}, status=520)
    
    if "xaphuong_id" not in data or data["xaphuong_id"] is None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Chưa chọn xã/phường"}, status=520)
    if "nambaocao" not in data or data["nambaocao"] is None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Chưa chọn năm báo cáo"}, status=520)
    
    record = db.session.query(VSCapXa).filter(and_(VSCapXa.donvi_id == currentuser.donvi_id,\
                                                      VSCapXa.xaphuong_id == data['xaphuong_id'], \
                                                      VSCapXa.loaikybaocao == data['loaikybaocao'], \
                                                      VSCapXa.kybaocao == data['kybaocao'], \
                                                      VSCapXa.nambaocao == data['nambaocao'])).first()
                                                      
    if (record is not None and str(record.id) != data['id']):
        return json({"error_code":"PARAMS_ERROR", "error_message":"Kỳ báo cáo của đơn vị đã tồn tại, vui lòng kiểm tra lại"}, status=520)
    
    
    list_baocao = congdonTongCong(VSCapThon,currentuser, data)
    data['danhsachbaocao'] = list_baocao
    await process_baocao_vesinh_capXaHuyenTinh(currentuser,VSCapXa,data)
    
async def pre_put_vscaphuyen(request=None, instance_id=None, data=None, **kw):
    currentuser = await current_user(request)
    if currentuser is None:
        return json({"error_code":"SESSION_EXPIRED","error_message":"Hết phiên hoạt động, vui lòng đăng nhập lại"}, status=520)
    if "quanhuyen_id" not in data or data["quanhuyen_id"] is None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Chưa chọn quận/huyện"}, status=520)
    if "nambaocao" not in data or data["nambaocao"] is None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Chưa chọn năm báo cáo"}, status=520)
    
    record = db.session.query(VSCapHuyen).filter(and_(VSCapHuyen.donvi_id == currentuser.donvi_id,\
                                                      VSCapHuyen.quanhuyen_id == data['quanhuyen_id'], \
                                                      VSCapHuyen.loaikybaocao == data['loaikybaocao'], \
                                                      VSCapHuyen.kybaocao == data['kybaocao'], \
                                                      VSCapHuyen.nambaocao == data['nambaocao'])).first()
                                                      
    if (record is not None and str(record.id) != data['id']):
        return json({"error_code":"PARAMS_ERROR", "error_message":"Kỳ báo cáo của đơn vị đã tồn tại, vui lòng kiểm tra lại"}, status=520)
    
    
    list_baocao = congdonTongCong(VSCapXa,currentuser, data)
    data['danhsachbaocao'] = list_baocao
    await process_baocao_vesinh_capXaHuyenTinh(currentuser,VSCapHuyen,data)

async def pre_put_vscaptinh(request=None, instance_id=None, data=None, **kw):
    currentuser = await current_user(request)
    if currentuser is None:
        return json({"error_code":"SESSION_EXPIRED","error_message":"Hết phiên hoạt động, vui lòng đăng nhập lại"}, status=520)
    
    if "tinhthanh_id" not in data or data["tinhthanh_id"] is None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Chưa chọn tỉnh/thành phố"}, status=520)
    if "nambaocao" not in data or data["nambaocao"] is None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Chưa chọn năm báo cáo"}, status=520)
    
    record = db.session.query(VSCapTinh).filter(and_(VSCapTinh.donvi_id == currentuser.donvi_id,\
                                                      VSCapTinh.tinhthanh_id == data['tinhthanh_id'], \
                                                      VSCapTinh.loaikybaocao == data['loaikybaocao'], \
                                                      VSCapTinh.kybaocao == data['kybaocao'], \
                                                      VSCapTinh.nambaocao == data['nambaocao'])).first()
                                                      
    if (record is not None and str(record.id) != data['id']):
        return json({"error_code":"PARAMS_ERROR", "error_message":"Kỳ báo cáo của đơn vị đã tồn tại, vui lòng kiểm tra lại"}, status=520)
    
    list_baocao = congdonTongCong(VSCapHuyen,currentuser, data)
    data['danhsachbaocao'] = list_baocao
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
                                                      BaoCao.thonxom_id == data['thonxom_id'], \
                                                      BaoCao.loaikybaocao == data['loaikybaocao'], \
                                                      BaoCao.kybaocao == kybaocaotruoc, \
                                                      BaoCao.nambaocao == nambaocao_truoc)).first()    
    
    if baocaokytruoc is not None:
        if baocaokytruoc.tong_soho is None:
            baocaokytruoc.tong_soho = 0
        if baocaokytruoc.tong_khongnhatieu is None:
            baocaokytruoc.tong_khongnhatieu = 0
        data["tong_soho_conhatieu_truocbaocao"] = baocaokytruoc.tong_soho_conhatieu if baocaokytruoc.tong_soho_conhatieu is not None else 0
        data["tong_soho_conhatieu_hvs_truocbaocao"] = baocaokytruoc.tong_hopvs if baocaokytruoc.tong_hopvs is not None else 0
        
        data["tong_soho_conhatieu_tuhoai_hvs_truocbaocao"] = baocaokytruoc.tong_tuhoai_hvs if baocaokytruoc.tong_tuhoai_hvs is not None else 0
        data["tong_soho_conhatieu_thamdoi_hvs_truocbaocao"] = baocaokytruoc.tong_thamdoi_hvs  if baocaokytruoc.tong_thamdoi_hvs is not None else 0
        data["tong_soho_conhatieu_2ngan_hvs_truocbaocao"] = baocaokytruoc.tong_2ngan_hvs if baocaokytruoc.tong_2ngan_hvs is not None else 0
        data["tong_soho_conhatieu_vip_hvs_truocbaocao"] = baocaokytruoc.tong_ongthonghoi_hvs if baocaokytruoc.tong_ongthonghoi_hvs is not None else 0
        data["tong_soho_conhatieu_caithien_hvs_truocbaocao"] = baocaokytruoc.tong_caithien_hvs if baocaokytruoc.tong_caithien_hvs is not None else 0
        data["tong_soho_conhatieu_caithien_hongheo_hvs_truocbaocao"] = baocaokytruoc.tong_caithien_hongheo_hvs if baocaokytruoc.tong_caithien_hongheo_hvs is not None else 0
        
                
    tong_tuhoai_hvs = data["tong_tuhoai_hvs"] if data["tong_tuhoai_hvs"] is not None else 0
    tong_thamdoi_hvs = data["tong_thamdoi_hvs"] if data["tong_thamdoi_hvs"] is not None else 0
    tong_2ngan_hvs = data["tong_2ngan_hvs"] if data["tong_2ngan_hvs"] is not None else 0
    tong_ongthonghoi_hvs = data["tong_ongthonghoi_hvs"] if data["tong_ongthonghoi_hvs"] is not None else 0
    tong_loaikhac_hvs = data["tong_loaikhac_hvs"] if data["tong_loaikhac_hvs"] is not None else 0

    tong_hopvs = data["tong_hopvs"] if data["tong_hopvs"] is not None else 0
#     tong_hopvs = int(tong_tuhoai_hvs)+int(tong_thamdoi_hvs)+int(tong_2ngan_hvs)+int(tong_ongthonghoi_hvs)+(tong_loaikhac_hvs)
    tong_khonghopvs = int(data['tong_soho_conhatieu']) - int(tong_hopvs)
    if tong_khonghopvs <0:
        tong_khonghopvs = 0
    tong_caithien_hvs = int(data['tong_caithien']) if data['tong_caithien'] is not None else 0
    tong_caithien_hongheo_hvs = int(data['tong_caithien_hongheo']) if data['tong_caithien_hongheo'] is not None else 0
    
    data['tong_hopvs'] = tong_hopvs
    data['tong_khonghopvs'] = tong_khonghopvs
    data['tong_caithien_hvs'] = tong_caithien_hvs
    data['tong_caithien_hongheo_hvs'] = tong_caithien_hongheo_hvs

async def process_baocao_vesinh_capXaHuyenTinh(currentuser=None,BaoCao=None, data=None):
    if data is not None and "danhsachbaocao" in data and data['danhsachbaocao'] is not None and len(data['danhsachbaocao'])>0:
        total_chuholanu = 0
        total_sohongheo = 0
        total_dtts = 0
        total_soNam = 0
        total_soNu = 0
        total_danso = 0
        total_soho = 0
        tong_tuhoai = 0
        tong_tuhoai_hvs = 0
        tong_tuhoai_xaymoi = 0
        tong_soho_conhatieu_tuhoai_hvs_xuongcap = 0
        tong_sothon = 0
        tong_soxa = 0
        tong_sohuyen = 0
        
        
        tong_thamdoi = 0
        tong_thamdoi_hvs = 0
        tong_thamdoi_xaymoi = 0
        tong_soho_conhatieu_thamdoi_hvs_xuongcap = 0
        
        tong_2ngan = 0
        tong_2ngan_hvs = 0
        tong_2ngan_xaymoi = 0
        tong_soho_conhatieu_2ngan_hvs_xuongcap = 0
        
        tong_ongthonghoi = 0
        tong_ongthonghoi_hvs = 0
        tong_ongthonghoi_xaymoi = 0
        tong_soho_conhatieu_vip_hvs_xuongcap = 0
        
        tong_loaikhac = 0
        tong_loaikhac_hvs = 0
        
        tong_soho_conhatieu = 0
        tong_khongnhatieu = 0
        tong_hopvs = 0
        tong_khonghopvs = 0
        tong_soho_conhatieu_xaymoi = 0
        tong_soho_conhatieu_hvs_xuongcap = 0
        
        tong_caithien = 0
        tong_caithien_hvs = 0
        tong_caithien_hongheo = 0
        tong_caithien_hongheo_hvs = 0
        tong_soho_conhatieu_caithien_hvs_xuongcap = 0
        tong_soho_conhatieu_caithien_hongheo_hvs_xuongcap = 0
        
        
    
        tong_diemruatay = 0
        for bc in data['danhsachbaocao']:
            total_chuholanu += int(bc['tong_chuholanu']) if bc['tong_chuholanu'] is not None else 0
            total_sohongheo += int(bc['tong_sohongheo']) if bc['tong_sohongheo'] is not None else 0
            total_dtts += int(bc['tong_sohodtts']) if bc['tong_sohodtts'] is not None else 0
            total_soNam += int(bc['tong_nam']) if bc['tong_nam'] is not None else 0
            total_soNu += int(bc['tong_nu']) if bc['tong_nu'] is not None else 0
            total_soho += int(bc['tong_soho']) if bc['tong_soho'] is not None else 0
            total_danso += int(bc['tong_danso']) if bc['tong_danso'] is not None else 0
            if "tong_sothon" in bc:
                tong_sothon += int(bc['tong_sothon']) if bc['tong_sothon'] is not None else 0
            if "tong_soxa" in bc:
                tong_soxa += int(bc['tong_soxa']) if bc['tong_soxa'] is not None else 0
            if "tong_sohuyen" in bc:
                tong_sohuyen += int(bc['tong_sohuyen']) if bc['tong_sohuyen'] is not None else 0

            
            tong_tuhoai = tong_tuhoai + int(bc['tong_tuhoai']) if bc['tong_tuhoai'] is not None else 0
            tong_tuhoai_hvs = tong_tuhoai_hvs + int(bc['tong_tuhoai_hvs']) if bc['tong_tuhoai_hvs'] is not None else 0
            tong_tuhoai_xaymoi = tong_tuhoai_xaymoi + int(bc['tong_tuhoai_xaymoi']) if bc['tong_tuhoai_xaymoi'] is not None else 0
            tong_soho_conhatieu_tuhoai_hvs_xuongcap = tong_soho_conhatieu_tuhoai_hvs_xuongcap + int(bc['tong_soho_conhatieu_tuhoai_hvs_xuongcap']) if bc['tong_soho_conhatieu_tuhoai_hvs_xuongcap'] is not None else 0
    
    
            tong_thamdoi = tong_thamdoi + int(bc['tong_thamdoi']) if bc['tong_thamdoi'] is not None else 0
            tong_thamdoi_hvs = tong_thamdoi_hvs + int(bc['tong_thamdoi_hvs']) if bc['tong_thamdoi_hvs'] is not None else 0
            tong_thamdoi_xaymoi = tong_thamdoi_xaymoi + int(bc['tong_thamdoi_xaymoi']) if bc['tong_thamdoi_xaymoi'] is not None else 0
            tong_soho_conhatieu_thamdoi_hvs_xuongcap = tong_soho_conhatieu_thamdoi_hvs_xuongcap + int(bc['tong_soho_conhatieu_thamdoi_hvs_xuongcap']) if bc['tong_soho_conhatieu_thamdoi_hvs_xuongcap'] is not None else 0
    
            tong_2ngan = tong_2ngan + int(bc['tong_2ngan']) if bc['tong_2ngan'] is not None else 0
            tong_2ngan_hvs = tong_2ngan_hvs + int(bc['tong_2ngan_hvs']) if bc['tong_2ngan_hvs'] is not None else 0
            tong_2ngan_xaymoi = tong_2ngan_xaymoi + int(bc['tong_2ngan_xaymoi']) if bc['tong_2ngan_xaymoi'] is not None else 0
            tong_soho_conhatieu_2ngan_hvs_xuongcap = tong_soho_conhatieu_2ngan_hvs_xuongcap + int(bc['tong_soho_conhatieu_2ngan_hvs_xuongcap']) if bc['tong_soho_conhatieu_2ngan_hvs_xuongcap'] is not None else 0
    
            tong_ongthonghoi = tong_ongthonghoi + int(bc['tong_ongthonghoi']) if bc['tong_ongthonghoi'] is not None else 0
            tong_ongthonghoi_hvs = tong_ongthonghoi_hvs + int(bc['tong_ongthonghoi_hvs']) if bc['tong_ongthonghoi_hvs'] is not None else 0
            tong_ongthonghoi_xaymoi = tong_ongthonghoi_xaymoi + int(bc['tong_ongthonghoi_xaymoi']) if bc['tong_ongthonghoi_xaymoi'] is not None else 0
            tong_soho_conhatieu_vip_hvs_xuongcap = tong_soho_conhatieu_vip_hvs_xuongcap + int(bc['tong_soho_conhatieu_vip_hvs_xuongcap']) if bc['tong_soho_conhatieu_vip_hvs_xuongcap'] is not None else 0
    
            tong_loaikhac = tong_loaikhac + int(bc['tong_loaikhac']) if bc['tong_loaikhac'] is not None else 0
            tong_loaikhac_hvs = tong_loaikhac_hvs + int(bc['tong_loaikhac_hvs']) if bc['tong_loaikhac_hvs'] is not None else 0
    
            tong_soho_conhatieu = tong_soho_conhatieu + int(bc['tong_soho_conhatieu']) if bc['tong_soho_conhatieu'] is not None else 0
            tong_khongnhatieu = tong_khongnhatieu + int(bc['tong_khongnhatieu']) if bc['tong_khongnhatieu'] is not None else 0
            tong_hopvs = tong_hopvs + int(bc['tong_hopvs']) if bc['tong_hopvs'] is not None else 0
            tong_khonghopvs = tong_khonghopvs + int(bc['tong_khonghopvs']) if bc['tong_khonghopvs'] is not None else 0
            tong_soho_conhatieu_xaymoi = tong_soho_conhatieu_xaymoi + int(bc['tong_soho_conhatieu_xaymoi']) if bc['tong_soho_conhatieu_xaymoi'] is not None else 0
            tong_soho_conhatieu_hvs_xuongcap = tong_soho_conhatieu_hvs_xuongcap + int(bc['tong_soho_conhatieu_hvs_xuongcap']) if bc['tong_soho_conhatieu_hvs_xuongcap'] is not None else 0
    
            
            tong_caithien = tong_caithien + int(bc['tong_caithien']) if bc['tong_caithien'] is not None else 0
            tong_caithien_hvs = tong_caithien_hvs + int(bc['tong_caithien_hvs']) if bc['tong_caithien_hvs'] is not None else 0
            tong_caithien_hongheo = tong_caithien_hongheo + int(bc['tong_caithien_hongheo']) if bc['tong_caithien_hongheo'] is not None else 0
            tong_caithien_hongheo_hvs = tong_caithien_hongheo_hvs + int(bc['tong_caithien_hongheo_hvs']) if bc['tong_caithien_hongheo_hvs'] is not None else 0
            tong_soho_conhatieu_caithien_hvs_xuongcap = tong_soho_conhatieu_caithien_hvs_xuongcap + int(bc['tong_soho_conhatieu_caithien_hvs_xuongcap']) if bc['tong_soho_conhatieu_caithien_hvs_xuongcap'] is not None else 0
            tong_soho_conhatieu_caithien_hongheo_hvs_xuongcap = tong_soho_conhatieu_caithien_hongheo_hvs_xuongcap + int(bc['tong_soho_conhatieu_caithien_hongheo_hvs_xuongcap']) if bc['tong_soho_conhatieu_caithien_hongheo_hvs_xuongcap'] is not None else 0
    
            tong_diemruatay = tong_diemruatay + (int(bc['tong_diemruatay']) if bc['tong_diemruatay'] is not None else 0)
    
        tong_chuholanu = total_chuholanu
        tong_sohongheo = total_sohongheo
        tong_sohodtts = total_dtts
        tong_nam = total_soNam
        tong_nu = total_soNu
        tong_danso = total_danso
        tong_soho = total_soho
        data['tong_sothon'] = tong_sothon
        if currentuser.donvi.tuyendonvi_id ==2:
            tong_sohuyen = db.session.query(QuanHuyen).filter(QuanHuyen.tinhthanh_id == data["tinhthanh_id"]).count()
            if tong_sohuyen is None:
                tong_sohuyen = 0
            tong_soxa = db.session.query(QuanHuyen,XaPhuong).filter(QuanHuyen.id==XaPhuong.quanhuyen_id).filter(QuanHuyen.tinhthanh_id == data["tinhthanh_id"]).count()
            if tong_soxa is None:
                tong_soxa = 0
            tong_sothon = db.session.query(QuanHuyen,XaPhuong,ThonXom).filter(QuanHuyen.id==XaPhuong.quanhuyen_id).filter(XaPhuong.id==ThonXom.xaphuong_id).filter(QuanHuyen.tinhthanh_id == data["tinhthanh_id"]).count()
            if tong_sothon is None:
                tong_sothon = 0
            data['tong_sohuyen'] = tong_sohuyen
            data['tong_soxa'] = tong_soxa
            data['tong_sothon'] = tong_sothon
        elif currentuser.donvi.tuyendonvi_id ==3:
            tong_soxa = db.session.query(XaPhuong).filter(XaPhuong.quanhuyen_id == data["quanhuyen_id"]).count()
            if tong_soxa is None:
                tong_soxa = 0
            tong_sothon = db.session.query(XaPhuong,ThonXom).filter(XaPhuong.id==ThonXom.xaphuong_id).filter(XaPhuong.quanhuyen_id == data["quanhuyen_id"]).count()
            if tong_sothon is None:
                tong_sothon = 0
            data['tong_soxa'] = tong_soxa
            data['tong_sothon'] = tong_sothon
        elif currentuser.donvi.tuyendonvi_id ==4:
            tong_sothon = db.session.query(ThonXom).filter(ThonXom.xaphuong_id == data["xaphuong_id"]).count()
            if tong_sothon is None:
                tong_sothon = 0
            data['tong_sothon'] = tong_sothon
        data["tong_soho"] = tong_soho
        data["tong_danso"] = tong_danso
        data["tong_nu"] = tong_nu
        data["tong_nam"] = tong_nam
        data["tong_sohodtts"] = tong_sohodtts
        data["tong_sohongheo"] = tong_sohongheo
        data["tong_chuholanu"] = tong_chuholanu
        data["tong_diemruatay"] = tong_diemruatay
        data["tong_caithien_hongheo_hvs"] = tong_caithien_hongheo_hvs
        data["tong_soho_conhatieu_caithien_hongheo_hvs_xuongcap"] = tong_soho_conhatieu_caithien_hongheo_hvs_xuongcap
        data["tong_soho_conhatieu_caithien_hvs_xuongcap"] = tong_soho_conhatieu_caithien_hvs_xuongcap
        data["tong_caithien_hongheo"] = tong_caithien_hongheo
        data["tong_caithien_hvs"] = tong_caithien_hvs
        data["tong_caithien"] = tong_caithien
        data["tong_soho_conhatieu_hvs_xuongcap"] = tong_soho_conhatieu_hvs_xuongcap
        data["tong_soho_conhatieu_xaymoi"] = tong_soho_conhatieu_xaymoi
        data["tong_khonghopvs"] = tong_khonghopvs
        data["tong_hopvs"] = tong_hopvs
        data["tong_soho_conhatieu"] = tong_soho_conhatieu
        data["tong_khongnhatieu"] = tong_khongnhatieu
        data["tong_loaikhac_hvs"] = tong_loaikhac_hvs
        data["tong_loaikhac"] = tong_loaikhac
        data["tong_soho_conhatieu_vip_hvs_xuongcap"] = tong_soho_conhatieu_vip_hvs_xuongcap
        data["tong_ongthonghoi_xaymoi"] = tong_ongthonghoi_xaymoi
        data["tong_ongthonghoi_hvs"] = tong_ongthonghoi_hvs
        data["tong_ongthonghoi"] = tong_ongthonghoi
        data["tong_soho_conhatieu_2ngan_hvs_xuongcap"] = tong_soho_conhatieu_2ngan_hvs_xuongcap
        data["tong_2ngan_xaymoi"] = tong_2ngan_xaymoi
        data["tong_2ngan_hvs"] = tong_2ngan_hvs
        data["tong_2ngan"] = tong_2ngan
        data["tong_soho_conhatieu_thamdoi_hvs_xuongcap"] = tong_soho_conhatieu_thamdoi_hvs_xuongcap
        data["tong_thamdoi_xaymoi"] = tong_thamdoi_xaymoi
        data["tong_thamdoi_hvs"] = tong_thamdoi_hvs
        data["tong_thamdoi"] = tong_thamdoi
        data["tong_soho_conhatieu_tuhoai_hvs_xuongcap"] = tong_soho_conhatieu_tuhoai_hvs_xuongcap
        data["tong_tuhoai_xaymoi"] = tong_tuhoai_xaymoi
        data["tong_tuhoai_hvs"] = tong_tuhoai_hvs
        data["tong_tuhoai"] = tong_tuhoai
    
    
    baocaokytruoc = db.session.query(BaoCao).filter(and_(BaoCao.donvi_id == currentuser.donvi_id, BaoCao.id !=data['id'])).order_by(desc(BaoCao.created_at)).first()    
    if baocaokytruoc is not None:
        if baocaokytruoc.tong_soho is None:
            baocaokytruoc.tong_soho = 0
        if baocaokytruoc.tong_khongnhatieu is None:
            baocaokytruoc.tong_khongnhatieu = 0
        data["tong_soho_conhatieu_truocbaocao"] = baocaokytruoc.tong_soho_conhatieu if baocaokytruoc.tong_soho_conhatieu is not None else 0
        data["tong_soho_conhatieu_hvs_truocbaocao"] = baocaokytruoc.tong_hopvs if baocaokytruoc.tong_hopvs is not None else 0
        data["tong_soho_conhatieu_tuhoai_hvs_truocbaocao"] = baocaokytruoc.tong_tuhoai_hvs if baocaokytruoc.tong_tuhoai_hvs is not None else 0
        data["tong_soho_conhatieu_thamdoi_hvs_truocbaocao"] = baocaokytruoc.tong_thamdoi_hvs  if baocaokytruoc.tong_thamdoi_hvs is not None else 0
        data["tong_soho_conhatieu_2ngan_hvs_truocbaocao"] = baocaokytruoc.tong_2ngan_hvs if baocaokytruoc.tong_2ngan_hvs is not None else 0
        data["tong_soho_conhatieu_vip_hvs_truocbaocao"] = baocaokytruoc.tong_ongthonghoi_hvs if baocaokytruoc.tong_ongthonghoi_hvs is not None else 0
        data["tong_soho_conhatieu_caithien_hvs_truocbaocao"] = baocaokytruoc.tong_caithien_hvs if baocaokytruoc.tong_caithien_hvs is not None else 0
        data["tong_soho_conhatieu_caithien_hongheo_hvs_truocbaocao"] = baocaokytruoc.tong_caithien_hongheo_hvs if baocaokytruoc.tong_caithien_hongheo_hvs is not None else 0
        
#         data["tong_soho_conhatieu_hvs_xuongcap"] = baocaokytruoc.tong_soho_conhatieu_hvs_xuongcap if baocaokytruoc.tong_soho_conhatieu_hvs_xuongcap is not None else 0
#         data["tong_soho_conhatieu_tuhoai_hvs_xuongcap"] = baocaokytruoc.tong_soho_conhatieu_tuhoai_hvs_xuongcap if baocaokytruoc.tong_soho_conhatieu_tuhoai_hvs_xuongcap is not None else 0
#         data["tong_soho_conhatieu_thamdoi_hvs_xuongcap"] = baocaokytruoc.tong_soho_conhatieu_thamdoi_hvs_xuongcap if baocaokytruoc.tong_soho_conhatieu_thamdoi_hvs_xuongcap is not None else 0
#         data["tong_soho_conhatieu_2ngan_hvs_xuongcap"] = baocaokytruoc.tong_soho_conhatieu_2ngan_hvs_xuongcap if baocaokytruoc.tong_soho_conhatieu_2ngan_hvs_xuongcap is not None else 0
#         data["tong_soho_conhatieu_vip_hvs_xuongcap"] = baocaokytruoc.tong_soho_conhatieu_vip_hvs_xuongcap if baocaokytruoc.tong_soho_conhatieu_vip_hvs_xuongcap is not None else 0
#         data["tong_soho_conhatieu_caithien_hvs_xuongcap"] = baocaokytruoc.tong_soho_conhatieu_caithien_hvs_xuongcap if baocaokytruoc.tong_soho_conhatieu_caithien_hvs_xuongcap is not None else 0
#         data["tong_soho_conhatieu_caithien_hongheo_hvs_xuongcap"] = baocaokytruoc.tong_soho_conhatieu_caithien_hongheo_hvs_xuongcap if baocaokytruoc.tong_soho_conhatieu_caithien_hongheo_hvs_xuongcap is not None else 0
    
    
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
    list_baocao = congdonTongCong(VSCapThon,currentuser, data)
    data['danhsachbaocao'] = list_baocao
    await process_baocao_vesinh_capXaHuyenTinh(currentuser,VSCapXa,data)
    tong_sothon = len(data['danhsachbaocao'])
    data["tong_sothon"] = tong_sothon
    
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
    list_baocao = congdonTongCong(VSCapXa,currentuser, data)
    data['danhsachbaocao'] = list_baocao
    await process_baocao_vesinh_capXaHuyenTinh(currentuser,VSCapHuyen,data)
    tong_soxa = len(data['danhsachbaocao'])
    data["tong_soxa"] = tong_soxa
    
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
    list_baocao = congdonTongCong(VSCapHuyen,currentuser, data)
    data['danhsachbaocao'] = list_baocao
    await process_baocao_vesinh_capXaHuyenTinh(currentuser,VSCapTinh,data)
    tong_sohuyen = len(data['danhsachbaocao'])
    data["tong_sohuyen"] = tong_sohuyen
    
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
    
async def reponse_captinh_get_single(request=None, Model=None, result=None, **kw):
    currentuser = await current_user(request)
    obj = to_dict(result)
    list_baocao = []
    if (obj['tinhtrang'] == TinhTrangBaocaoEnum.taomoi):
        list_baocao = congdonTongCong(VSCapHuyen,currentuser, obj)
        obj['danhsachbaocao'] = list_baocao
    result = obj
    
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
    
async def postprocess_stt_danhmuc(request=None, Model=None, result=None, **kw):
    if result is not None and "objects" in result:
        objects = to_dict(result["objects"])
        datas = []
        i =1
        page = request.args.get("page",None)
        results_per_page = request.args.get("results_per_page",None)
        if page is not None and results_per_page is not None and int(page) != 1:
            i = i + int(results_per_page)*int(page)
        for obj in objects:
            if obj is not None:
                obj_tmp = to_dict(obj)
                obj_tmp["stt"] = i
                i = i +1
                datas.append(obj_tmp)
        result = datas

async def prepost_put_hogiadinh(request=None, data=None, Model=None, **kw):
    if "stt" in data:
        del data['stt']
    objects_danhmuc = ['dantoc','thonxom', 'xaphuong', 'quocgia', 'tinhthanh', 'quanhuyen']
    for obj in objects_danhmuc:
        if obj in data and "stt" in data[obj]:
            del data[obj]['stt']

async def entity_pregetmany_hogiadinh(search_params=None, **kw):
    request = kw.get("request", None)
    currentUser = await current_user(request)
    if currentUser is not None:
        currdonvi = currentUser.donvi
        dshogiadinhid = None
        if(currdonvi is not None):
            if currdonvi.tuyendonvi_id == 2:
                dshogiadinhid = db.session.query(HoGiaDinh.id).filter(HoGiaDinh.tinhthanh_id == currdonvi.tinhthanh_id).all()
            elif currdonvi.tuyendonvi_id == 3:
                dshogiadinhid = db.session.query(HoGiaDinh.id).filter(HoGiaDinh.quanhuyen_id == currdonvi.quanhuyen_id).all()
            elif currdonvi.tuyendonvi_id == 4:
                dshogiadinhid = db.session.query(HoGiaDinh.id).filter(HoGiaDinh.xaphuong_id == currdonvi.xaphuong_id).all()
        if dshogiadinhid is not None and len(dshogiadinhid) >0:
            search_params["filters"] = ("filters" in search_params) and {"$and":[search_params["filters"], {"id":{"$in": dshogiadinhid}}]} \
                                    or {"id":{"$in": dshogiadinhid}}

    

apimanager.create_api(HoGiaDinh, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func, entity_pregetmany_hogiadinh], POST=[auth_func, prepost_put_hogiadinh], PUT_SINGLE=[auth_func, prepost_put_hogiadinh], DELETE_SINGLE=[auth_func]),
    postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[],GET_MANY =[postprocess_stt_danhmuc]),
    exclude_columns= ["nguoibaocao.confirmpassword","nguoibaocao.password"],
    collection_name='hogiadinh')

apimanager.create_api(VSCapThon,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func,entity_pregetmany], POST=[auth_func, baocao_prepost_vscapthon], PUT_SINGLE=[auth_func, pre_put_vscapthon], DELETE_SINGLE=[auth_func]),
    postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[]),
    exclude_columns= ["nguoibaocao.confirmpassword","nguoibaocao.password"],
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
    exclude_columns= ["nguoibaocao.confirmpassword","nguoibaocao.password"],
    collection_name='vscapxa')


apimanager.create_api(VSCapHuyen,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func, entity_pregetmany], POST=[auth_func, baocao_prepost_vscaphuyen], PUT_SINGLE=[auth_func,pre_put_vscaphuyen], DELETE_SINGLE=[auth_func]),
    postprocess=dict(GET_SINGLE=[reponse_caphuyen_get_single], PUT_SINGLE=[], DELETE_SINGLE=[]),
    exclude_columns= ["nguoibaocao.confirmpassword","nguoibaocao.password"],
    collection_name='vscaphuyen')


apimanager.create_api(VSCapTinh,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func, entity_pregetmany], POST=[auth_func, baocao_prepost_vscaptinh], PUT_SINGLE=[auth_func,pre_put_vscaptinh], DELETE_SINGLE=[auth_func]),
    postprocess=dict(GET_SINGLE=[reponse_captinh_get_single], PUT_SINGLE=[], DELETE_SINGLE=[]),
    exclude_columns= ["nguoibaocao.confirmpassword","nguoibaocao.password"],
    collection_name='vscaptinh')


apimanager.create_api(TienDoVeSinhToanXa,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    exclude_columns= ["nguoibaocao.confirmpassword","nguoibaocao.password"],
    collection_name='tiendovesinhtoanxa')


apimanager.create_api(BaoCaoTienDoDuyTriVSTXBenVung,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    exclude_columns= ["nguoibaocao.confirmpassword","nguoibaocao.password"],
    collection_name='baocao_tiendo_duytri_vstx_benvung')

apimanager.create_api(DuyetVeSinhToanXa,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func, prepost_duyetvstoanxa], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    exclude_columns= ["nguoibaocao.confirmpassword","nguoibaocao.password"],
    collection_name='duyet_vesinh_toanxa')

apimanager.create_api(DanhSachDonViThuocSUP,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[],GET_MANY =[postprocess_stt_danhmuc]),
    collection_name='danhsach_donvi_thuocSUP')

