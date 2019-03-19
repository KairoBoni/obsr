from flask import Blueprint
import json

def create_notices_blueprint(debug):
    notices_blueprint = Blueprint("notices_blueprint", __name__)
    
    @notices_blueprint.route("/getNotices")
    def get_notices():
        return json.dumps(data), 200


    return notices_blueprint