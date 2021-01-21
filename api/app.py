from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
import datetime
import pytz
import models
from models import init_db


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///todo.db'
init_db(app)


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


@app.route('/create_task', methods=['POST'])
def create_task():
    title = request.form['title'] # Task title
    content = request.form['content'] # Task content
    due = request.form['date_end'] # Task due date

    # Create the new tasks
    new_task = Task(task_title=task, task_content=content, date_end=due)

    # Try to add to db
    try:
        db.session.add(new_task)
        db.session.commit()
        return True # Return True if commit is successful
    except:
        return False


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