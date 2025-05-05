import Base from './base.js'
import {$, $$} from '@wdio/globals'

class Carousel extends Base {

    openURL(endpoint) {
        return super.openURL(endpoint)
    }

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

    get searchForm() {
        return $('#searchform')
    }

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
        await this.rightArrow.click()
        await this.leftArrow.click()
        await this.firstThumb.click()

        await this.searchForm.moveTo()
        const initalAttr = await this.imageDefault.getAttribute('data-background-image-url')
        while(await this.imageDefault.getAttribute('data-background-image-url') == initalAttr) {

        }
    }
}

export default new Carousel()