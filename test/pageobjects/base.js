import {browser} from '@wdio/globals';
//base page object

export default class Base {

    openURL(path) {
        return browser.url('https://store.steampowered.com/' + path);
    }
}