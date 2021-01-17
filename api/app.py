from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///todo.db'
db = SQLAlchemy(app)


task_tag_table = db.Table('task_tag',
    db.Column('task_id', db.Integer, db.ForeignKey('task.task_id'), primary_key=True),
    db.Column('tag_id', db.Integer, db.ForeignKey('tag.tag_id'), primary_key=True)
)


class task(db.Model):
    __tablename__ = 'task'
    task_id = db.Column(db.Integer, nullable=False, primary_key=True)
    task_title = db.Column(db.String(50), nullable=False)
    task_content = db.Column(db.String(500), nullable=False)
    date_start = db.Column(db.DateTime, default=datetime.utcnow)
    date_end = db.Column(db.DateTime)
    tags = db.relationship("tag", secondary=task_tag_table)

    def __repr__(self):
        return '<Task %r>' % self.task_id


class tag(db.Model):
    __tablename__ = 'tag'
    tag_id = db.Column(db.Integer, nullable=False, primary_key=True)
    tag_title = db.Column(db.String(50), nullable=False)
    tag_desc = db.Column(db.String(500))
    tasks = db.relationship("task", secondary=task_tag_table)

    def __repr__(self):
        return '<Tag %r>' % self.tag_id




@app.route('/api', methods=['GET'])
def index():
    return {
        "To-do": "List"
    }


if __name__ == '__main__':
    app.run(debug=True)