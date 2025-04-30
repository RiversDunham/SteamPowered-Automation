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

    //Finsihed
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

    //Times out
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

    //Finished
    async tabsFucntion() {
        const tabElements = await this.tabs

        for(const tabThings of tabElements) {
            await tabThings.isClickable()
            await tabThings.click()
            expect(browser).not.toHaveUrl('https://store.steampowered.com/')
            await browser.back()
        }
    }

    //Nearly finished
    async searchFunction() {

        await this.searchInput.click()
        expect(this.searchInput).not.toHaveAttribute('class', 'default') //search placeholder to dissapear (not working)
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

    //Carousel
    get imageWheel() {
        return $('.home_cluster_ctn.home_ctn .carousel_items.responsive_scroll_snap_ctn')
    }

    get imageFocus() {
        return $('.store_main_capsule.responsive_scroll_snap_start.broadcast_capsule.app_impression_tracked.focus')
    }

    get imageDefault() {
        return $('.store_main_capsule.responsive_scroll_snap_start.broadcast_capsule.app_impression_tracked.focus > .capsule.main_capsule > div:nth-last-child(1)')
    }

    get subImages() {
        return $$('.store_main_capsule.responsive_scroll_snap_start.broadcast_capsule.app_impression_tracked.focus .screenshots > div > div')
    }

    get thumbs() {
        return $$('.home_cluster_ctn.home_ctn .carousel_thumbs > div')
    }

    get thumbsContainer() {
        return $('.home_cluster_ctn.home_ctn .carousel_thumbs');
    }

    get thumbFocus() {
        return $('.home_cluster_ctn.home_ctn .carousel_thumbs > div.focus + div')
    }

    get firstThumb() {
        return $('.home_cluster_ctn.home_ctn .carousel_thumbs > div:nth-child(1)')
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

    //Flinished (enough)
    async carouselFunction() {
        for (let i = 0; i < 12; i ++) {
            await this.imageWheel.moveTo()
            expect(this.imageDefault).toBeDisplayed()
    
            const subImages = await this.subImages
            
            for(let x = 0; x < subImages.length; x ++) {
                const subImage = subImages[x]
                await subImage.moveTo()
    
                const focusedMainImage =  await this.focusImage
                expect(focusedMainImage).toBeDisplayed()
    
                const mainImageAttri = await focusedMainImage.getAttribute('data-background-image-url')
                const subImageAttri = await subImage.getAttribute('data-background-image-url')
    
                expect(mainImageAttri).toEqual(subImageAttri)
            }
            await this.imageFocus.click()
            expect(browser).not.toHaveUrl('https://store.steampowered.com/')
            await browser.back()
            const currentThumb = await this.thumbsContainer.$(`div:nth-child(${i + 1})`);
            await currentThumb.click();

            if (i == 11) {
                await this.rightArrow.click()
                await this.leftArrow.click()
                await this.rightArrow.click()
            } else {
                await this.thumbFocus.click()
                await this.rightArrow.click()
                await this.leftArrow.click()
            }
        }
        //technically index 12 but it's slightly different
        await this.rightArrow.click()
        await this.leftArrow.click()
        await this.firstThumb.click()

        await this.searchForm.moveTo()
        const initalAttr = await this.imageDefault.getAttribute('data-background-image-url')
        while(await this.imageDefault.getAttribute('data-background-image-url') == initalAttr) {
            
        }

        for (let i = 0; i < 11; i ++) {
            
        }
    }

    //module 3
    get leftTabs() {
        return $$('.tab_item.app_impression_tracked')
    }

    get rightTitle() {
        return $('#tab_preview_container .tab_preview.focus h2')
    }

    async bottomFunction() {
        for (let x = 0; x < this.leftTabs.length; x ++) {
            const tab = await this.leftTabs[x]
            const title = await tab.$('.tab_item_name')
            await tab.moveTo()
            expect(tab).toHaveAttribute('class', 'tab_item app_impression_tracked focus')

            expect(title).toBeDisplayed() //game title

            const text = await title.getText()
            const otherText = await this.rightTitle.getText()
            expect(text).toEqual(otherText)
        }
    }
}

export default new HomePage();
