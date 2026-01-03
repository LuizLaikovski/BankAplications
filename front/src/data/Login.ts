interface bodyLogin {
    cpf: string;
    password: string;
}
export const toLogin = async (body: bodyLogin) => {
    try {
        const response = await fetch("https://api-express-mongo-db.vercel.app/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        const data = await response.json();

        return data;
    } catch (error) {
        return `Erro ao se comunicar com o servidor: ${error}`;
    }
}