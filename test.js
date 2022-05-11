const { expect } = require("chai");
const {puppeteer} = require ("puppeteer");
const { chooseMovieAndSeat } = require ("./lib/commands");

let page;
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
        let actual = await chooseMovieAndSeat(page, today, "19:00", "6", "6");        
        await expect(actual).contain("Электронный билет");
    });
    test("Order a tiket for 21:00 for tomorrow", async()=>{
        let actual = await chooseMovieAndSeat(page, tomorrow, "19:00", "3", "2");        
        await expect(actual).contain("Электронный билет");
    });
    test("Order tiket twice", async()=>{
        await chooseMovieAndSeat(page, tomorrow, "10:00", "10", "1");        
        await page.goto(url); 
        await expect.throws(await chooseMovieAndSeat(page, "10:00", "10", "1"), "The seat has already been taken");
    });
    test("Order a tiket for no available movie", async()=>{
        let actual = await chooseMovieAndSeat(page, today, "10:00", "5", "6");        
        await expect(actual).to.throw(`Sorry! You can't choose this one. Try another.`);
    });
});