const ChromeClient = require('./ChromeClient');

const Xpaths = {
    "duoURL": "https://duo.google.com/?web&utm_source=marketing_page_button_main",
    "searchField": "//*[@id=\"gb\"]/div[2]/div[2]/div[2]/form/div/div/div/div/div/div[1]/input[2]",
    "firstSearchResult": "//*[@id=\"nngdp18\"]",
    "voiceCallButton": "//*[@id=\"yDmH0d\"]/div[4]/div/div[2]/div[2]/div/div[2]"
};

module.exports = class DuoClient extends ChromeClient {

    async call(name) {
        await this.goToURL(Xpaths.duoURL);
        await this.sendKeys(Xpaths.searchField, name);
        await this.click(Xpaths.firstSearchResult);
        await this.click(Xpaths.voiceCallButton);
    }
};