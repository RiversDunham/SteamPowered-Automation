import Base from './base.js'
import {$, $$} from '@wdio/globals'

class NavigationTabs extends Base {

    get flyoutTabs() {
            return $$('.store_nav > .tab.flyout_tab')
    }

    get foryouFlyoutLinks() {
            return $$('.store_nav #foryou_flyout a')
    }

    get tabs() {
        return $$('.store_nav a.tab')
    }

    async flyoutFunction() {
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

    async tabsFucntion() {
        const tabElements = await this.tabs

        for(const tabThings of tabElements) {
            await expect(tabThings).not.toHaveHref('https://store.steampowered.com/')
        }
    }
}

export default new NavigationTabs()