export interface User {
    id: string;
    email: string;
    name: string;
}

export interface LoginCredentials {
    email?: string;
    password?: string;
}

export interface RegisterCredentials {
    name?: string;
    email?: string;
    password?: string;
}

export interface ResetPasswordPayload {
    token: string;
    newPassword?: string;
}

export interface Group {
    _id: string;
    name: string;
    members: string[];
    // ...other group fields...
}

export interface GroupData {
    name: string;
    members?: string[];
    // ...other fields for group creation...
}

export interface UserIdPayload {
    groupId: string;
    userId: string;
}