interface bodyLogin {
    cpf: string;
    password: string;
}

export interface responseLogin {
    token: string;
    id: string;
    name: string;
    email: string;
    role: string;
}

export const toLogin = async (body: bodyLogin) => {
    try {
        const passwordApi = import.meta.env.VITE_API_PASSWORD
        const response = await fetch("https://api-express-mongo-db.vercel.app/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": passwordApi
            },
            body: JSON.stringify(body),
        });
        const data = await response.json();

        return data as responseLogin;
    } catch (error) {
        return `Erro ao se comunicar com o servidor: ${error}`;
    }
}