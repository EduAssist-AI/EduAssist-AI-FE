from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class SignUpPage:
    """
    Page Object Model for Sign Up page
    """
    
    def __init__(self, driver, base_url):
        self.driver = driver
        self.base_url = base_url
        self.url = f"{base_url}/signup"
        
        # Locators
        self.first_name_input = (By.NAME, "firstName")  # Adjust based on actual field name
        self.last_name_input = (By.NAME, "lastName")  # Adjust based on actual field name
        self.email_input = (By.NAME, "email")  # Email field
        self.password_input = (By.NAME, "password")  # Password field
        self.confirm_password_input = (By.NAME, "confirmPassword")  # Confirm password field
        self.signup_button = (By.XPATH, "//button[contains(text(), 'Sign Up')] | //button[@type='submit'] | //button[contains(@class, 'sign')]")
        self.signin_link = (By.LINK_TEXT, "Sign In")  # Link to sign in page
        self.error_message = (By.CLASS_NAME, "error-message")  # Error message container
        self.success_message = (By.CLASS_NAME, "success-message")  # Success message container
        self.form_header = (By.TAG_NAME, "h1")  # Header of the form
    
    def navigate(self):
        """Navigate to the sign up page"""
        self.driver.get(self.url)
        WebDriverWait(self.driver, 10).until(EC.url_to_be(self.url))
        return self
    
    def enter_first_name(self, first_name):
        """Enter first name"""
        first_name_field = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable(self.first_name_input)
        )
        first_name_field.clear()
        first_name_field.send_keys(first_name)
        return self
    
    def enter_last_name(self, last_name):
        """Enter last name"""
        last_name_field = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable(self.last_name_input)
        )
        last_name_field.clear()
        last_name_field.send_keys(last_name)
        return self
    
    def enter_email(self, email):
        """Enter email address"""
        email_field = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable(self.email_input)
        )
        email_field.clear()
        email_field.send_keys(email)
        return self
    
    def enter_password(self, password):
        """Enter password"""
        password_field = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable(self.password_input)
        )
        password_field.clear()
        password_field.send_keys(password)
        return self
    
    def enter_confirm_password(self, confirm_password):
        """Enter confirm password"""
        confirm_password_field = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable(self.confirm_password_input)
        )
        confirm_password_field.clear()
        confirm_password_field.send_keys(confirm_password)
        return self
    
    def click_signup_button(self):
        """Click the sign up button"""
        signup_btn = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable(self.signup_button)
        )
        signup_btn.click()
        return self
    
    def click_signin_link(self):
        """Click the sign in link to go back to sign in page"""
        signin_link = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable(self.signin_link)
        )
        signin_link.click()
        return self
    
    def get_error_message(self):
        """Get the error message if present"""
        try:
            error = WebDriverWait(self.driver, 5).until(
                EC.presence_of_element_located(self.error_message)
            )
            return error.text
        except:
            return None
    
    def get_success_message(self):
        """Get the success message if present"""
        try:
            success = WebDriverWait(self.driver, 5).until(
                EC.presence_of_element_located(self.success_message)
            )
            return success.text
        except:
            return None
    
    def get_form_header(self):
        """Get the header text of the form"""
        header = WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located(self.form_header)
        )
        return header.text
    
    def register(self, first_name, last_name, email, password, confirm_password):
        """Complete registration process"""
        self.enter_first_name(first_name)
        self.enter_last_name(last_name)
        self.enter_email(email)
        self.enter_password(password)
        self.enter_confirm_password(confirm_password)
        self.click_signup_button()
        return self