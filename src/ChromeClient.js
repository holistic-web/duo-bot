const Webdriver = require('selenium-webdriver');
const Xpaths = require('./Xpaths.json');

function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

module.exports = class ChromeClient {


    async build() {
        const chromeCapabilities = Webdriver.Capabilities.chrome();
        await chromeCapabilities.set('goog:chromeOptions', {
            'args': [
                '--user-data-dir=/myUserData'
            ]
        })
        this.webdriver = await new Webdriver.Builder().forBrowser('chrome').withCapabilities(chromeCapabilities).build();
        await this.goToURL(Xpaths.url.stackOverflowURL);
    }

    async login(username, password) {
        await this.goToURL(Xpaths.url.stackOverflowURL);
        const stackOverflowNextButton = this.getElement(Xpaths.google_login.stackOverflowNextButton);
        await stackOverflowNextButton.click();
        const usernameField = this.getElement(Xpaths.google_login.usernameField);
        await usernameField.sendKeys(username);
        const usernameNextButton = this.getElement(Xpaths.google_login.usernameNextButton);
        await usernameNextButton.click();

        const sleepTime=1000;
        const retries = 30;
        let success = false;
        let attempt = 0;
        while (!success && attempt < retries) {
            await sleep(sleepTime);
            try {
                const passwordField = this.getElement(Xpaths.google_login.passwordField);
                await passwordField.sendKeys(password);
                console.log('entered keys');
                success = true;
            } catch (err) {
                if (err.message.startsWith('no such element:')) {
                    attempt += 1;
                } else {
                    throw err;
                }
            }
        }
        if (!success) throw new Error('Failed to find the password field');

        const passwordNextButton = this.getElement(Xpaths.google_login.passwordNextButton);
        await passwordNextButton.click();
        await sleep(2000);
    }

    async call(name) {
        await this.goToURL(Xpaths.url.duoURL);


        await sleep(2000);
        const sleepTime=1000;
        const retries = 30;
        let success = false;
        let attempt = 0;
        while (!success && attempt < retries) {
            await sleep(sleepTime);
            try {
                const searchBar = this.getElement(Xpaths.duo_call.searchField);
                await searchBar.sendKeys(name);
                console.log('entered keys');
                success = true;
            } catch (err) {
                if (err.message.startsWith('element not interactable')) {
                    attempt += 1;
                } else {
                    throw err;
                }
            }
        }
        if (!success) throw new Error('Failed to find the field');

        const firstResult = this.getElement(Xpaths.duo_call.firstSearchResult);
        await firstResult.click();

        await sleep(3000);



        const sleepTime=1000;
        const retries = 30;
        let success = false;
        let attempt = 0;
        while (!success && attempt < retries) {
            await sleep(sleepTime);
            try {
                const voiceCallButton = this.getElement(Xpaths.duo_call.firstSearchResult);
                await voiceCallButton.click();
                console.log('clicked call button');
                success = true;
            } catch (err) {
                if (err.message.startsWith('element not interactable')) {
                    attempt += 1;
                } else {
                    throw err;
                }
            }
        }
        if (!success) throw new Error('Failed to find the field');

    }

    getElement(xpath) {
        const element = this.webdriver.findElement(Webdriver.By.xpath(xpath));
        return element;
    }

    async goToURL(url) {
        await this.webdriver.get(url);
    }

    //async waitToLoad

}