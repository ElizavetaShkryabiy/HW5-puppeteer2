const puppeteer = require("puppeteer");
const chai = require("chai");
const { Given, When, Then, Before, After } = require("cucumber");

Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("user is on page", async function () {
  return await this.page.goto("http://qamid.tmweb.ru/client/index.php", {
    setTimeout: 20000,
  });
});

When("user choose a {date} date, {time} and {row} th row and {seat} th seat for a seance", async function(date, time, row, seat){
    return await chooseMovieAndSeat(this.page, date, time, row, seat);
})

Then("user sees page which contains text {Электронный билет}", async function (string) {
  let actual = await chooseMovieAndSeat(this.page, today, "17:00", seat1);
  const expected = await string;
  expect(actual).contains(expected);
});
