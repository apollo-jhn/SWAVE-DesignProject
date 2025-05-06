import requests
from requests.exceptions import RequestException
from typing import Dict, Optional, Union


def post_request(
    data: Dict,
    url: str,
    timeout: int = 10
) -> Optional[Union[Dict, list]]:
    """
    Send a POST request with JSON data and return the JSON response.

    Args:
        data: Dictionary containing the data to send
        url: API endpoint URL
        timeout: Request timeout in seconds (default: 10)

    Returns:
        Parsed JSON response (dict/list) or None if request fails
    """
    try:
        response = requests.post(
            url,
            json=data,  # Automatically sets Content-Type and serializes
            headers={"Accept": "application/json"},
            timeout=timeout
        )

        # Consider other successful status codes (like 201 Created)
        if response.ok:
            return response.json()

        # Provide more detailed error information
        print(f"Request failed with status {response.status_code}")
        print(f"Response: {response.text}")

    except RequestException as e:
        print(f"Request failed: {str(e)}")
    except ValueError as e:  # Includes JSONDecodeError
        print(f"Failed to decode JSON response: {str(e)}")

    return None
