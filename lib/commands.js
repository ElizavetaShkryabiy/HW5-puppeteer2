module.exports = {
    chooseMovieAndSeat: async function(page, seanceId, seat){
        try {
            let today = new Date();
            let tomorrow = today.getDate() + 1;
            await page.click("a:nth-child(3)");
            let selector = `[data-seance-id="${seanceId}"]`;
            console.log(selector)            
            await page.waitForSelector(selector);            
            await page.click(selector);            
        } catch (error) {
            throw new Error (`No movie was found with this id: ${seanceId}`);            
        }
        // // try {
        //     let title = page.$("h1").textContent;
        //     console.log(page.url())
        //     await page.click(seat);
        //     await page.click(".acception-button");
        // // } catch (error) {
        // //     throw new Error (`The seat has already been taken`);
        // // }
        // await page.waitForSelector("h2").toContain("Вы выбрали билеты:");
        // await page.click("acception-button");
        return await page.$eval("h2", (link) => link.textContent);

    }    
}