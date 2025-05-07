import signal
import sys
from flask import Flask, request, jsonify
from flask_cors import CORS
from app.swave import SWAVE, SWAVE_GPIO

# Flask
app: Flask = Flask(__name__)
CORS(app)

# SWAVE class
swave: SWAVE = SWAVE()
swave_gpio: SWAVE_GPIO = SWAVE_GPIO()

# Signal Handling for Cleanup


def shutdown_handler(signum, frame) -> None:
    print(f"\n[INFO] Received signal {signum}, cleaning up GPIO...")
    swave_gpio.cleanup()
    sys.exit(0)


# Register signals (Ctrl+C and kill)
signal.signal(signal.SIGINT, shutdown_handler)
signal.signal(signal.SIGTERM, shutdown_handler)


@app.route("/warnings", methods=["GET"])
def get_warnings():
    try:
        print(swave.get_warning_fullstorage())
        return jsonify({"is_low_water": swave.get_warning_low_on_water(), "is_storage_full": swave.get_warning_fullstorage()}), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500


@app.route("/coinslot/inserted_amount", methods=["GET"])
def get_inserted_amount():
    try:
        return jsonify({"inserted_amount": swave.get_inserted_amount()}), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500


@app.route("/buywater/process_order", methods=["POST"])
def process_order():
    try:
        # Save order detais
        data = request.get_json()
        swave.set_selected_volume(data["volume_value"])
        swave.set_selected_price(data["price_value"])

        # Start dispensing
        swave.set_dispensing_state(True)
        print("Dispense start")

        # Check if water is below the minimum serving volume
        swave.calculate_liters_consumed()

        # Return interval
        return jsonify({"message": "OK", "dispensing_interval": swave.calculate_dispensing_interval()}), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500


@app.route("/stop/dispensing", methods=["GET"])
def stop_dispensing():
    try:
        # Start dispensing
        swave.set_dispensing_state(False)
        print("Dispense stopped")

        return jsonify({"message": "OK"}), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500


@app.route("/recycle/data", methods=["GET"])
def get_recycle_data():
    try:
        return jsonify({
            "message": "OK",
            "inserted_bottles": swave.get_bottle_counter(),
            "reward_points": swave.get_reward_points()
        }), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500


@app.route("/recycle/donate", methods=["GET"])
def recycle_donate_bottles():
    try:
        swave.donate_bottles()
        return jsonify({"messages": "OK"}), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500


if __name__ == "__main__":
    swave.main()
    swave_gpio.main(swave)
    print("[INFO] Server starting at http://0.0.0.0:5000")
    app.run(debug=False, port=5000, host="0.0.0.0")
