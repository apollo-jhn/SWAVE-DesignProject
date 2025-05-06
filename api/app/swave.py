from threading import Lock


class SWAVE():
    def __init__(self):
        # Create a lock to a frequency access data to prevent race
        self.lock = Lock()

        # Coinslot
        self.is_dispense: bool = False

        # CONSTANTS
        self.MAX_LITER_FILLTIME_MS: int = 30000
        self.MAX_LITER_ORDER: int = 1000

        self.inserted_coin: int = 10
        self.volume_selected: int = 0
        self.price_selected: int = 0

        # Recycle values
        self.inserted_bottles: int = 0
        self.reward_points: float = 0

        self.dispensing_interval_ms: float = 0

    def get_is_dispense(self):
        with self.lock:
            return self.is_dispense

    def get_inserted_bottles(self):
        with self.lock:
            return self.inserted_bottles

    def get_reward_points(self):
        with self.lock:
            return self.reward_points

    def set_dispensing_state(self, state: bool) -> None:
        _state: bool = state
        with self.lock:
            if _state:
                self.inserted_coin -= self.price_selected
            self.is_dispense = _state

    def get_inserted_coin(self):
        _inserted_coin: int = 0
        with self.lock:
            _inserted_coin = self.inserted_coin
        return _inserted_coin

    def get_dispensing_interval(self) -> float:
        return (self.volume_selected / self.MAX_LITER_ORDER) * self.MAX_LITER_FILLTIME_MS

    def increment_amount(self):
        with self.lock:
            self.inserted_coin += 1
            print(f"Coin detected! Total coins: {self.inserted_coin}")
