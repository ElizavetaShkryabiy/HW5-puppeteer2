let seventeenClockMoovie=`[data-seance-id="122"]`;
let twentyOneClockMoovie=`[data-seance-id="124"]`; 
let tenClockMoovie=`[data-seance-id="96"]`;
let forteenClockMoovie = `[data-seance-id="94"]`;
let nineteenClockMoovie = `[data-seance-id="93"]`;
let date = new Date;
let today = date.getDate();


module.exports = {
    
    chooseMovieAndSeat: async function(page, day, time, row, seat){
        try {    
            let number = Number(day) - today + 1;   
            let daySelector = `a:nth-child(${number})`          
            await page.click(daySelector);            
            let selector = ``;
            if(time === "17:00")  {
                selector = seventeenClockMoovie;
            }
            if(time === "21:00"){selector = twentyOneClockMoovie};
            if(time === "10:00"){selector = tenClockMoovie};
            if(time === "14:00"){selector = forteenClockMoovie};
            if(time === "19:00"){selector = nineteenClockMoovie};
            await page.waitForSelector(selector);            
            await page.click(selector);            
        } catch (error) {
            throw new Error (`Sorry! You can't choose this one. Try another.`);            
        }
        try {
            await page.setDefaultNavigationTimeout(2000); 
            await page.waitForNavigation();
            await page.click(`div:nth-child(${row}) > span:nth-child(${seat})`);
            await page.click("button.acceptin-button");
            await page.waitForNavigation();
            await page.click("button.acceptin-button");            
        } catch (error) {
            throw new Error (`The seat has already been taken`);
        } 
        return await page.$eval("h2", (link) => link.textContent);

    } 

    
}