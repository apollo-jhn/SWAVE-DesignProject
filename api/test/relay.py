import piogpio
import time

# Initialize pigpio
pi = pigpio.pi()
if not pi.connected:
    exit()

RELAY_PIN = 17  # Using GPIO17

# Set up pin
pi.set_mode(RELAY_PIN, pigpio.OUTPUT)

try:
    while True:
        print("Turning relay ON")
        pi.write(RELAY_PIN, 1)  # Set pin HIGH to activate relay
        time.sleep(2)           # Keep on for 2 seconds
        
        print("Turning relay OFF")
        pi.write(RELAY_PIN, 0)  # Set pin LOW to deactivate relay
        time.sleep(2)           # Keep off for 2 seconds

except KeyboardInterrupt:
    pi.write(RELAY_PIN, 0)  # Ensure relay is off before exiting
    pi.stop()