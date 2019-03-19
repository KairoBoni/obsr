from mongoengine import connect
from .notices import Notices
from server.config import config


def init_db(config):
    connection = connect(**config["DB"])
    return connection
