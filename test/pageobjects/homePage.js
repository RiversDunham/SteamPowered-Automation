import Base from './base.js';
import {$, $$} from '@wdio/globals';

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

    //Next Element (was working at some point)
    get imageWheel() {
        return $('.home_cluster_ctn.home_ctn .carousel_items.responsive_scroll_snap_ctn')
    }

    get imageFocus() {
        return $('.store_main_capsule.responsive_scroll_snap_start.broadcast_capsule.app_impression_tracked.focus')
    }

    get mainImage() {
        return $$('.store_main_capsule.responsive_scroll_snap_start.broadcast_capsule.app_impression_tracked.focus .screenshot')
    }

    get subImages() {
        return $$('.store_main_capsule.responsive_scroll_snap_start.broadcast_capsule.app_impression_tracked.focus .screenshots > div')
    }

    get thumbs() {
        return $$('.home_cluster_ctn.home_ctn .carousel_thumbs > div')
    }

    get rightArrow() {
        return $('.home_cluster_ctn.home_ctn .arrow.right')
    }

    async carouselFunction() {

        await this.imageWheel.moveTo()
        expect(this.imageDefault).toBeDisplayed()

        const mainImages = await this.mainImage
        const subImages = await this.subImages
        
        for(let x = 0; x < this.subImages.length; x ++) {
            const subImage = subImages[i]
            const mainImage = mainImages[i]

            await subImage.moveTo()

            await browser.pause(1111)

            await expect(mainImage).toBeDisplayed()

            const mainImageAttri = await mainImage.getAttribute('data-background-image-url')
            const subImageAttri = await subImage.getAttribute('data-background-image-url')

            await expect(mainImageAttri).toEqual(subImageAttri)
        }
    }
}

export default new HomePage();
