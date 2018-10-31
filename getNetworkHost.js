const os = require('os');

const getIPv4Host = (arr) => {
    for (let row of arr) {
        if (row.family === 'IPv4') {
            return row.address;
        }
    }
};

module.exports = (() => {
    let host,
        ifaces = os.networkInterfaces();

    if (ifaces.en0) {
        host = getIPv4Host(ifaces.en0);
    } else if (ifaces.en5) {
        host = getIPv4Host(ifaces.en5);
    } else if (ifaces.Ethernet0) {
        host = getIPv4Host(ifaces.Ethernet0);
    } else {
        host = 'localhost';
    }

    return host;
})();
