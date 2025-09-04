

export interface CreateUserDto {
    name: string;
    lastName: string;
    password: string;
    email: string;
    roles: string[];
}