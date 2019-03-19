from flask import Flask, session
from .database import init_db
from .resources import create_index_blueprint, create_notices_blueprint


def create_app(config, debug):
    app = Flask(__name__)
    connection = init_db(config)
    app.secret_key = config["APP"]["SECRET_KEY"]

    index = create_index_blueprint(debug)

    notices = create_notices_blueprint(debug)

    app.register_blueprint(index, url_prefix="/")

    app.register_blueprint(notices, url_prefix="/notices")

    return app
