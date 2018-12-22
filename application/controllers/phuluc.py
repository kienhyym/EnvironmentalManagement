from __future__ import division
import asyncio
import aiosmtplib
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from gatco.response import json,text, html
from application.extensions import apimanager
from application.models.model_user import *
from application.extensions import auth
from application.database import db
from application.server import app
from gatco_restapi.helpers import to_dict
from application.controllers.helpers import *
from sqlalchemy import or_

# lay du lieu cua thon vao xa
@app.route('/add', methods=['POST'])
def addxa(request):
    datathon = query.all()
    tenthon = request.form.get('tenthon', None)
    nuchuho = request.form.get('chuholanu', None)
    dtts = request.form.get('sohodtts', None)
    hongheo = request.form.get('sohongheo', None)
    tuhoai = request.form.get('tuhoai', None)
    thamdoi = request.form.get('thamdoi', None)
    haingan = request.form.get('haingan', None)
    ongthong = request.form.get('coongthong', None)
    knhatieu = request.form.get('kconhatieu', None)
    hopvs = request.form.get('hopvs', None)
    khopvs = request.form.get('khopvs', None)
    caithien = request.form.get('caithien', None)
    diemruatay = request.form.get('diemruatay', None)
    
    db.session.add(post)
    db.session.commit()
    
@app.route('/update', methods=['PUT'])

@app.route('/delete', methods=['DELETE'])