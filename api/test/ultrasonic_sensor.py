import pigpio
import time

# Initialize pigpio
pi = pigpio.pi()
if not pi.connected:
    exit()

# Define GPIO pins
TRIG = 17
ECHO = 27

# Set up pins
pi.set_mode(TRIG, pigpio.OUTPUT)
pi.set_mode(ECHO, pigpio.INPUT)


def get_distance():
    # Ensure trigger is low
    pi.write(TRIG, 0)
    time.sleep(0.000002)  # 2 microseconds

    # Send 10 microsecond pulse
    pi.write(TRIG, 1)
    time.sleep(0.00001)  # 10 microseconds
    pi.write(TRIG, 0)

    # Measure pulse length on echo pin
    start = time.time()
    while pi.read(ECHO) == 0:
        start = time.time()

    stop = time.time()
    while pi.read(ECHO) == 1:
        stop = time.time()

    # Calculate distance in cm
    elapsed = stop - start
    distance = (elapsed * 34300) / 2  # Speed of sound is 343 m/s

    return distance


try:
    while True:
        dist = get_distance()
        print(f"Distance: {dist:.2f} cm")
        time.sleep(1)
except KeyboardInterrupt:
    pi.stop()
