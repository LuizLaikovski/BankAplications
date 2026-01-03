export function verifyPassword(password: string): boolean {
    const correctPassword = process.env.PASSWORD_API;
    if (password === correctPassword) return true;
    return false;
}