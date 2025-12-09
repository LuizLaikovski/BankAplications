export interface JwtConfig {
    secret: string;
    expiresIn: string;
}

if (!process.env.SECRET_KEY) {
    throw new Error("SECRET_KEY não definida no .env");
}

export const jwtConfig: JwtConfig = {
    secret: process.env.SECRET_KEY as string,
    expiresIn: '1d'
}