

export interface CreateUserDto {
    name: string;
    lastName: string;
    password: string;
    identificationNumber: string;
    email: string;
    roles: string[];
}