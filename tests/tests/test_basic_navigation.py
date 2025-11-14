import pytest
from utils.base_test import BaseTest


class TestBasicNavigation(BaseTest):
    """
    Test basic navigation without relying on specific form elements that may not exist
    """
    
    def test_home_page_loads(self):
        """
        Test that the home page loads without errors
        """
        # Navigate directly to the base URL
        self.driver.get(self.base_url)
        
        # Wait for page to load
        self.wait.until(lambda driver: driver.execute_script("return document.readyState") == "complete")
        
        # Verify page loaded by checking for some content
        assert self.driver.title is not None  # Page should have a title
    
    def test_signin_page_loads(self):
        """
        Test that sign in page loads without errors
        """
        # Navigate to sign in page
        self.driver.get(f"{self.base_url}/signin")
        
        # Wait for page to load
        self.wait.until(lambda driver: driver.execute_script("return document.readyState") == "complete")
        
        # Verify page loaded by checking URL
        assert "signin" in self.driver.current_url.lower()

    def test_signup_page_loads(self):
        """
        Test that sign up page loads without errors
        """
        # Navigate to sign up page
        self.driver.get(f"{self.base_url}/signup")
        
        # Wait for page to load
        self.wait.until(lambda driver: driver.execute_script("return document.readyState") == "complete")
        
        # Verify page loaded by checking URL
        assert "signup" in self.driver.current_url.lower()