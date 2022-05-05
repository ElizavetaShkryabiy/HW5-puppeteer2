module.exports = {
    chooseMovieAndSeat: async function(page, seanceId, seat){
        try {            
            await page.click("a:nth-child(3)");            
            let selector = `[data-seance-id="${seanceId}"]`;          
            await page.waitForSelector(selector);            
            await page.click(selector);            
        } catch (error) {
            throw new Error (`No movie was found with this id: ${seanceId}`);            
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

    }  , 
    findMovieByTime: async function(page,text){
        let element = await page.$eval("movie-seances__time", el => el.innerText ==text)
        console.log(element)
        return await page.$eval("h2", (link) => link.textContent);
    } 
}