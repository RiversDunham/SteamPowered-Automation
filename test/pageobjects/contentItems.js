import Base from './base.js'
import {$, $$} from '@wdio/globals'

class ContentItems extends Base {

    openURL(endpoint) {
        return super.openURL(endpoint)
    }

    get leftTabs() {
        return $$('.tab_content_items > a')
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

    get newReleasesButton() {
        return $('#tab_newreleases_content .tab_see_more a')
    }

    get topSellersButton() {
        return $('#tab_topsellers_content span[data-searchid="default"] a:nth-child(1)')
    }

    get globalTopButton() {
        return $('#tab_topsellers_content span[data-searchid="default"] a:nth-child(2)')
    }

    get upcomingButton() {
        return $('#tab_upcoming_content .tab_see_more a')
    }

    get specialsButton() {
        return $('#tab_specials_content .tab_see_more a')
    }

    get freeToPlayButton() {
        return $('#tab_trendingfree_content .tab_see_more a:nth-child(1)')
    }

    get demosButton() {
        return $('#tab_trendingfree_content .tab_see_more a:nth-child(2)')
    }

    get mainTabs() {
        return $$('.home_tabs_row > div')
    }

    get checkbox() {
        return $('#topsellers_controls #top_sellers_f2p_check')
    }

    async bottomFunction() {

        await browser.execute(() => window.scrollTo(0, 3000))
        for (let x = 0; x < await this.leftTabs.length; x ++) {
            await this.leftTabs[x].moveTo()
            await expect(this.leftTabs[x]).not.toHaveHref('https://store.steampowered.com/')
            if (x >= 10 && x <= 19) {
                if (x == 10) {
                    await this.checkbox.click()
                }
                await expect(this.leftTabs[x].$('.discount_final_price.free')).not.toBeDisplayed()
            }
            for (let i = 0; i < await this.tagsR.length; i ++) {
                await expect(this.tagsR[i]).not.toHaveHref('https://store.steampowered.com/')
            }

            if (x == 9) {
                await expect(this.newReleasesButton).not.toHaveHref('https://store.steampowered.com/')
                await this.mainTabs[(x + 1) / 10].click()
            } else if (x == 19) {
                await expect(this.topSellersButton).not.toHaveHref('https://store.steampowered.com/')
                await expect(this.globalTopButton).not.toHaveHref('https://store.steampowered.com/')
                await this.mainTabs[(x + 1) / 10].click()
            } else if (x == 29) {
                await expect(this.upcomingButton).not.toHaveHref('https://store.steampowered.com/')
                await this.mainTabs[(x + 1) / 10].click()
            } else if (x == 39) {
                await expect(this.specialsButton).not.toHaveHref('https://store.steampowered.com/')
                await this.mainTabs[(x + 1) / 10].click()
            } else if (x == 49) {
                await expect(this.freeToPlayButton).not.toHaveHref('https://store.steampowered.com/')
                await expect(this.demosButton).not.toHaveHref('https://store.steampowered.com/')
            }
        }        
    }         
}

export default new ContentItems()