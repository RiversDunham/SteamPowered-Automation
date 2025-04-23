import HomePage from '../pageobjects/homePage.js'

describe('Store navigation test', () => {
    it('should click flyouts to ensure they dont 404', async() =>{
        await HomePage.openURL()
        await HomePage.flyoutFunction
        /*const links = await HomePage.surfaceLinks
        for(let x = 0; x < links.length; x ++) {
            await HomePage.surfaceLinksFunction(x)
        }*/
    })
})
