import Base from './base.js'
import {$, $$} from '@wdio/globals'
import {Key} from 'webdriverio'

class HomePage extends Base {

    openURL(endpoint) {
        return super.openURL(endpoint)
    }

   get flyoutTabs() {
        return $$('.store_nav > .tab.flyout_tab')
   }
   get foryouFlyoutLinks() {
        return $$('.store_nav #foryou_flyout a')
   }
   get newAndNoteLinks() {
        return $$('.store_nav #noteworthy_flyout a')
   }
   get genreFlyoutLinks() {
        return $$('.store_nav #genre_flyout a')
   }
   get surfaceLinks() {
        return $$('.store_nav > a')
    }

    get tabs() {
        return $$('.store_nav a.tab')
    }

    get searchForm() {
        return $('#searchform')
    }
    get searchInput() {
        return $('#store_nav_search_term')
    }

    get suggestions() {
        return $('#search_suggestion_contents')
    }

    get magnifiyingGlass() {
        return $('#store_search_link > img')
    }

    async flyoutFunction() {
        console.log("Flyout Funtion Run")
        const flyoutElements = await this.flyoutTabs

        for(let x = 0; x < flyoutElements.length; x ++) {
                const flyout = 0

                await flyoutElements[x].moveTo()

                if(x == 0) {
                    const forYouLinks = await this.foryouFlyoutLinks
                    for(const link of forYouLinks) {
                        await link.isClickable()
                        await link.click()
                        expect(browser).not.toHaveUrl('https://store.steampowered.com/')
                        await browser.back()
                        await flyoutElements[x].moveTo()
                    }
                }
                if(x == 1) {
                    const notesLinks = await this.newAndNoteLinks
                    for(const link of notesLinks) {
                        await link.isClickable()
                        await link.click()
                        expect(browser).not.toHaveUrl('https://store.steampowered.com/')
                        await browser.back()
                        await flyoutElements[x].moveTo()
                    }
                }
        }
    }

    async flyoutGenres() {
        const flyoutElements = await this.flyoutTabs

        for(let x = 0; x < flyoutElements.length; x ++) {

                await flyoutElements[x].moveTo()

                if(x == 0) {
                    break
                }
                if(x == 1) {
                    break
                }
                if(x == 2) {
                    const genreLinks = await this.genreFlyoutLinks
                    for(const link of genreLinks) {
                        await link.isClickable()
                        await link.click()
                        expect(browser).not.toHaveUrl('https://store.steampowered.com/')
                        await browser.back()
                        await flyoutElements[x].moveTo()
                    }
                }
        }
    }

    //not working?
    async tabsFucntion() {
        const tabElements = await this.tabs

        for(tabThings of tabElements) {
            await tabThings.isClickable()
            await tabThings.click()
            expect(browser).not.toHaveUrl('https://store.steampowered.com/')
            await browser.back()
        }
    }

    async searchFunction() {

        await this.searchInput.click()
        expect(this.searchInput).toHaveAttribute('class', '') //search placeholder to dissapear (not working)
        await this.searchInput.setValue('raft')
        expect(this.suggestions).toBeExisting({timeout : 5000})
        await browser.keys('Enter')
        expect(browser).toHaveUrl(expect.stringContaining('https://store.steampowered.com/search/'))
        await browser.back()
        await this.searchInput.setValue('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') //max len +2
        await browser.keys('Enter')
        expect(browser).toHaveUrl(expect.stringContaining('https://store.steampowered.com/search/'))
        await browser.back()
        //this is where i would test for the little x thing that appears but idk how to get the selector
        await this.searchInput.setValue('!@#$%^&*()-_=+\|[]{};:/><')
        expect(this.suggestions).toBeExisting({timeout : 5000})
        expect(this.searchInput).toHaveValue('!@#$%^&*()-_=+\|[]{};:/><')
        await browser.keys('Enter')
        expect(browser).toHaveUrl(expect.stringContaining('https://store.steampowered.com/search/'))

        //second time (clicking magnifiying glass)
        await this.searchInput.click()
        expect() //search placeholder to dissapear
        await this.searchInput.setValue('raft')
        expect(this.suggestions).toBeExisting({timeout : 5000})
        await this.magnifiyingGlass.click()
        expect(browser).toHaveUrl(expect.stringContaining('https://store.steampowered.com/search/'))
        await browser.back()
        await this.searchInput.setValue('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') //max len +2
        await this.magnifiyingGlass.click()
        expect(browser).toHaveUrl(expect.stringContaining('https://store.steampowered.com/search/'))
        await browser.back()
        //this is where i would test for the little x thing that appears but idk how to get the selector
        await this.searchInput.setValue('!@#$%^&*()-_=+\|[]{};:/><')
        expect(this.suggestions).toBeExisting({timeout : 5000})
        expect(this.searchInput).toHaveValue('!@#$%^&*()-_=+\|[]{};:/><')
        await this.magnifiyingGlass.click()
        expect(browser).toHaveUrl(expect.stringContaining('https://store.steampowered.com/search/'))
    }

    //Nearly Complete
    get imageWheel() {
        return $('.home_cluster_ctn.home_ctn .carousel_items.responsive_scroll_snap_ctn')
    }

    get imageFocus() {
        return $('.store_main_capsule.responsive_scroll_snap_start.broadcast_capsule.app_impression_tracked.focus')
    }

    get subImages() {
        return $$('.store_main_capsule.responsive_scroll_snap_start.broadcast_capsule.app_impression_tracked.focus .screenshots > div > div')
    }

    get thumbs() {
        return $$('.home_cluster_ctn.home_ctn .carousel_thumbs > div')
    }

    get thumbFocus() {
        return $('.home_cluster_ctn.home_ctn .carousel_thumbs > div.focus + div')
    }

    get rightArrow() {
        return $('.home_cluster_ctn.home_ctn .arrow.right')
    }

    get leftArrow() {
        return $('.home_cluster_ctn.home_ctn .arrow.left')
    }

    get focusImage() {
        return $('.carousel_items.responsive_scroll_snap_ctn .screenshot.focus');
    }

    async carouselFunction() {
        for (let i = 0; i < 11; i ++) {
            await this.imageWheel.moveTo()
            expect(this.imageDefault).toBeDisplayed()
    
            const subImages = await this.subImages
            
            for(let x = 0; x < subImages.length; x ++) {
                const subImage = subImages[x]
                await subImage.moveTo()
    
                const focusedMainImage =  await this.focusImage
                await expect(focusedMainImage).toBeDisplayed()
    
                const mainImageAttri = await focusedMainImage.getAttribute('data-background-image-url')
                const subImageAttri = await subImage.getAttribute('data-background-image-url')
    
                await expect(mainImageAttri).toEqual(subImageAttri)
            }
            await this.rightArrow.click()
            await this.leftArrow.click()
            await this.thumbFocus.click()
        }
        await this.searchForm.moveTo()
        await browser.pause(5000)
    }
}

export default new HomePage();
