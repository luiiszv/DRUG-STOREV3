


export interface CreateRoleDto {
    name: string;
    description?: string;
    modules: {
        module: string; // ID del módulo
        permissions: ("CREATE" | "READ" | "UPDATE" | "DELETE")[];
    }[];
}