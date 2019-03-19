from flask import Blueprint, render_template
import json

def create_index_blueprint(debug):
    index_blueprint = Blueprint("index_blueprint", __name__)

    @index_blueprint.route("/")
    def index():
        return render_template("index.html", debug=debug)
    
    @index_blueprint.route("/br-states")
    def br_states():
        with open('./br-states.json') as f:
            data = json.load(f)
        return json.dumps(data), 200


    return index_blueprint
