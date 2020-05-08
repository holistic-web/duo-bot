const Webdriver = require('selenium-webdriver');
const Xpaths = require('./Xpaths.json');

function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

module.exports = class ChromeClient {

    async build() {
        this.webdriver = await new Webdriver.Builder().forBrowser('chrome').build();
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
        await (await passwordNextButton).click();

        await this.goToURL(Xpaths.url.duoURL);
    }

    getElement(xpath) {
        const element = this.webdriver.findElement(Webdriver.By.xpath(xpath));
        return element;
    }

    async goToURL(url) {
        await this.webdriver.get(url);
    }

}