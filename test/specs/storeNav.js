import HomePage from '../pageobjects/homePage.js'

/*describe('Store navigation test', () => {
    it('should click through flyout links Your Store and New & Noteworthy', async() =>{
        await HomePage.openURL()
        await HomePage.flyoutFunction()
    })
})*/

describe('Carousel existance test', () => {
    it('should prove the existance of all images in carousel, and that links function', async() =>{
        await HomePage.openURL()
        await HomePage.carouselFunction()
    })
})

/*describe('Store navigation test', () => {
    it('should click through flyout links Categories', async() =>{
        await HomePage.openURL()
        await HomePage.flyoutGenres()
    })
})*/