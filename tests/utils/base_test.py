from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
import pytest
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class BaseTest:
    """
    Base test class that provides setup and teardown for all tests
    """
    
    @pytest.fixture(autouse=True)
    def setup(self):
        # Set up Chrome options
        chrome_options = Options()
        
        # Add headless option if needed (for CI/CD)
        if os.getenv('HEADLESS', '').lower() == 'true':
            chrome_options.add_argument('--headless')
            
        chrome_options.add_argument('--no-sandbox')
        chrome_options.add_argument('--disable-dev-shm-usage')
        chrome_options.add_argument('--disable-gpu')
        chrome_options.add_argument('--window-size=1920,1080')
        # Add additional arguments that may help with Windows compatibility
        chrome_options.add_argument('--remote-debugging-port=9222')
        chrome_options.add_argument('--disable-extensions')
        chrome_options.add_experimental_option('useAutomationExtension', False)
        chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
        
        # Initialize the driver - first, try the downloaded driver
        # If that fails, we'll try using ChromeDriver from PATH
        try:
            # Try to download and setup ChromeDriver via webdriver-manager
            driver_path = ChromeDriverManager().install()
            service = Service(driver_path)
            self.driver = webdriver.Chrome(service=service, options=chrome_options)
        except Exception as e:
            print(f"Error with webdriver-manager ChromeDriver: {e}")
            print("Trying with ChromeDriver from PATH...")
            # If webdriver-manager fails, try with a ChromeDriver already in the system PATH
            try:
                self.driver = webdriver.Chrome(options=chrome_options)
            except Exception as path_error:
                print(f"Error with ChromeDriver from PATH: {path_error}")
                print("Please ensure ChromeDriver is installed and available in PATH")
                print("You can download ChromeDriver from: https://chromedriver.chromium.org/")
                raise path_error
        self.wait = WebDriverWait(self.driver, 10)
        self.driver.implicitly_wait(10)
        
        # Set base URL from environment or default to localhost
        self.base_url = os.getenv('BASE_URL', 'http://localhost:5173')
        
        yield  # This is where the test runs
        
        # Teardown after test
        self.driver.quit()
    
    def navigate_to(self, path=""):
        """Navigate to a specific path on the site"""
        url = f"{self.base_url}{path}"
        self.driver.get(url)
        # Wait for page to load
        self.wait.until(lambda driver: driver.execute_script("return document.readyState") == "complete")
    
    def find_element(self, locator):
        """Find a single element with explicit wait"""
        return self.wait.until(EC.presence_of_element_located(locator))
    
    def find_clickable_element(self, locator):
        """Find an element that is clickable"""
        return self.wait.until(EC.element_to_be_clickable(locator))
    
    def find_visible_element(self, locator):
        """Find an element that is visible"""
        return self.wait.until(EC.visibility_of_element_located(locator))
    
    def wait_for_text_to_be_present_in_element(self, locator, text):
        """Wait for text to be present in an element"""
        return self.wait.until(EC.text_to_be_present_in_element(locator, text))
    
    def wait_for_url_to_contain(self, url_fragment):
        """Wait for URL to contain specific fragment"""
        return self.wait.until(EC.url_contains(url_fragment))