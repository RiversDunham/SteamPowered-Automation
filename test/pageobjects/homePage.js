import Base from './base.js';
import {$, $$} from '@wdio/globals';

class HomePage extends Base {

    openURL(endpoint) {
        return super.openURL(endpoint)
    }

   get flyoutTabs() {
        return $$('.store_nav > tab.flyout_tab')
   }
   get surfaceLinks() {
    return $$('.store_nav > a')
    }

   async flyoutFunction() {
        const flyoutElements = await this.flyoutTabs;

        for(const flyout of flyoutElements) {
            await flyout.click()
            await browser.pause(1000)
            await expect(browser).not.toHaveUrl('https://store.steampowered.com/')
            await this.openURL()
        }
        
   }

   async surfaceLinksFunction(index) {
        const link = await this.surfaceLinks
        await link[index].click()
        await expect(browser).not.toHaveUrl('https://store.steampowered.com/')
    }

    
}

export default new HomePage();
