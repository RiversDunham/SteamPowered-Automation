import Base from './base.js'
import {$} from '@wdio/globals'

class NavigationSearch extends Base {

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

    get otherPageInput() {
        return $('.text')
    }

    async searchFunction(randomLen) {

        await this.searchInput.click()
        expect(this.searchInput).not.toHaveAttribute('class', 'default')

        await this.searchInput.setValue('raft')
        expect(this.suggestions).toBeExisting({timeout : 5000})
        await browser.keys('Enter')
        expect(this.otherPageInput).toHaveValue('raft')

        expect(browser).toHaveUrl(expect.stringContaining('https://store.steampowered.com/search/'))
        await browser.back()
        const randString = this.randomString(randomLen)
        await this.searchInput.setValue(randString)
        await browser.keys('Enter')
        expect(this.otherPageInput).toHaveValue(randString)

        expect(browser).toHaveUrl(expect.stringContaining('https://store.steampowered.com/search/'))
        await browser.back()

        await this.searchInput.setValue('e')
        await this.searchInput.click({x : 80})
        expect(this.searchInput).toHaveValue('')

        await this.searchInput.setValue('!@#$%^&*()-_=+\|[]{};:/><')
        expect(this.suggestions).toBeExisting({timeout : 5000})
        expect(this.searchInput).toHaveValue('!@#$%^&*()-_=+\|[]{};:/><')
        await browser.keys('Enter')
        expect(this.otherPageInput).toHaveValue('!@#$%^&*()-_=+\|[]{};:/><')

        expect(browser).toHaveUrl(expect.stringContaining('https://store.steampowered.com/search/'))

        await this.searchInput.click()
        expect(this.searchInput).not.toHaveAttribute('class', 'default')

        await this.searchInput.setValue('raft')
        expect(this.suggestions).toBeExisting({timeout : 5000})
        await this.magnifiyingGlass.click()
        expect(this.otherPageInput).toHaveValue('raft')

        expect(browser).toHaveUrl(expect.stringContaining('https://store.steampowered.com/search/'))
        await browser.back()
        await this.searchInput.setValue(randString)
        await this.magnifiyingGlass.click()
        expect(this.otherPageInput).toHaveValue(randString)

        expect(browser).toHaveUrl(expect.stringContaining('https://store.steampowered.com/search/'))
        await browser.back()

        await this.searchInput.setValue('e')
        await this.searchInput.click({x : 80})
        expect(this.searchInput).toHaveValue('')

        await this.searchInput.setValue('!@#$%^&*()-_=+\|[]{};:/><')
        expect(this.suggestions).toBeExisting({timeout : 5000})
        expect(this.searchInput).toHaveValue('!@#$%^&*()-_=+\|[]{};:/><')
        await this.magnifiyingGlass.click()
        expect(this.otherPageInput).toHaveValue('!@#$%^&*()-_=+\|[]{};:/><')
        
        expect(browser).toHaveUrl(expect.stringContaining('https://store.steampowered.com/search/'))
        await browser.back()
    }

    randomString(length) {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_+=~`':;/?.<>,[]{}\|"
        let result = ""
        for (let i = 0; i < length; i++) {
          result += chars.charAt(Math.floor(Math.random() * chars.length))
        }
        return result
      }
}

export default new NavigationSearch()