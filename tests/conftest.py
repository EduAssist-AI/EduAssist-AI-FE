import pytest
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def pytest_configure(config):
    """Configure pytest"""
    config.addinivalue_line(
        "markers", "smoke: marks tests as smoke tests"
    )
    config.addinivalue_line(
        "markers", "regression: marks tests as regression tests"
    )
    config.addinivalue_line(
        "markers", "critical: marks tests as critical functionality"
    )

@pytest.fixture(scope="session")
def base_url():
    """Return the base URL for the application"""
    return os.getenv('BASE_URL', 'http://localhost:5173')

@pytest.fixture(scope="session")
def default_wait_time():
    """Return the default wait time for explicit waits"""
    return int(os.getenv('DEFAULT_WAIT_TIME', 10))