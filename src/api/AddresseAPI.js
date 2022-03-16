const apiURL = "https://mefit.azurewebsites.net/api"

export async function apiFetchAllAddresses() {
    try {
        const response = await fetch(`${apiURL}/Addresses/all`)
        const data = await response.json()

        return [null, data]
    }
    catch (e){
        return[e.message, []]
    }
}