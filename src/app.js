const config = require('./config');
const ChromeClient = require('./ChromeClient');

const chromeClient = new ChromeClient();

async function main() {
    try {

        await chromeClient.build();
        //await chromeClient.call('Michael');

    } catch (err) {
        console.log('err: ', err);
    } finally {
        console.log('Done.');
    }
}

main();