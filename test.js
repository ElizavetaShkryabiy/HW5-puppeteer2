const { expect, assert } = require("chai");
const {puppeteer} = require ("puppeteer");
const { chooseMovieAndSeat } = require ("./lib/commands");

let page;

let idForFirstMovie = "122";
let idForSecondMovie = "124";
let seat1 = 'div:nth-child(1) > span:nth-child(2)';
let seat2 = 'div:nth-child(6) > span:nth-child(8)';
let seatRepeted = 'div:nth-child(4) > span:nth-child(9)';
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
    test("Order a tiket for 17:00", async()=>{
        let actual = await chooseMovieAndSeat(page, idForFirstMovie, seat1);        
        await expect(actual).contain("Электронный билет");
    });
    test("Order a tiket for 21:00", async()=>{
        let actual = await chooseMovieAndSeat(page, idForSecondMovie, seat2);        
        await expect(actual).contain("Электронный билет");
    });
    test("Order tiket twice", async()=>{
        await chooseMovieAndSeat(page, idForSecondMovie, seatRepeted);        
        await page.goto(url); 
        await expect.throws(await chooseMovieAndSeat(page, idForSecondMovie, seatRepeted), "The seat has already been taken");
    });
    test.only("find", async()=>{
        let actual = await findMovieByTime(page,"17:00")
        await expect(actual).contain("Фильм 1");
    });
});