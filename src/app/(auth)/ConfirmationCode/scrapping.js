import { Builder, By, Key, until } from "selenium-webdriver";

async function searchDoctor() {
  
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    
    await driver.get("https://www.pmc.gov.pk/Doctors/Search");
    await driver.sleep(2000); 
    let inputField = await driver.findElement(By.id("regist_no"));
    await inputField.sendKeys("78897-P");
    let searchButton = await driver.findElement(By.id("searchButton"));
    await driver.executeScript("arguments[0].scrollIntoView();", searchButton);
    await searchButton.click();
    console.log("Search button clicked successfully!");
    await driver.sleep(3000);
    let currentUrl = await driver.getCurrentUrl();
    let result = currentUrl === "https://www.pmc.gov.pk/Doctors/SearchResult";

    if (result) {
      console.log("Search successful, redirected to results page.");
    } else {
      console.log(" Search failed, still on the same page.");
    }

    return result;
  } catch (error) {
    console.error("Element not found or an error occurred!", error);
    return false;
  } finally {
    await driver.quit();
  }
}

searchDoctor().then((result) => console.log("Result:", result));
