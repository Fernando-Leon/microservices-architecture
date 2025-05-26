import config
import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def create_app():
  app = Flask(__name__)

  environment_configuration = os.environ.get('CONFIGURATION_SETUP')

  app.config.from_object(environment_configuration)

  db.init_app(app)

  with app.app_context():
    from .profession_api import profession_api_blueprint
    app.register_blueprint(profession_api_blueprint)
    return app