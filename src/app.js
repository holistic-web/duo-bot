const DuoClient = require('./clients/DuoClient');

const duoClient = new DuoClient();

async function main() {
    try {

        await duoClient.build();
        await duoClient.call('Michael');

    } catch (err) {
        console.log('err: ', err);
    } finally {
        console.log('Done.');
    }
}

main();