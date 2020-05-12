const config = require('./config');
const ChromeClient = require('./ChromeClient');

const chromeClient = new ChromeClient();

async function main() {
    try {

        await chromeClient.build();
        await chromeClient.login(config.username, config.password);
        await chromeClient.call('hello');

    } catch (err) {
        console.log('err: ', err);
    } finally {
        console.log('Done.');
    }
}

main();