import Base from './base.js'
import {$, $$} from '@wdio/globals'

class NavigationTabs extends Base {

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