import requests
from typing import Tuple, Union, Dict, Any

def getRequest(url: str) -> Tuple[bool, Union[Dict[str, Any], str]]:
    """
    Make a GET request to the specified URL.
    
    Args:
        url: The URL to send the GET request to
        
    Returns:
        Tuple of (success, data) where:
        - success: Boolean indicating if request succeeded
        - data: Response JSON if successful, error message if failed
    """
    try:
        response = requests.get(url)
        response.raise_for_status()  # Raises exception for 4XX/5XX status codes
        return True, response.json()
    except requests.exceptions.RequestException as e:
        return False, f"GET request failed: {str(e)}"
    
    
def postRequest(url: str, data: Dict[str, Any], headers: Dict[str, str] = None) -> Tuple[bool, Union[Dict[str, Any], str]]:
    """
    Make a POST request with JSON data to the specified URL.
    
    Args:
        url: The URL to send the POST request to
        data: Dictionary of data to send as JSON
        headers: Optional headers to include in the request
        
    Returns:
        Tuple of (success, data) where:
        - success: Boolean indicating if request succeeded
        - data: Response JSON if successful, error message if failed
    """
    try:
        response = requests.post(
            url,
            json=data,
            headers=headers or {'Content-Type': 'application/json'}
        )
        response.raise_for_status()
        return True, response.json()
    except requests.exceptions.RequestException as e:
        return False, f"POST request failed: {str(e)}"