import Base from './base.js'
import {$} from '@wdio/globals'

class NavigationSearch extends Base {

    openURL(endpoint) {
        return super.openURL(endpoint)
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
}

export default new NavigationSearch()