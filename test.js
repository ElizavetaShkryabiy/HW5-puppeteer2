const { expect } = require("chai");
const {puppeteer} = require ("puppeteer");
const { chooseMovieAndSeat } = require ("./lib/commands");

let page;

let idForFirstMovie = "123";
let idForSecondMovie = "122";
let seat1 = 'div:nth-child(1) > span:nth-child(2)';
let seat2 = 'div:nth-child(6) > span:nth-child(7)';
let url = "http://qamid.tmweb.ru/client/index.php";

beforeEach(async()=>{
   page = await browser.newPage();
   await page.setDefaultNavigationTimeout(0);
   await page.goto(url);   
});

afterEach(() => {
    page.close();
});

describe("Tikets booking tests", ()=>{
    test.only("Order a tiket for today", async()=>{
        let actual = await chooseMovieAndSeat(page, idForSecondMovie, seat1);        
        await expect(actual).contain("Электронный билет");
    });
    test("Order two tikets for tomorrow", async()=>{
    });
    test("Order tiket twice", async()=>{
    });
});