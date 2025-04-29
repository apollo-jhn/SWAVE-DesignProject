import pigpio

def gpioInit() -> None:
    pass

def gpioWrite(pi, pin_no: int, state: bool) -> None:
    """Writes a digital state (HIGH/LOW) to a specified GPIO pin.

    Args:
        pi: Raspberry Pi GPIO library instance (e.g., `pigpio.pi()`).
        pin_no (int): The Broadcom (BCM) GPIO pin number to write to.
        state (bool): The desired output state (`True` = HIGH, `False` = LOW).

    Example:
        >>> import pigpio
        >>> pi = pigpio.pi()
        >>> gpioWrite(pi, 17, True)  # Sets GPIO17 to HIGH
    """
    pi.write(pin_no, 1 if state else 0)  # Note: Fixed to use `state` argument


def gpioRead(pi, pin_no: int) -> bool:
    """Reads the digital state (HIGH/LOW) from a specified GPIO pin.

    Args:
        pi: Raspberry Pi GPIO library instance (e.g., `pigpio.pi()`).
        pin_no (int): The Broadcom (BCM) GPIO pin number to read from.

    Returns:
        bool: `True` if the pin is HIGH, `False` if LOW.

    Example:
        >>> import pigpio
        >>> pi = pigpio.pi()
        >>> state = gpioRead(pi, 17)  # Reads GPIO17
        >>> print(state)
    """
    return pi.read(pin_no)


def gpioSet(pi, pin_no: int, mode: str) -> None:
    """Sets a GPIO pin to either INPUT or OUTPUT mode.

    Args:
        pi: Raspberry Pi GPIO library instance (e.g., `pigpio.pi()`).
        pin_no (int): The Broadcom (BCM) GPIO pin number to configure.
        mode (str): The desired mode ("INPUT" or "OUTPUT").

    Raises:
        ValueError: If `mode` is not "INPUT" or "OUTPUT".

    Example:
        >>> import pigpio
        >>> pi = pigpio.pi()
        >>> gpioSet(pi, 17, "OUTPUT")  # Sets GPIO17 as OUTPUT
    """
    if mode == "OUTPUT":
        pi.set_mode(pin_no, 1)  # 1 = OUTPUT in pigpio
    elif mode == "INPUT":
        pi.set_mode(pin_no, 0)  # 0 = INPUT in pigpio
    else:
        raise ValueError("Mode must be either 'INPUT' or 'OUTPUT'")
