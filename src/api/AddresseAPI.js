const API_URL = "https://mefit.azurewebsites.net/api"

export async function apiFetchAllAddresses() {

    let headers = new Headers()

    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Origin', 'http://localhost:')


    const requestOption = {
        method: 'GET',
        headers: headers,
    }
    try {
        const response = await fetch(`${API_URL}api/Addresses/all`, requestOption)
        const data = await response.json()

        return [null, data]
    }
    catch (e){
        return[e.message, []]
    }
}