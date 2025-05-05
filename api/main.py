from flask import jsonify, request, Flask
from app.swave import SWAVE
from flask_cors import CORS

flask: Flask = Flask(__name__)
CORS(flask)
swave: SWAVE = SWAVE()


@flask.route("/buywater/process_order", methods=["POST"])
def buywater_postdata():
    try:
        _data = request.get_json()
        if "volume_value" in _data:
            swave.volume_selected = _data["volume_value"]
        if "price_value" in _data:
            swave.price_selected = _data["price_value"]

        _interval: float = swave.get_dispensing_interval()

        return jsonify({"message": "OK", "dispensing_interval": _interval}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@flask.route("/buywater/get/interval", methods=["GET"])
def get_coindata():
    try:
        _data = request.get_json()
        print(_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@flask.route("/buywater/stop/dispensing", methods=["GET"])
def stop_dispensing():
    try:
        print("Dispense Stopped")
        return jsonify({"message": "OK"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@flask.route("/buywater/start/dispensing", methods=["GET"])
def start_dispensing():
    try:
        print("Dispense started")
        return jsonify({"message": "OK"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@flask.route("/buywater/coin/value", methods=["GET"])
def get_coinvalue():
    try:
        return jsonify({"inserted_coin": swave.inserted_coin}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    swave.main()
    flask.run(host="0.0.0.0", port=5000, debug=True)
