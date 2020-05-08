const Webdriver = require('selenium-webdriver');

function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

module.exports = class ChromeClient {

    async build() {
        this.webdriver = await new Webdriver.Builder().forBrowser('chrome').build();
    }

    async login(username, password) {
        await this.webdriver.get('https://accounts.google.com/servicelogin');
        const usernameField = this.getElement('//*[@id="identifierId"]');
        await usernameField.sendKeys(username);
        const usernameNextButton = this.getElement('//*[@id="identifierNext"]/span/span');
        await usernameNextButton.click();
        await sleep(1000);
        const passwordField = this.getElement('//*[@id="password"]/div[1]/div/div[1]/input');
        await passwordField.sendKeys(password);
        const passwordNextButton = this.getElement('//*[@id="passwordNext"]/span');
        await (await passwordNextButton).click();
    }

    getElement(xpath) {
        const element = this.webdriver.findElement(Webdriver.By.xpath(xpath));
        return element;
    }

}