from flask import Flask, jsonify
import datetime
import pytz

app = Flask(__name__)

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

if __name__ == '__main__':
    app.run(debug=True)