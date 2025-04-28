import json
import random
import os

class SWAVE:
    def __init__(self):
        # Buy Water
        self.selected_volume: int = 0
        self.selected_price: int = 0
        self.dispensing_interval: int = 5000

        # State
        self.isStorageFull: bool = False
        self.isWaterOnCritical: bool = False
        self.enableBottleDetection: bool = True
        self.enableDispenseWater: bool = True

        # Coinslot
        self.inserted_amount: int = 100

        # Bottle temporary values
        self.bottleInserted: int = 5
        self.pointsAcquired: float = 1000.0

    def incrementInsertedBottleValue(self, value=1):
        self.bottleInserted += value

    def addPoints(self, code):
        with open(os.getenv("DATABASE_PATH"), "r") as db_file:
            _db = json.load(db_file)

        # First find if the code exists
        account_found = None
        for account in _db["accounts"]:
            if account["code"] == code:
                account_found = account
                break

        if account_found:
            # Update the points
            account_found["points"] += self.pointsAcquired

            # Write back to the database
            with open(os.getenv("DATABASE_PATH"), "w") as db_file:
                json.dump(_db, db_file, indent=4)

            # Clear points
            self.clearBottleDataValues()
            return {"message": "Point Added Successfully. Thank you!", "status": "success"}
        else:
            return {"message": "User code was not found.", "status": "failed"}

    def clearBottleDataValues(self):
        self.bottleInserted = 0
        self.pointsAcquired = 0.0

    # TODO: Dispense Water Logic
    def dispenseWater(self):
        print("Dispense water function is called")

    def main():
        pass

class SWAVE_OLD:
    def __init__(self):
        # CONSTANTS
        self.DATABASE_NAME = "database"

        # Dispensing a water
        self.selectedPrice: int = 0
        self.selectedVolume: int = 0
        self.insertedCoinsAmount: int = 50
        self.dispenseInterval: int = 20000  # in ms

        # Recyling Plastic Bottle
        self.bottleInserted: int = 20
        self.pointsReceived: float = 2.58
        self.code: int = 0

    def incrementBottleInserted(self) -> None:
        self.bottleInserted += 1

    def clearRecyclingRecords(self):
        # Clear Records
        self.bottleInserted = 0
        self.pointsReceived = 0

    def codeGenerator(self, lower_bound: int = 0, upper_bound: int = 9) -> str:
        # Open Database
        with open(f"{self.DATABASE_NAME}.json", "r") as db_file:
            _db = json.load(db_file)

        # Get all existing codes first for faster checking
        existing_codes = {
            account["code"] for account in _db["accounts"] if "code" in account
        }

        # Generate a 4-digit code and check for duplicates
        while True:
            # Generate random 4-digit code
            code = "".join(
                str(random.randint(lower_bound, upper_bound)) for _ in range(4)
            )
            if code not in existing_codes:
                return code

    def registerAccount(
        self, student_number: str, name: str, email: str, password: str
    ) -> dict:
        # Check for duplicates
        with open(f"{self.DATABASE_NAME}.json") as db_file:
            _db = json.load(db_file)
            for student in _db["accounts"]:
                if student["student_number"] == student_number:
                    return {"message": "student number already exist!"}

        _code = self.codeGenerator()

        _new_account = {
            "student_number": student_number,
            "name": name,
            "email": email,
            "password": password,
            "points": 0.0,
            "code": _code,
        }

        _db["accounts"].append(_new_account)

        # Write the updated database to the file
        with open(f"{self.DATABASE_NAME}.json", "w") as db_file:
            json.dump(_db, db_file)

        return {"message": "Registered Thank you!.", "code": _code}

    def addPoints(self, code: str) -> dict:
        with open(f"{self.DATABASE_NAME}.json", "r") as db_file:
            _db = json.load(db_file)

        # First find if the code exists
        account_found = None
        for account in _db["accounts"]:
            if account["code"] == code:
                account_found = account
                break

        if account_found:
            # Update the points
            account_found["points"] += self.pointsReceived

            # Write back to the database
            with open(f"{self.DATABASE_NAME}.json", "w") as db_file:
                json.dump(_db, db_file, indent=2)

            # Clear points
            self.clearRecyclingRecords()
            return {"message": "Point Added Successfully. Thank you!", "status": "good"}
        else:
            return {"message": "User code was not found.", "status": "failed"}

    def setInsertedCointAmount(self):
        pass

    def dispenseWater(self):

        # Clear Past Order
        self.selectedPrice = 0
        self.selectedVolume = 0
        self.insertedCoinsAmount = 0
        self.dispenseInterval = 0

        print("Dispense Water Function was Called.")

    def processOrder():
        pass
