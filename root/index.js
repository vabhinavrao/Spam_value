let sui_used=208111;
let sui_per_spam = 0.000005809312196603252;


function get_sui_price() {
    const options1 = {
        method: 'GET',
        headers: { accept: '*/*', 'x-api-key': 'VIgTpOFIKWqtVIq6n89XM92p5cOAqQ' }
    };

    return fetch('https://api.blockberry.one/sui/v1/coins/0x2%3A%3Asui%3A%3ASUI', options1)
        .then(response => response.json())
        .then(data => {
            return data.price; // Return the price from the response
        })
        .catch(err => {
            console.error('Error fetching SUI price:', err);
            throw err; // Rethrow the error to propagate it further
        });
}

document.getElementById('check').onclick = function () {
    console.log('Button clicked');
    document.getElementById('Sui_price').textContent = 'Loading...';

    const options = {
        method: 'GET',
        headers: { accept: '*/*', 'x-api-key': 'VIgTpOFIKWqtVIq6n89XM92p5cOAqQ' }
    };

    fetch('https://api.blockberry.one/sui/v1/coins/0x30a644c3485ee9b604f52165668895092191fcaf5489a846afa7fc11cdb9b24a%3A%3Aspam%3A%3ASPAM', options)
        .then(response => response.json())
        .then(response => {
            const spam_price = response.price;
            const cir_supply = response.supply;
            const Spam_Mcap = response.supplyInUsd;
            const Spam_holders = response.holdersCount;
            const Spam_per_Sui = sui_used/cir_supply;
            const Round_Mcap = Math.round(Spam_Mcap / 10) * 10;
            document.getElementById('Spam_price').textContent = `SPAM Price: $${spam_price }`
            document.getElementById('Sui_burned').textContent = `Sui Burned 🔥: ${sui_used.toLocaleString()} SUI`
            document.getElementById('Average_sui/spam').textContent = `Average Sui/Spam: ${Spam_per_Sui}`
            document.getElementById('Supply').textContent = `Circulating Supply: ${cir_supply.toLocaleString() }`
            document.getElementById('Mcap').textContent = `Mcap:$${Round_Mcap.toLocaleString()}`
            document.getElementById('Holders').textContent = `SPAM Holders: ${Spam_holders.toLocaleString()}`
            

            // Update SUI price after fetching SPAM data (assuming you want to show it after both are fetched)
            get_sui_price().then(sui_price => {
                console.log('SUI Price:', sui_price);
                document.getElementById('Sui_price').textContent = `SUI Price: $${sui_price}`;
                document.getElementById('Intrensic_value').textContent = `Intrensic value: ${inrensic_value.toLocaleString()}`;



            }).catch(err => {
                console.error('Failed to fetch SUI price:', err);
                document.getElementById('Sui_price').textContent = 'Failed to fetch SUI price';
            });
        })
        .catch(err => {
            console.error('Error fetching SPAM data:', err);
            document.getElementById('Spam_price').textContent = 'Failed to fetch SPAM data';
        });
};
