import { setAccessToken } from "./accesToken";

export default async function refreshToken() {
    const api_url = import.meta.env.VITE_API_URL;
    await fetch(`${api_url}/refresh`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${
                document.cookie
                    .split('; ')
                    .find((row) => row.startsWith('refresh_token='))
                    ?.split('=')[1]
            }`,
        },
        body: JSON.stringify({}),
    })
        .then((response) => response.json())
        .then((data) => {
            setAccessToken(data['access_token']);
        })
        .catch((error) => {
            console.error(error);
        });
}
