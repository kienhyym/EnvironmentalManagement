import os
from .server import app

def run_app(host="127.0.0.1", port=9070, debug=False):
    """ Start project MoiTruong YTE with port 9070. """
    app.run(host=host, port=port, debug=debug, workers=os.cpu_count())
