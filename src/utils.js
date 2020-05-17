function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
};
module.exports.sleep = sleep;

async function retry (method, options={}) {
    const defaultOptions = { sleepTime: 1000, retries: 30 };
    options = {
        ...defaultOptions,
        ...options
    };
    let result;
    let error;
    let success = false;
    for (let i=0; i<options.retries; i++) {
        try {
            result = await method();
            success = true;
            break;
        } catch(err) {
            error = err;
        }
        await sleep(options.sleepTime);
    }
    if (success) {
        return result;
    } else {
        throw error;
    }
};
module.exports.retry = retry;