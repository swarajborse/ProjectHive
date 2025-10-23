import os
os.environ['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
import sqlalchemy
from sqlalchemy import TEXT
from sqlalchemy.types import TypeDecorator
import json
from app import app
app.secret_key = 'your_secret_key'
class JSONEncodedDict(TypeDecorator):
    impl = TEXT
    def process_bind_param(self, value, dialect):
        if value is not None:
            value = json.dumps(value)
        return value
    def process_result_value(self, value, dialect):
        if value is not None:
            value = json.loads(value)
        return value
import sqlalchemy.dialects.postgresql
sqlalchemy.dialects.postgresql.JSONB = JSONEncodedDict
from app import app
if __name__ == '__main__':
    app.run(debug=True)
