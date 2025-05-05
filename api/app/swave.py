class SWAVE():
    def __init__(self):
        # PINS
        self.WATER_PUMP_RELAY: int = 25  # Pin 22
        self.ULTRASONIC_TRIG: int = 23  # Pin 16
        self.ULTRASONIC_ECHO: int = 24  # Pin 18
        self.INFRARED_SENSOR_1: int = 17  # Pin 11
        self.INFRARED_SENSOR_2: int = 27  # Pin 13
        self.INFRARED_SENSOR_3: int = 22  # Pin 15
        self.COIN_SLOT: int = 26  # Pin 15

        # CONSTANTS
        self.MAX_LITER_FILLTIME_MS: int = 30000
        self.MAX_LITER_ORDER: int = 1000

        self.inserted_coin: int = 0
        self.volume_selected: int = 0
        self.price_selected: int = 0

        self.dispensing_interval_ms: float = 0

    def start_dispensing(self):
        pass

    def stop_dispensing(self):
        pass

    def get_dispensing_interval(self) -> float:
        return (self.volume_selected / self.MAX_LITER_ORDER) * self.MAX_LITER_FILLTIME_MS

    def loop(self) -> None:
        pass
