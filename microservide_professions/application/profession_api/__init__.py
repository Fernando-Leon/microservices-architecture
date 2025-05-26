from flask import Blueprint

profession_api_blueprint = Blueprint('profession_api', __name__)

from . import routes
