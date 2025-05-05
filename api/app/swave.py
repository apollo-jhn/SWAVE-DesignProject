import RPi.GPIO as GPIO

class SWAVE():
    def __init__(self):
        # CONSTANTS
        self.MAX_LITER_FILLTIME_MS: int = 30000
        self.MAX_LITER_ORDER: int = 1000

        self.inserted_coin: int = 4
        self.volume_selected: int = 0
        self.price_selected: int = 0

        self.dispensing_interval_ms: float = 0

    def get_dispensing_interval(self) -> float:
        return (self.volume_selected / self.MAX_LITER_ORDER) * self.MAX_LITER_FILLTIME_MS

    def loop(self) -> None:
        pass
    
    def main(self):
        #
        GPIO.cleanup() # Good pre-cleanup
        GPIO.setmode(GPIO.BCM)  # or GPIO.BOARD
