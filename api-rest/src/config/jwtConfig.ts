export const jwtConfig = {
    secret: process.env.SECRET_KEY || "",
    expiresIn: '1d'
}