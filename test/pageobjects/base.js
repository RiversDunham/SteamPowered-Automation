import {browser} from '@wdio/globals';

export default class Base {

    openURL(path) {
        return browser.url('https://store.steampowered.com/' + path);
    }
}