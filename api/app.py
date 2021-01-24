from flask import Flask, jsonify, request, redirect
from flask_sqlalchemy import SQLAlchemy

from datetime import datetime
import pytz
import models
from models import init_db, Task, Tag


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///todo.db'

init_db(app)

from models import db


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
        'date' : local_dt.strftime("%B %d, %Y")
        # 'date' : local_dt.strftime("%A, %B %d")
    })


@app.route('/get_tasks', methods=['GET'])
def get_tasks():
    from_db = Task.query.order_by(Task.date_start).all()
    tasks = {}

    for task in from_db:
        tasks[task.id] = {
            'id': task.id,
            'title': task.task_title,
            'content': task.task_content,
            'due': task.date_end
        }
    return jsonify(tasks)


@app.route('/create_task', methods=['POST'])
def create_task():
    title = request.form.get('title') # Task title
    content = request.form.get('content') # Task content
    due = datetime.strptime(request.form.get('date_end'), '%a, %b %d %Y %H:%M:%S') # Task due date
    # Create the new tasks
    new_task = Task(task_title=title, task_content=content, date_end=due)

    # Try to add to db
    try:
        db.session.add(new_task)
        db.session.commit()
        return redirect('http://localhost:3000/')
    except:
        return {'message': 'error'}, 400


@app.route('/delete_task/<int:id>')
def delete_task(id):
    task_to_delete = Task.query.get_or_404(id) # Get task from id

    # Try to delete from db
    try:
        db.session.delete(task_to_delete)
        db.session.commit()
        return True # Return True if commit is successful
    except:
        return False


@app.route('/edit_task<int:id>', methods=['GET', 'POST'])
def edit_task(id):
    task_to_edit = Task.query.get_or_404(id) # Get task from id

    if request.method == 'POST':
        task_to_edit.task_title = request.form['title']
        task_to_edit.task_content = request.form['content']

        try:
            db.session.commit()
            return True
        except:
            return False


@app.route('/create_tag', methods=['POST'])
def create_tag():
    title = request.form['title'] # Tag title
    description = request.form['desc'] # Tag desc

    # Create the new tag
    new_tag = Tag(tag_title=title, task_desc=description)

    # Try to add to db
    try:
        db.session.add(new_tag)
        db.session.commit()
        return True # Return True if commit is successful
    except:
        return False


@app.route('/delete_tag/<int:id>')
def delete_tag(id):
    tag_to_delete = Task.query.get_or_404(id) # Get tag from id

    # Try to delete from db
    try:
        db.session.delete(tag_to_delete)
        db.session.commit()
        return True # Return True if commit is successful
    except:
        return False


@app.route('/edit_task<int:id>', methods=['GET', 'POST'])
def edit_task_2(id): # Two functions with the same name
    task_to_edit = Task.query.get_or_404(id) # Get task from id

    if request.method == 'POST':
        task_to_edit.task_title = request.form['title']
        task_to_edit.task_content = request.form['content']

        try:
            db.session.commit()
            return True
        except:
            return False

if __name__ == '__main__':
    app.run(debug=True)