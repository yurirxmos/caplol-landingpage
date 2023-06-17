
/*const clientId = '321e7b89-be07-4128-a67a-d8e98703643d';
const clientSecret = 'H76+jUjGX2ThoP2jI8rA/LsxuP/D0LsqLLqJWAL0G2k9HMu61z2ahp84gJFQaxadqspaZLHMHDoOpGJ61O6BZlDbLULRH+D8Ifa4sGgRtxx11jqzxcH5oQAVhTP2TQYnWGTdR4bmH8OkxU2/5WZEm6Ehrse17WMqZfASxdms+Cs';
const scope = 'wallet:read';

const url = `https://oauth.livepix.gg/oauth2/token?grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}&scope=${scope}`;

fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json'
    }
})
    .then(response => response.json())
    .then(result => {

        console.log('Access Token: ', result.access_token);
    })
    .catch(error => {
        // Trate qualquer erro que ocorrer durante a solicitação
        console.log(url);
        console.log('Erro:', error);
    });
*/