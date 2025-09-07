

export function sanitizeUser(user: any) {
    const { password, identificationNumber, ...safeUser } = user.toObject ? user.toObject() : user;
    return safeUser;
}