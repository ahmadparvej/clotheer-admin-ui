
export type Credentials = {
    email: string;
    password: string;
};

export type User = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
};

export type UsersData = {
    total: number;
    page: number;
    limit: number;
    data: User[];
}

export type CreateUser = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
}