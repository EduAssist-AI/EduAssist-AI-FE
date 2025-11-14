from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import Select

class SignInPage:
    """
    Page Object Model for Sign In page
    """
    
    def __init__(self, driver, base_url):
        self.driver = driver
        self.base_url = base_url
        self.url = f"{base_url}/signin"
        
        # Locators
        self.email_input = (By.NAME, "email")  # Assuming email field uses name attribute
        self.password_input = (By.NAME, "password")  # Assuming password field uses name attribute
        self.signin_button = (By.XPATH, "//button[contains(text(), 'Sign In')] | //button[@type='submit'] | //button[contains(@class, 'sign')]")
        self.signup_link = (By.LINK_TEXT, "Sign Up")  # Link to sign up page
        self.forgot_password_link = (By.LINK_TEXT, "Forgot Password?")  # Link to forgot password page
        self.error_message = (By.CLASS_NAME, "error-message")  # Common error message class
        self.form_header = (By.TAG_NAME, "h1")  # Header of the form
    
    def navigate(self):
        """Navigate to the sign in page"""
        self.driver.get(self.url)
        WebDriverWait(self.driver, 10).until(EC.url_to_be(self.url))
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
    
    def click_signin_button(self):
        """Click the sign in button"""
        signin_btn = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable(self.signin_button)
        )
        signin_btn.click()
        return self
    
    def click_signup_link(self):
        """Click the signup link to go to sign up page"""
        signup_link = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable(self.signup_link)
        )
        signup_link.click()
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
    
    def get_form_header(self):
        """Get the header text of the form"""
        header = WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located(self.form_header)
        )
        return header.text
    
    def login(self, email, password):
        """Complete login process"""
        self.enter_email(email)
        self.enter_password(password)
        self.click_signin_button()
        return self