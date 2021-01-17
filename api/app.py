from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import pytz

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///todo.db'
db = SQLAlchemy(app)


task_tag_table = db.Table('task_tag',
    db.Column('task_id', db.Integer, db.ForeignKey('task.task_id')),
    db.Column('tag_id', db.Integer, db.ForeignKey('tag.tag_id'))
)


class task(db.Model):
    __tablename__ = 'task'
    task_id = db.Column(db.Integer, nullable=False, primary_key=True)
    task_title = db.Column(db.String(50), nullable=False)
    task_content = db.Column(db.String(500), nullable=False)
    date_start = db.Column(db.DateTime, default=datetime.utcnow)
    date_end = db.Column(db.DateTime)
    tags = db.relationship("tag", secondary=task_tag_table, backref=db.backref('tasks_associated', lazy='joined'))

    def __repr__(self):
        return '<Task %r>' % self.task_id


class tag(db.Model):
    __tablename__ = 'tag'
    tag_id = db.Column(db.Integer, nullable=False, primary_key=True)
    tag_title = db.Column(db.String(50), nullable=False)
    tag_desc = db.Column(db.String(500))

    def __repr__(self):
        return '<Tag %r>' % self.tag_id



def get_timezone():
    dt = datetime.datetime.utcnow()
    tz = pytz.timezone('US/Eastern')  # EST timezone
    utc = pytz.timezone('UTC')
    dt = utc.localize(dt, is_dst=None).astimezone(pytz.utc)
    local_dt = dt.astimezone(tz)
    return local_dt

@app.route('/api', methods=['GET'])
def index():
    return {
        "Todo" : "List"
    }


@app.route('/_get_date', methods=['GET'])
def get_date():
    local_dt = get_timezone()
    return jsonify({
        'date' : local_dt.strftime("%A, %B %d")
    })


@app.route('/create_task', methods=['POST'])
def create_task():
    task_title = request.form['title'] # Task title
    task_content = request.form['content'] # Task content
    date_end = request.form['date_end'] # Task due date




if __name__ == '__main__':
    app.run(debug=True)