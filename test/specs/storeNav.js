import NavigationTabs from '../pageobjects/navigationTabs.js'
import NavigationSearch from '../pageobjects/navigationSearch.js'
import Carousel from '../pageobjects/carousel.js'
import ContentItems from '../pageobjects/contentItems.js'

describe('Store navigation test', () => {
    it('should click through flyout links Your Store and New & Noteworthy', async() =>{
        await NavigationTabs.openURL()
        await NavigationTabs.flyoutFunction()
        await NavigationTabs.tabsFucntion()
    })
})

describe('Search inside navigation test', () => {
    it('should perfom multiple searches', async() =>{
        await NavigationSearch.openURL()
        await NavigationSearch.searchFunction()
    })
})

describe('Carousel existance test', () => {
    it('should prove the existance of all images in carousel, and that links function', async() =>{
        await Carousel.openURL()
        await Carousel.carouselFunction()
    })
})

describe('Content items testing', () => {
    it('should prove the existance of links, images, and matching information', async() =>{
        await ContentItems.openURL()
        await ContentItems.bottomFunction()
    })
})