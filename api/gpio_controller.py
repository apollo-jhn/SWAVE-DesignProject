import RPi.GPIO as GPIO
from dotenv import load_dotenv
from tools.api_request import getRequest, postRequest
import os
import time
import random

LOOP_DELAY_SECOND: int = 0.1

COIN_SLOT_SIGNAL: int = 6
IR_SENSOR_1: int = 4
IR_SENSOR_2: int = 11
IR_SENSOR_3: int = 12
WATER_PUMP_RELAY: int = 13
ULTRASONIC_1_TRIG: int = 27
ULTRASONIC_1_ECHO: int = 22

ULTRASONIC_LIMIT: float = 10.00


def setup():
    # Set BCM Numbering
    GPIO.setmode(GPIO.BCM)

    # Set mode
    GPIO.setup(
        COIN_SLOT_SIGNAL, GPIO.IN, pull_up_down=GPIO.PUD_UP
    )  # Changed to PUD_UP for coin detection

    # Infrared Proximity Sensor 1,2 and 3
    GPIO.setup(IR_SENSOR_1, GPIO.IN)
    GPIO.setup(IR_SENSOR_2, GPIO.IN)
    GPIO.setup(IR_SENSOR_3, GPIO.IN)

    # Water Pump Relay
    GPIO.setup(WATER_PUMP_RELAY, GPIO.OUT)
    GPIO.output(WATER_PUMP_RELAY, GPIO.HIGH)

    # Ultrasonic 1
    GPIO.setup(ULTRASONIC_1_ECHO, GPIO.IN)
    GPIO.setup(ULTRASONIC_1_TRIG, GPIO.OUT)
    GPIO.output(ULTRASONIC_1_TRIG, GPIO.LOW)

    # Coin slot callback
    GPIO.add_event_detect(
        COIN_SLOT_SIGNAL, GPIO.RISING, callback=incrementAmmount, bouncetime=20
    )
    GPIO.add_event_detect(
        IR_SENSOR_1, GPIO.RISING, callback=checkBottle, bouncetime=250
    )


def incrementAmmount(channel) -> None:
    getRequest(os.getenv("API_BASE_URL") + "/coinslot/increment")


def checkBottle(channel):
    _reward_points = 0
    _IR1 = GPIO.input(IR_SENSOR_2)
    _IR2 = GPIO.input(IR_SENSOR_2)
    _IR3 = GPIO.input(IR_SENSOR_3)

    if _IR2 == GPIO.HIGH or _IR1 == GPIO.HIGH:
        print("IR Sensor 2 detected an object.")
        if _IR3 == GPIO.HIGH:
            print("IR Sensor 3 also detected an object.")
            _reward_points = round(
                random.uniform(1.25, 2.5), 2
            )  # Random between mid and max (2.5)
        else:
            _reward_points = round(
                random.uniform(0.1, 1.25), 2
            )  # Random midpoint (up to 1.25)

    # Send the reward point and call the function to increment bottle counter
    postRequest(
        os.getenv("API_BASE_URL") + "/bottle/manager",
        {"reward_point": _reward_points, "increment": "yes"},
    )


def waterPump():
    _successcode, _dispenseData = getRequest(
        os.getenv("API_BASE_URL") + "/waterpump/data"
    )

    if not _successcode:
        return

    _dispense = _dispenseData["dispense"]

    if _dispense:
        GPIO.output(WATER_PUMP_RELAY, GPIO.LOW)
    else:
        GPIO.output(WATER_PUMP_RELAY, GPIO.HIGH)


def checkPETStorage():
    # Send pulse
    GPIO.output(ULTRASONIC_1_TRIG, GPIO.HIGH)
    time.sleep(0.00001)
    GPIO.output(ULTRASONIC_1_TRIG, GPIO.LOW)

    # Measure echo duration
    while GPIO.input(ULTRASONIC_1_ECHO) == 0:
        pulse_start = time.time()

    while GPIO.input(ULTRASONIC_1_ECHO) == 1:
        pulse_end = time.time()

    pulse_duration = pulse_end - pulse_start

    # Calculate distance (cm)
    distance = pulse_duration * 17150
    distance = round(distance, 2)

    if distance < ULTRASONIC_LIMIT:
        postRequest(os.getenv("API_BASE_URL") + "/storage/check", {"warning": True})
    else:
        postRequest(os.getenv("API_BASE_URL") + "/storage/check", {"warning": False})


def loop():
    # Storage Check
    checkPETStorage()
    # Water Pump
    waterPump()


if __name__ == "__main__":
    load_dotenv()
    setup()
    try:
        while True:
            loop()
            time.sleep(LOOP_DELAY_SECOND)

    except KeyboardInterrupt:
        GPIO.cleanup()
