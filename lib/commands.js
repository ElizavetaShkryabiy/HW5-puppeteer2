let firstMovieSelector=`[data-seance-id="122"]`;
let secondMovieSelector=`[data-seance-id="124"]`; 
let thirdMovieSelector=`[data-seance-id="96"]`;
let date = new Date;
let today = date.getDate();


module.exports = {
    
    chooseMovieAndSeat: async function(page, day, time, seat){
        try {    
            let number = Number(day) - today + 1;  
            console.log(number);      
            let daySelector = `a:nth-child(${number})`          
            await page.click(daySelector);            
            let selector = ``;
            if(time === "17:00")  {
                selector = firstMovieSelector;
            }
            if(time === "21:00"){selector = secondMovieSelector};
            if(time === "10:00"){selector = thirdMovieSelector};
            await page.waitForSelector(selector);            
            await page.click(selector);            
        } catch (error) {
            throw new Error (`Sorry! You can't choose this one. Try another.`);            
        }
        try {
            await page.setDefaultNavigationTimeout(2000); 
            await page.waitForNavigation();            
            await page.click(seat);
            await page.click("button.acceptin-button");
            await page.waitForNavigation();
            await page.click("button.acceptin-button");            
        } catch (error) {
            throw new Error (`The seat has already been taken`);
        } 
        return await page.$eval("h2", (link) => link.textContent);

    } 

    
}