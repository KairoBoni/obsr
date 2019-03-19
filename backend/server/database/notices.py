from mongoengine import StringField, Document

class Notices(Document):
    title = StringField(primary_key=True)
    summary = StringField(required=True)
    href = StringField(required=True)
    time = StringField()
    site = StringField()
