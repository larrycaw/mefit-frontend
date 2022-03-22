import { API_URL } from "../API"
import keycloak from "../Keycloak";

export async function apiFetchAllPrograms() {

    try {
        const response = await fetch(`${API_URL}api/MFProgram/all`, {
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${keycloak.token}`
            },
          })
        const data = await response.json()

        return [null, data]
    }
    catch (e){
        return[e.message, []]
    }
}