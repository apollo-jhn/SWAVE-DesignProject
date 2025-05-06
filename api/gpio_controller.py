import RPi.GPIO as GPIO
from threading import Lock
import time
import signal
import sys
from typing import Dict, Optional, Union
from tools.api_request import post_request

# Configuration
API_BASE_URL: str = "http://localhost:5000/gpio_controller"

# Hardware Pin Definitions (BCM numbering)
WATER_PUMP_RELAY: int = 25    # Pin 22
ULTRASONIC_TRIG: int = 23     # Pin 16 (OUTPUT)
ULTRASONIC_ECHO: int = 24     # Pin 18 (INPUT)
INFRARED_SENSOR_1: int = 17   # Pin 11
INFRARED_SENSOR_2: int = 27   # Pin 13
INFRARED_SENSOR_3: int = 22   # Pin 15
COIN_SLOT_SIGNAL: int = 26    # Pin 37

# Shared resources with thread protection
shared_lock = Lock()
send_data: Dict = {}
receive_data: Dict = {}


def set_data(name: str, value: Union[int, float, str, bool]) -> None:
    """Thread-safe data setting."""
    with shared_lock:
        send_data[name] = value


def get_data(name: str) -> Optional[Union[int, float, str, bool]]:
    """Thread-safe data retrieval with error protection."""
    with shared_lock:
        return receive_data.get(name)


def update_receive_data(new_data: Dict) -> None:
    """Safely replace all received data while maintaining thread safety."""
    with shared_lock:
        receive_data.clear()
        receive_data.update(new_data)


def send_api_request():
    # Get snapshot of data to send (minimizes lock time)
    with shared_lock:
        current_send_data = send_data.copy()

    # Make API call (outside lock to avoid blocking)
    response = post_request(current_send_data, API_BASE_URL)

    if response is not None:
        update_receive_data(response)


def gpio_setup() -> None:
    """Initialize all GPIO pins with appropriate directions."""
    GPIO.setwarnings(False)
    GPIO.setmode(GPIO.BCM)

    # Output pins
    GPIO.setup(WATER_PUMP_RELAY, GPIO.OUT)
    GPIO.setup(ULTRASONIC_TRIG, GPIO.OUT)

    # Input pins
    GPIO.setup(ULTRASONIC_ECHO, GPIO.IN)
    GPIO.setup(INFRARED_SENSOR_1, GPIO.IN)
    GPIO.setup(INFRARED_SENSOR_2, GPIO.IN)
    GPIO.setup(INFRARED_SENSOR_3, GPIO.IN)
    GPIO.setup(COIN_SLOT_SIGNAL, GPIO.IN)

    # Initialize outputs to safe state
    GPIO.output(WATER_PUMP_RELAY, GPIO.LOW)
    GPIO.output(ULTRASONIC_TRIG, GPIO.LOW)

    # Coinslot callback
    GPIO.add_event_detect(COIN_SLOT_SIGNAL, GPIO.RISING,
                          callback=increment_amount, bouncetime=20)

    # Infrared Sensor
    GPIO.add_event_detect(INFRARED_SENSOR_1, GPIO.FALLING,
                          callback=increment_inserted_bottle, bouncetime=500)

    # Print the program is running
    print("GPIO Controller is running")


def increment_inserted_bottle(channel):
    pass


def increment_amount(channel):
    set_data("add_coin", True)


def water_pump_control():
    _state = get_data("is_dispense")
    if _state:
        GPIO.output(WATER_PUMP_RELAY, GPIO.HIGH)
    else:
        GPIO.output(WATER_PUMP_RELAY, GPIO.LOW)


def main_loop() -> None:
    """Main control loop with error handling."""
    try:
        while True:
            # Water Pump
            water_pump_control()

            # Send api request
            send_api_request()
            # Short delay to prevent CPU overload
            time.sleep(0.1)

    except KeyboardInterrupt:
        cleanup()
    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        cleanup()


def cleanup(signum: Optional[int] = None, frame=None) -> None:
    """Clean exit handler for signals and program termination."""
    print("\nCleaning up GPIO and exiting...")
    GPIO.cleanup()
    sys.exit(0 if signum is None else 1)


if __name__ == "__main__":
    # Register signal handlers for clean shutdown
    signal.signal(signal.SIGINT, cleanup)   # Ctrl+C
    signal.signal(signal.SIGTERM, cleanup)  # System termination

    # Initialize hardware and start main loop
    gpio_setup()
    main_loop()
