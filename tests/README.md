# Selenium Test Suite for EduAssist-AI-FE

This directory contains automated functional tests for the EduAssist-AI-FE application using Selenium WebDriver.

## Setup

1. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Make sure you have Chrome browser installed on your system.

3. Set up environment variables in the `.env` file (copy from `.env.example` if available):
   ```
   BASE_URL=http://localhost:5173
   HEADLESS=false
   TEST_USER_EMAIL=your_test_email@example.com
   TEST_USER_PASSWORD=your_test_password
   ```

## Running Tests

1. Start the EduAssist-AI-FE application in development mode:
   ```bash
   npm run dev
   ```

2. Run all tests:
   ```bash
   pytest
   ```

3. Run tests with HTML report:
   ```bash
   pytest --html=reports/report.html
   ```

4. Run specific test file:
   ```bash
   pytest tests/tests/test_authentication.py
   ```

5. Run tests in headless mode:
   ```bash
   HEADLESS=true pytest
   ```

6. Run tests with verbose output:
   ```bash
   pytest -v
   ```

## Test Structure

- `pages/` - Page Object Model implementations
- `tests/` - Test case implementations
- `utils/` - Utility functions and base classes
- `reports/` - Test reports (generated during test execution)

## Available Test Categories

- Authentication tests (sign up, sign in, logout)
- Dashboard/home page functionality
- Course and module navigation
- Profile management
- Form elements
- Calendar functionality
- Video and image components

## Writing New Tests

1. Add new page objects to the `pages/` directory
2. Create new test files in the `tests/` directory
3. Follow the Page Object Model pattern for consistency
4. Use the BaseTest class for common functionality
5. Follow naming conventions (test_*.py for test files)