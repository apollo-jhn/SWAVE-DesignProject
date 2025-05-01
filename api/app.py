from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import os
from .swave import SWAVE
from dotenv import load_dotenv

# Flask
app = Flask(__name__, static_folder=None)
swave = SWAVE()

# Configure paths
REACT_BUILD_DIR = os.path.join(os.path.dirname(__file__), "..", "dist")


# Serve React's static files
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_react(path):
    if path != "" and os.path.exists(os.path.join(REACT_BUILD_DIR, path)):
        return send_from_directory(REACT_BUILD_DIR, path)
    else:
        return send_from_directory(REACT_BUILD_DIR, "index.html")

@app.route("/storage/check", methods=["POST"])
def plasticBottleCheck():
    if request.method == "POST":
        _data = request.get_json()
        _ = _data["warning"]
        if _ == True:
            swave.isStorageFull = True
        else:
            swave.isStorageFull = False
        return jsonify({"message": "OK"}), 200
            

# Water Pump Relay
@app.route("/waterpump/data", methods=["GET"])
def getWaterPumpData():
    if request.method == "GET":
        _return = {
            "interval": swave.dispensing_interval,
            "dispense": swave.enableDispenseWater,
            "stop": swave.enableDispenseWater
        }
        return jsonify(_return), 200

@app.route("/stop/dispense", methods=["GET"])
def stopDispense():
    if request.method == "GET":
        swave.stopDispense = True
        swave.enableDispenseWater = False
        return jsonify({"message": "OK"}), 200

@app.route("/disable/dispense", methods=["GET"])
def disableDispense():
    if request.method == "GET":
        swave.stopDispense = False
        swave.enableDispenseWater = False
        return jsonify({"message": "OK"}), 200

# Your existing API routes
@app.route("/ping", methods=["GET"])
def ping():
    return jsonify({"status": "success"}), 200

@app.route("/coinslot/increment", methods=["GET"])
def incrementInsertedAmount():
    swave.inserted_amount += 1
    return jsonify({"message": "OK"}), 200

@app.route("/bottle/manager", methods=["POST"])
def sensors_IRstates():
    if request.method == "POST":
        _data = request.get_json()
        print(_data)
        swave.pointsAcquired += float(_data["reward_point"])
        swave.bottleInserted += 1
        return jsonify({"message": "OK"}), 200
        
@app.route("/redeem/item", methods=["POST"])
def redeemItem():
    if request.method == "POST":
        _data = request.get_json()
        _code = _data["code"]
        _itemID = _data["itemId"]
        _pointsCost = _data["pointsCost"]
        swave.redeemItem(_code, _itemID, _pointsCost)
        pass
    return jsonify({"message": "OK"}), 200


@app.route("/data/put", methods=["POST"])
def putData():
    try:
        _data = request.get_json()
        if not _data:
            return jsonify({"status": "error", "message": "No data provided"}), 400

        if "volume" in _data:
            _volume = int(_data["volume"].replace("ml", ""))
            swave.dispensing_interval = 1000 * ((_volume/swave.MAX_LITER) * swave.SECONDS_PER_LITER)
            swave.noOfLitersServed += _volume
            swave.selected_volume = _volume
        if "price" in _data:
            swave.selected_price = int(_data["price"].replace("₱", ""))

        return jsonify({"status": "success"}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


@app.route("/data/get", methods=["POST"])
def getData():
    try:
        _request = request.get_json()
        if not _request or "request" not in _request:
            return (
                jsonify({"status": "error", "message": "Invalid request format"}),
                400,
            )

        _return_data = {"status": "good"}
        requested_fields = _request["request"]

        if "volume" in requested_fields:
            _return_data["volume"] = f"{swave.selected_volume}ml"
        if "price" in requested_fields:
            _return_data["price"] = f"₱{swave.selected_price}"
        if "inserted_amount" in requested_fields:
            _return_data["inserted_amount"] = swave.inserted_amount
        if "dispense_interval" in requested_fields:
            _return_data["dispense_interval"] = swave.dispensing_interval
        if "bottle_inserted" in requested_fields:
            _return_data["bottle_inserted"] = swave.bottleInserted
        if "points_acquired" in requested_fields:
            _return_data["points_acquired"] = swave.pointsAcquired
        if "is_storage_full" in requested_fields:
            _return_data["is_storage_full"] = swave.isStorageFull
        if "is_water_critical" in requested_fields:
            _return_data["is_water_critical"] = swave.isWaterOnCritical

        return jsonify(_return_data), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


@app.route("/function/call", methods=["POST"])
def callFunction():
    if request.method == "POST":
        _return_data: dict = {"status": "success"}
        _data = request.get_json()
        _function_call = _data["function"]
        if "dispense_water" in _function_call:
            swave.dispenseWater()
        if "clear_bottle_data_values" in _function_call:
            swave.clearBottleDataValues()
        if "add_points" in _function_call:
            _temp = swave.addPoints(_data["code"])
            _return_data["status"] = _temp["status"]
            _return_data["message"] = _temp["message"]
            print(_return_data)
    return jsonify(_return_data), 200


@app.route("/membership/add", methods=["POST"])
def registerAccount():
    if request.method == "POST":
        _data = request.get_json()
        _message = swave.registerAccount(
            _data["student_number"],
            _data["name"],
            _data["email"],
            _data["password"]
        )
        return jsonify(_message)
    
@app.route("/membership/signin", methods=["POST"])
def signInAccount():
    if request.method == "POST":
        _credential = request.get_json()
        _username = _credential["username"]
        _password = _credential["password"]
        return swave.signIn(_username, _password)
        
@app.route("/membership/getdata", methods=["POST"])
def membershipGetData():
    if request.method == "POST":
        _request = request.get_json()
        if "code" in _request:
            return swave.getData(_request["code"]), 200

def main():
    CORS(app)
    load_dotenv()
    app.run(debug=True, port=5000, host="0.0.0.0")
