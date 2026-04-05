// importing the test and expect functions from the Playwright testing library to write our test cases. The test function is used to define a test case, and the expect function is used for assertions to verify the expected outcomes of our tests.
import { test, expect, browser } from '@playwright/test';

test('Playwright browser launch and other basic operations', async ({ browser }) => {

    // Launch the browser and navigate to the URL
    const page = await browser.newPage();

    // Navigate to the URL
    await page.goto('https://the-internet.herokuapp.com/');

    // page will wait until the network is idle, meaning that there are no ongoing network requests for a certain period of time. This is useful to ensure that the page has fully loaded before proceeding with any further actions or assertions in the test.
    await page.waitForLoadState('networkidle');

});

test('URL navigation and page title verification', async ({ page }) => {

    //Launching the brower and navigating to the URL and verifying the title of the page printing the title of the page

    // Launch the browser and navigate to the URL
    await page.goto('https://demoqa.com/');

    // Get the title of the page and print it
    const pageTitle = await page.title();
    console.log(pageTitle);

    // Verify the title of the page
    await expect(page).toHaveTitle('demosite');

    // Wait for 5 seconds to see the result
    await page.waitForTimeout(5000);
});

test('Playwright fill, click, and wait operations', async ({ page }) => {

    // Launch the browser and navigate to the URL
    await page.goto('https://demoqa.com/automation-practice-form');

    //storing all details in variables to fill the form
    const firstname = "John Doe";
    const latName = 'Smith';
    const email = 'john.doe@example.com';

    //Ui actions of playwright to fill the form and click the submit button

    //playwright fill method is used to fill the input field with the specified value. In this case, it is filling the input field with the id "firstName" with the value stored in the variable firstname, which is "John Doe". This simulates a user typing "John Doe" into the first name input field on the web page.
    await page.locator("#firstName").fill(firstname);
    await page.locator("#lastName").fill(latName);
    await page.locator("#userEmail").fill(email);

    //playwright click method is used to simulate a click action on the element that matches the specified selector. 
    await page.locator("#submit").click();
    await page.waitForLoadState('networkidle');

});

test('Playwright drop down selections explanation', async ({ page }) => {

    /*Selecting items from a dropdown is a very common task.
     In Playwright, the approach depends on whether you are dealing with a standard HTML <select> element or 
     a custom dropdown (like those made with React, Vue, or Tailwind).*/


    // 1. Standard <select> Elements by using selectOption method by passing the value, label, or index of the option you want to select. For example:

    //BY VALUE
    await page.goto('https://www.globalsqa.com/demo-site/select-dropdown-menu/');
    await page.locator('select').selectOption('India');

    //BY LABEL
    await page.locator('select').selectOption({ label: 'India' });

    //BY INDEX
    await page.locator('select').selectOption({ index: 2 });

    // 2. Custom Dropdowns: For custom dropdowns, you typically need to click on the dropdown to open it and then click on the desired option. For example:
    await page.goto('https://react-select.com/home');
    await page.locator('#react-select-3-placeholder').click();
    await page.locator('#react-select-3-option-0').click();

    //3.Using Search/Type to Select: If the dropdown supports searching or typing to filter options, you can use the fill method to type into the dropdown and then select the desired option. For example:
    await page.goto('https://react-select.com/home');
    await page.locator('#react-select-3-placeholder').click();
    await page.locator('#react-select-3-input').fill('India');
    await page.locator('#react-select-3-option-0').click();

    //4. Handling Multi-Select Dropdowns: If the dropdown allows multiple selections, you can use the selectOption method with an array of values, labels, or indices. For example:
    await page.goto('https://www.globalsqa.com/demo-site/select-dropdown-menu/');
    await page.locator('select').selectOption(['India', 'United States']);  

    //5.Forced Selection (The "Hard" Way): If the dropdown is particularly tricky to interact with, you can use JavaScript to directly set the value of the dropdown. This is generally not recommended as it bypasses the normal user interactions, but it can be useful in certain cases. For example:
    await page.goto('https://www.globalsqa.com/demo-site/select-dropdown-menu/');       
    await page.evaluate(() => {
        const select = document.querySelector('select');
        select.value = 'India';
        select.dispatchEvent(new Event('change', { bubbles: true }));
    });

    //6. aassertions to verify the selected option in the dropdown. For example:
    await page.goto('https://www.globalsqa.com/demo-site/select-dropdown-menu/');               
    await page.locator('select').selectOption('India');
    const selectedOption = await page.locator('select').inputValue();
    expect(selectedOption).toBe('India');       

    // Wait for 5 seconds to see the result
    await page.waitForTimeout(5000);

});



