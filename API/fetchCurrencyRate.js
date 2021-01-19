const fetch = require("node-fetch");

const getRate = (queries) => {
    const url = 'https://api.exchangeratesapi.io/latest';
    return fetch(url)
        .then(res => res.json())
        .then(data => {
            return formatData(data, queries);
        })
        .catch(err => {
            return err;
        });
}

const formatData = (data, queries) => {
    if (data.rates) {
        const currency = queries.currency.split(',');
        const filtered = Object.keys(data.rates)
            .filter(key => currency.includes(key))
            .reduce((obj, key) => {
                obj[key] = data.rates[key];
                return obj;
            }, {});
        const currentDate = new Date().toISOString().slice(0, 10);
        const results = {
            "base": queries.base,
            "date": currentDate,
            "rates": filtered
        }
        return results;
    } else {
        return "currency rates data unavailable"
    }

}

exports.getRate = getRate;