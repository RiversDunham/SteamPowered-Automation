import HomePage from '../pageobjects/homePage.js'

/*describe('Store navigation test', () => {
    it('should click through flyout links Your Store and New & Noteworthy', async() =>{
        await HomePage.openURL()
        await HomePage.flyoutFunction()
    })
})

describe('Store navigation tabs', () => {
    it('should clcik the three tabs to ensure they dont 404', async() =>{
        await HomePage.openURL()
        await HomePage.tabsFucntion()
    })
})

describe('Search inside navigation test', () => {
    it('should perfom multiple searches', async() =>{
        await HomePage.openURL()
        await HomePage.searchFunction()
    })
})

describe('Carousel existance test', () => {
    it('should prove the existance of all images in carousel, and that links function', async() =>{
        await HomePage.openURL()
        await HomePage.carouselFunction()
    })
})*/

describe('Bottoms tabby tetsing', () => {
    it('should prove the existance of links, images, and matching information', async() =>{
        await HomePage.openURL()
        await HomePage.bottomFunction()
    })
})