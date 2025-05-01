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

                await flyoutElements[x].moveTo()

                const forYouLinks = await this.foryouFlyoutLinks
                    for(const link of forYouLinks) {
                        await expect(link).not.toHaveHref('https://store.steampowered.com/')
                        await flyoutElements[x].moveTo()
                    }
        }
    }

    //Finished
    async tabsFucntion() {
        const tabElements = await this.tabs

        for(const tabThings of tabElements) {
            await expect(tabThings).not.toHaveHref('https://store.steampowered.com/')
        }
    }

    //Finished
    async searchFunction() {

        await this.searchInput.click()
        expect(this.searchInput).not.toHaveAttribute('class', 'default')

        await this.searchInput.setValue('raft')
        expect(this.suggestions).toBeExisting({timeout : 5000})
        await browser.keys('Enter')

        expect(browser).toHaveUrl(expect.stringContaining('https://store.steampowered.com/search/'))
        await browser.back()
        await this.searchInput.setValue('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')
        await browser.keys('Enter')

        expect(browser).toHaveUrl(expect.stringContaining('https://store.steampowered.com/search/'))
        await browser.back()

        await this.searchInput.setValue('e')
        await this.searchInput.click({x : 80})
        expect(this.searchInput).toHaveValue('')

        await this.searchInput.setValue('!@#$%^&*()-_=+\|[]{};:/><')
        expect(this.suggestions).toBeExisting({timeout : 5000})
        expect(this.searchInput).toHaveValue('!@#$%^&*()-_=+\|[]{};:/><')
        await browser.keys('Enter')

        expect(browser).toHaveUrl(expect.stringContaining('https://store.steampowered.com/search/'))

        //second time (clicking magnifiying glass)
        await this.searchInput.click()
        expect(this.searchInput).not.toHaveAttribute('class', 'default')

        await this.searchInput.setValue('raft')
        expect(this.suggestions).toBeExisting({timeout : 5000})
        await this.magnifiyingGlass.click()

        expect(browser).toHaveUrl(expect.stringContaining('https://store.steampowered.com/search/'))
        await browser.back()
        await this.searchInput.setValue('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')
        await this.magnifiyingGlass.click()

        expect(browser).toHaveUrl(expect.stringContaining('https://store.steampowered.com/search/'))
        await browser.back()

        await this.searchInput.setValue('e')
        await this.searchInput.click({x : 80})
        expect(this.searchInput).toHaveValue('')

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
            await expect(this.imageWheel).not.toHaveHref('https://store.steampowered.com/')
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
    }

    //module 3
    get leftTabs() {
        return $$('#tab_newreleases_content .tab_content_items > a')
    }

    get tags() {
        return $$('#tab_newreleases_content .tab_content_items > a.tab_item.app_impression_tracked.focus .tab_item_top_tags span')
    }

    get tagsR() {
        return $$('.home_rightcol .tab_preview.focus a')
    }

    get rightTitle() {
        return $('#tab_preview_container .tab_preview.focus h2')
    }

    get seeMoreButtons() {
        return $$('.home_tabs_content .tab_see_more a')
    }

    get mainTabs() {
        return $$('.home_tabs_row > div')
    }


    //In theroy should be working
    async bottomFunction() {

        await browser.execute(() => window.scrollTo(0, 3000))
        
        for (let y = 1; y < this.mainTabs.length; y ++) {
            
            for (let x = 0; x < this.leftTabs.length; x ++) {
                const tab = this.leftTab[x]

                await tab.moveTo()
                await expect(tab).toHaveAttribute('class', 'tab_item app_impression_tracked focus')

                for (let i = 0; i < this.tags.length; i ++) {
                    expect(await this.tags[i].getText()).toEqual(await this.tagsR[i].getText())
                    await expect(this.tagsR[i]).not.toHaveHref('https://store.steampowered.com/')
                }
                await expect(tab).not.toHaveHref('https://store.steampowered.com/')
            }
            const theButtons = this.seeMoreButtons
            for (let i = 0; i < theButtons.length; i ++) {
                if (theButtons[i].isDisplayed()) {
                    await expect(theButtons[i]).not.toHaveHref('https://store.steampowered.com/')
                }
            }
            await this.mainTabs[y].click()
        }
    }       
}

export default new HomePage();
