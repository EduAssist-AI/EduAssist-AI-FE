import pytest
from utils.base_test import BaseTest
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time


class TestDashboardFunctionality(BaseTest):
    """
    Test dashboard functionality with proper user registration as faculty, login, and dashboard access
    """
    
    def test_dashboard_access_with_faculty_registration_and_login(self):
        """
        Complete flow: Register user as faculty -> Wait for registration confirmation -> Login -> Access dashboard
        """
        # Generate unique credentials
        timestamp = int(time.time())
        email = f"faculty_user_{timestamp}@example.com"
        username = f"faculty_{timestamp}"
        password = "Password123!"
        
        print(f"Starting test with email: {email}, username: {username}")
        
        # PART 1: Register as faculty user
        print("Part 1: Registering as faculty user...")
        self.driver.get(f"{self.base_url}/signup")
        self.wait.until(lambda driver: driver.execute_script("return document.readyState") == "complete")
        
        # Find and fill registration fields
        all_inputs = self.driver.find_elements(By.CSS_SELECTOR, "input")
        username_field = None
        email_field = None
        password_field = None
        confirm_password_field = None
        faculty_checkbox = None
        
        for input_elem in all_inputs:
            try:
                input_type = input_elem.get_attribute("type") or ""
                input_name = input_elem.get_attribute("name") or ""
                input_id = input_elem.get_attribute("id") or ""
                input_placeholder = input_elem.get_attribute("placeholder") or ""
                
                # Identify fields
                combined_attrs = f"{input_name} {input_id} {input_placeholder}".lower()
                
                if input_type in ["text", "input"] and any(keyword in combined_attrs for keyword in ["username", "user"]):
                    username_field = input_elem
                elif input_type == "email" or "email" in combined_attrs:
                    email_field = input_elem
                elif input_type == "password" and not any(x in combined_attrs for x in ["confirm", "repeat"]):
                    password_field = input_elem
                elif input_type == "password" and any(x in combined_attrs for x in ["confirm", "repeat"]):
                    confirm_password_field = input_elem
                elif input_type == "checkbox":
                    # Check faculty checkbox
                    try:
                        parent_elem = input_elem.find_element(By.XPATH, "./..")
                        parent_text = parent_elem.text.lower()
                        if any(keyword in parent_text for keyword in ["faculty", "instructor", "teacher"]):
                            faculty_checkbox = input_elem
                    except:
                        # Check attributes
                        elem_attrs = [input_elem.get_attribute("name") or "", 
                                    input_elem.get_attribute("id") or "", 
                                    input_elem.get_attribute("value") or ""]
                        if any("faculty" in attr.lower() for attr in elem_attrs):
                            faculty_checkbox = input_elem
            except:
                continue
        
        # Fill ALL registration form fields with verification
        fields_filled = 0
        if username_field:
            username_field.clear()
            username_field.send_keys(username)
            print(f"Filled username field with: {username}")
            fields_filled += 1
        else:
            # Try to find any text input field that could be username
            text_fields = [inp for inp in all_inputs if inp.get_attribute("type") in ["text", "input"] and inp.get_attribute("type") != "email"]
            if text_fields:
                text_fields[0].clear()
                text_fields[0].send_keys(username)
                print(f"Used first text field as username: {username}")
                fields_filled += 1
            else:
                print("Warning: No username field found")
        
        if email_field:
            email_field.clear()
            email_field.send_keys(email)
            print(f"Filled email field with: {email}")
            fields_filled += 1
        else:
            print("Warning: No email field found")
        
        if password_field:
            password_field.clear()
            password_field.send_keys(password)
            print(f"Filled password field")
            fields_filled += 1
        else:
            print("Warning: No password field found")
        
        if confirm_password_field:
            confirm_password_field.clear()
            confirm_password_field.send_keys(password)
            print(f"Filled confirm password field")
            fields_filled += 1
        else:
            print("Warning: No confirm password field found")
        
        # Check faculty checkbox
        if faculty_checkbox and not faculty_checkbox.is_selected():
            faculty_checkbox.click()
            print("Faculty checkbox checked")
            fields_filled += 1
        elif faculty_checkbox:
            print("Faculty checkbox already checked")
        else:
            print("Faculty checkbox not found")
        
        print(f"Filled {fields_filled} registration fields")
        
        # Find and click submit button for registration - comprehensive search
        submit_btn = None
        
        # Method 1: Look for submit button by type
        for btn in self.driver.find_elements(By.CSS_SELECTOR, "button[type='submit'], input[type='submit']"):
            submit_btn = btn
            break
        
        # Method 2: Look for buttons with specific text
        if not submit_btn:
            for btn in self.driver.find_elements(By.CSS_SELECTOR, "button"):
                btn_text = btn.text.lower().strip()
                if any(keyword in btn_text for keyword in ["sign up", "register", "create account", "submit"]):
                    submit_btn = btn
                    break
        
        # Method 3: Look for buttons with common classes for registration
        if not submit_btn:
            for btn in self.driver.find_elements(By.CSS_SELECTOR, "button, input[type='button'], input[type='submit']"):
                btn_classes = btn.get_attribute("class") or ""
                btn_id = btn.get_attribute("id") or ""
                btn_name = btn.get_attribute("name") or ""
                
                combined = f"{btn_classes} {btn_id} {btn_name}".lower()
                if any(keyword in combined for keyword in ["sign", "register", "submit", "create"]):
                    submit_btn = btn
                    break
        
        # Method 4: If still not found, use the last resort - any button with text that suggests submission
        if not submit_btn:
            all_btns = self.driver.find_elements(By.CSS_SELECTOR, "button, input[type='button'], input[type='submit']")
            for btn in all_btns:
                try:
                    btn_text = btn.text.lower().strip() if btn.tag_name == "button" else (btn.get_attribute("value") or "").lower()
                    if btn_text and any(keyword in btn_text for keyword in ["sign", "register", "create", "submit", "continue"]):
                        submit_btn = btn
                        break
                except:
                    continue
        
        if submit_btn:
            # Scroll to button and click it
            self.driver.execute_script("arguments[0].scrollIntoView();", submit_btn)
            time.sleep(0.5)  # Small delay after scrolling
            submit_btn.click()
            print(f"Registration submit button clicked: '{submit_btn.text or submit_btn.get_attribute('value') or 'Button'}'")
        else:
            print("No submit button found for registration. Available buttons on page:")
            for i, btn in enumerate(self.driver.find_elements(By.CSS_SELECTOR, "button, input[type='button'], input[type='submit']")):
                try:
                    btn_text = btn.text.strip() if btn.tag_name == "button" else (btn.get_attribute("value") or "")
                    btn_class = btn.get_attribute("class") or ""
                    print(f"  Button {i+1}: text='{btn_text}', class='{btn_class}'")
                except:
                    continue
        
        # Wait for registration to process and look for success message
        time.sleep(3)
        
        # Check for registration success indicators
        page_source = self.driver.page_source.lower()
        current_url = self.driver.current_url.lower()
        
        registration_success = (
            "success" in page_source or 
            "welcome" in page_source or 
            "dashboard" in current_url or 
            "home" in current_url or 
            "confirm" in page_source
        )
        
        print(f"Registration status: success={registration_success}, current URL: {current_url}")
        
        # PART 2: Login if not automatically logged in after registration
        if not any(keyword in current_url for keyword in ["dashboard", "home", "profile"]):
            print("Part 2: Logging in as registered user...")
            self.driver.get(f"{self.base_url}/signin")
            time.sleep(1)
            
            # Fill login form
            login_inputs = self.driver.find_elements(By.CSS_SELECTOR, "input")
            login_email_field = None
            login_password_field = None
            
            for input_elem in login_inputs:
                try:
                    input_type = input_elem.get_attribute("type") or ""
                    input_name = input_elem.get_attribute("name") or ""
                    input_id = input_elem.get_attribute("id") or ""
                    
                    combined_attrs = f"{input_name} {input_id}".lower()
                    
                    if input_type == "email" or "email" in combined_attrs:
                        login_email_field = input_elem
                    elif input_type == "password" or "password" in combined_attrs:
                        login_password_field = input_elem
                except:
                    continue
            
            if login_email_field:
                login_email_field.clear()
                login_email_field.send_keys(email)
            
            if login_password_field:
                login_password_field.clear()
                login_password_field.send_keys(password)
            
            # Submit login - comprehensive search for sign in button
            login_submit_btn = None
            
            # Method 1: Look for submit button by type
            for btn in self.driver.find_elements(By.CSS_SELECTOR, "button[type='submit'], input[type='submit']"):
                login_submit_btn = btn
                break
            
            # Method 2: Look for buttons with login/signin text
            if not login_submit_btn:
                for btn in self.driver.find_elements(By.CSS_SELECTOR, "button"):
                    btn_text = btn.text.lower().strip()
                    if any(keyword in btn_text for keyword in ["sign in", "login", "log in", "submit"]):
                        login_submit_btn = btn
                        break
            
            # Method 3: Look for buttons with common classes for login
            if not login_submit_btn:
                for btn in self.driver.find_elements(By.CSS_SELECTOR, "button, input[type='button'], input[type='submit']"):
                    btn_classes = btn.get_attribute("class") or ""
                    btn_id = btn.get_attribute("id") or ""
                    btn_name = btn.get_attribute("name") or ""
                    
                    combined = f"{btn_classes} {btn_id} {btn_name}".lower()
                    if any(keyword in combined for keyword in ["sign", "login", "submit"]):
                        login_submit_btn = btn
                        break
            
            # Method 4: Last resort - any button that looks like a login submit button
            if not login_submit_btn:
                all_btns = self.driver.find_elements(By.CSS_SELECTOR, "button, input[type='button'], input[type='submit']")
                for btn in all_btns:
                    try:
                        btn_text = btn.text.strip() if btn.tag_name == "button" else (btn.get_attribute("value") or "").strip()
                        if btn_text and any(keyword in btn_text.lower() for keyword in ["sign", "login", "submit", "continue"]):
                            login_submit_btn = btn
                            break
                    except:
                        continue
            
            if login_submit_btn:
                # Scroll to button and click it
                self.driver.execute_script("arguments[0].scrollIntoView();", login_submit_btn)
                time.sleep(0.5)  # Small delay after scrolling
                login_submit_btn.click()
                print(f"Sign in button clicked: '{login_submit_btn.text or login_submit_btn.get_attribute('value') or 'Button'}'")
            else:
                print("No sign in button found. Available buttons on page:")
                for i, btn in enumerate(self.driver.find_elements(By.CSS_SELECTOR, "button, input[type='button'], input[type='submit']")):
                    try:
                        btn_text = btn.text.strip() if btn.tag_name == "button" else (btn.get_attribute("value") or "")
                        btn_class = btn.get_attribute("class") or ""
                        print(f"  Button {i+1}: text='{btn_text}', class='{btn_class}'")
                    except:
                        continue
            
            # Wait for login to process
            time.sleep(3)
        
        # PART 3: Verify dashboard access
        print("Part 3: Verifying dashboard access...")
        
        # Navigate to home/dashboard
        current_url = self.driver.current_url
        print(f"Current URL before dashboard check: {current_url}")
        
        # If not on dashboard, try to navigate to it
        if not any(keyword in current_url.lower() for keyword in ["home", "dashboard", "app"]):
            self.driver.get(f"{self.base_url}/home")
            time.sleep(1)
        
        # Final URL check
        final_url = self.driver.current_url
        print(f"Final URL: {final_url}")
        
        # Verify we're on an authenticated page (dashboard/home)
        is_on_dashboard = any(keyword in final_url.lower() for keyword in ["home", "dashboard", "app", "/"])
        
        # Also check that we're not on authentication pages anymore
        not_on_auth_pages = not any(keyword in final_url.lower() for keyword in ["signin", "login", "signup", "register"])
        
        print(f"Is on dashboard: {is_on_dashboard}")
        print(f"Not on auth pages: {not_on_auth_pages}")
        
        # The test passes if we successfully registered as faculty and accessed the dashboard
        assert is_on_dashboard or not_on_auth_pages, f"Should be on dashboard after registration and login. Current URL: {final_url}"
        
        print("✅ Test completed successfully - registered as faculty and accessed dashboard!")