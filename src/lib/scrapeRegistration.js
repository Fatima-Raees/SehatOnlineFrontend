require('chromedriver');
import { Builder, By, until } from "selenium-webdriver";
const chrome = require('selenium-webdriver/chrome');

export async function validatePMCRegistration(registrationNumber, expectedName) {
  let driver;
  try {
    driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(new chrome.Options().headless())
      .build();
    console.log("Navigating to PMC website");
    await driver.get("https://www.pmc.gov.pk/Doctors/Search");
    console.log("Navigated to PMC website, page title:", await driver.getTitle());
    await driver.sleep(2000);

    const inputField = await driver.findElement(By.id("regist_no"));
    console.log("Found registration number input field");
    await inputField.sendKeys(registrationNumber);

    const searchButton = await driver.findElement(By.id("searchButton"));
    console.log("Found search button");
    await driver.executeScript("arguments[0].scrollIntoView();", searchButton);
    await searchButton.click();
    console.log("Clicked search button");

    await driver.wait(until.urlContains("SearchResult"), 10000);
    await driver.wait(until.elementLocated(By.id("doctors_data")), 10000);

    const table = await driver.findElement(By.id("doctors_data"));
    const tbody = await table.findElement(By.css("tbody"));
    const rows = await tbody.findElements(By.css("tr"));

    if (rows.length === 0) {
      throw new Error("No doctor found with this registration number.");
    }

    const firstRowTds = await rows[0].findElements(By.css("td"));
    if (firstRowTds.length < 3) {
      throw new Error("Invalid table structure.");
    }

    const name = await firstRowTds[2].getText();
    console.log(`Extracted name: "${name}"`);

    return name.trim().toLowerCase() === expectedName.trim().toLowerCase();
  } catch (error) {
    console.error("Scraping error:", error);
    throw new Error(`Failed to validate registration: ${error.message}`);
  } finally {
    if (driver) {
      await driver.quit();
    }
  }
}