import puppeteer from "puppeteer";
import prompt from "prompt-sync";

// ask the user for the question
const x = new prompt();
const question = x("What is your question?\n");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 720, height: 720 });

  await page.goto(
    `https://you.com/search?q=${question}&FromSearchBar=true&tbm=youchat`,
    {
      waitUntil: "load",
    }
  );

  await page.waitForTimeout(20000);
  // take a screenshot of the answer section element and save it
  await page.screenshot({
    path: "answer.png",
  });

  await browser.close();
})();
