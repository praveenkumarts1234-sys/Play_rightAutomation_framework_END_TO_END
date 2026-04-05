// @ts-check
import { test, expect } from '@playwright/test';

test('basic page load', async ({ page }) => {

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

// test('button click', async ({ page }) => {
//     await page.goto('https://the-internet.herokuapp.com/');
//     await page.click('a[href="/add_remove_elements/"]');
//     await expect(page.locator('h3')).toHaveText('Add/Remove Elements');
// });


