from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

def init_db(app):
    app.app_context().push()
    db.init_app(app)
    db.create_all()


task_tag_table = db.Table('task_tag_table',
    db.Column('task_id', db.Integer, db.ForeignKey('task.id')),
    db.Column('tag_id', db.Integer, db.ForeignKey('tag.id'))
)


class Task(db.Model):
    id = db.Column(db.Integer, nullable=False, primary_key=True)
    task_title = db.Column(db.String(50), nullable=False)
    task_content = db.Column(db.String(500), nullable=False)
    date_start = db.Column(db.DateTime, default=datetime.utcnow)
    date_end = db.Column(db.DateTime)
    tags = db.relationship("Tag", secondary=task_tag_table, backref=db.backref('tasks_associated', lazy='joined'))

    def __repr__(self):
        return '<Task %r>' % self.id


class Tag(db.Model):
    id = db.Column(db.Integer, nullable=False, primary_key=True)
    tag_title = db.Column(db.String(50), nullable=False)
    tag_desc = db.Column(db.String(500))

    def __repr__(self):
        return '<Tag %r>' % self.id