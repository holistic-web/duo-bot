const Webdriver = require('selenium-webdriver');
const { retry } = require('../utils');

module.exports = class ChromeClient {

    async build() {
        const chromeCapabilities = Webdriver.Capabilities.chrome();
        await chromeCapabilities.set('goog:chromeOptions', {
            'args': [
                '--user-data-dir=/myUserData',
                '--disable-extensions',
                '--start-maximized'
            ]
        })
        this.webdriver = await new Webdriver.Builder().forBrowser('chrome').withCapabilities(chromeCapabilities).build();
    }

    getElement(xpath) {
        const element = this.webdriver.findElement(Webdriver.By.xpath(xpath));
        return element;
    }

    async goToURL(url) {
        await this.webdriver.get(url);
    }

    async click(xpath) {
        await retry(async () => {
            const element = this.getElement(xpath);
            await element.click();
        });
    }

    async sendKeys(xpath, text) {
        await retry(async () => {
            const element = this.getElement(xpath);
            await element.sendKeys(text);
        });
    }

}