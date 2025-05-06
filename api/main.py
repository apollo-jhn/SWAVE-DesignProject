from flask import jsonify, request, Flask
from app.swave import SWAVE
from flask_cors import CORS


flask: Flask = Flask(__name__)
CORS(flask)
swave: SWAVE = SWAVE()


@flask.route("/recycle/data", methods=["POST", "GET"])
def recycle_get_data():
    try:
        if request.method == "POST":
            pass
        if request.method == "GET":
            return jsonify({"inserted_bottles": swave.get_inserted_bottles(), "reward_points": swave.get_reward_points()}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@flask.route("/buywater/process_order", methods=["POST"])
def buywater_postdata():
    """
        Handles the POST request to process a water purchase order.

        Endpoint:
            /buywater/process_order

        Methods:
            POST

        Request Body (JSON):
            - volume_value (optional, float): The volume of water selected by the user.
            - price_value (optional, float): The price of the selected water volume.

        Response:
            - 200 OK: Returns a JSON object with a success message and the dispensing interval.
                Example:
                {
                    "message": "OK",
                    "dispensing_interval": <float>
                }
            - 500 Internal Server Error: Returns a JSON object with an error message if an exception occurs.
                Example:
                {
                    "error": "<error_message>"
                }

        Functionality:
            - Extracts `volume_value` and `price_value` from the request body, if provided.
            - Updates the `swave` object with the selected volume and price.
            - Calculates the dispensing interval using `swave.get_dispensing_interval()`.
            - Initiates the dispensing process by setting the dispensing state to True.
            - Returns the dispensing interval in the response.

        Raises:
            - Exception: Captures and returns any unexpected errors during processing.
        """
    try:
        _data = request.get_json()
        if "volume_value" in _data:
            swave.volume_selected = _data["volume_value"]
        if "price_value" in _data:
            swave.price_selected = _data["price_value"]

        # Get the required interval
        _interval: float = swave.get_dispensing_interval()

        # Funtion to start dispensing
        swave.set_dispensing_state(True)

        return jsonify({"message": "OK", "dispensing_interval": _interval}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@flask.route("/buywater/stop/dispensing", methods=["GET"])
def stop_dispensing():
    try:
        # Function to stop dispensing
        swave.set_dispensing_state(False)
        return jsonify({"message": "OK"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@flask.route("/buywater/coin/value", methods=["GET"])
def get_coinvalue():
    try:
        return jsonify({"inserted_coin": swave.get_inserted_coin()}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@flask.route("/gpio_controller", methods=["POST"])
def gpio_controller():
    try:
        _response = request.get_json()
        print(_response)
        if "add_coin" in _response:
            if _response["add_coin"]:
                swave.increment_amount()

        # Return data
        return jsonify({
            "is_dispense": swave.get_is_dispense(),
            "message": "OK"
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    flask.run(host="0.0.0.0", port=5000, debug=False)
