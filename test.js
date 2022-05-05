const { expect, assert } = require("chai");
const { test } = require("chai/lib/chai/utils");
const {puppeteer} = require ("puppeteer");
const { chooseMovieAndSeat } = require ("./lib/commands");

let page;
let seat1 = 'div:nth-child(1) > span:nth-child(2)';
let seat2 = 'div:nth-child(6) > span:nth-child(8)';
let seatRepeted = 'div:nth-child(4) > span:nth-child(9)';
let url = "http://qamid.tmweb.ru/client/index.php";
let date = new Date;
let today = date.getDate();
let tomorrow = today + 1;

beforeEach(async()=>{
   page = await browser.newPage();
   await page.setDefaultNavigationTimeout(0);
   await page.goto(url);   
});

afterEach(() => {
    page.close();
});

describe("Tikets booking tests", ()=>{
    test("Order a tiket for 17:00", async()=>{
        let actual = await chooseMovieAndSeat(page, today, "17:00", seat1);        
        await expect(actual).contain("Электронный билет");
    });
    test("Order a tiket for 21:00 for tomorrow", async()=>{
        let actual = await chooseMovieAndSeat(page, tomorrow, "21:00", seat2);        
        await expect(actual).contain("Электронный билет");
    });
    test("Order tiket twice", async()=>{
        await chooseMovieAndSeat(page, tomorrow, "10:00", seatRepeated);        
        await page.goto(url); 
        await expect.throws(await chooseMovieAndSeat(page, "10:00", seatRepeted), "The seat has already been taken");
    });
    test("Order a tiket for no available movie", async()=>{
        let actual = await chooseMovieAndSeat(page, today, "21:00", seat2);        
        await expect(actual).to.throw(`Sorry! You can't choose this one. Try another.`);
    });
});