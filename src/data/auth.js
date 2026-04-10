export const ADMIN_ACCOUNT = {
    name: "Admin",
    email: "admin@example.com",
    password: "Admin#123",
    role: "admin",
};

export const USER_ACCOUNT = {
    name: "Demo User",
    email: "demo@example.com",
    password: "User#123",
    role: "user",
};

export function loginUser(email, password, role) {
    if (
        role === "admin" &&
        email === ADMIN_ACCOUNT.email &&
        password === ADMIN_ACCOUNT.password
    ) {
        return ADMIN_ACCOUNT;
    }

    if (
        role === "user" &&
        email === USER_ACCOUNT.email &&
        password === USER_ACCOUNT.password
    ) {
        return USER_ACCOUNT;
    }

    throw new Error("Invalid email or password");
}