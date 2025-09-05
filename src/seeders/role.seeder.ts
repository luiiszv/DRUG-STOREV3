import { CreateRoleDto } from "../modules/roles/dto/rol.create.dto";
import { RoleRepository } from "../modules/roles/rol.repository";



export const seedRoles = async () => {
    const roleRepository = new RoleRepository();

    const count = await roleRepository.count();
    if (count > 0) {
        console.log("⚠️ Roles ya existen, seeder omitido");
        return;
    }

    const roles: CreateRoleDto[] = [
        {
            name: "Administrador", description: "Acceso total al sistema", modules: [
                { module: "68ba0d5d5c9e5845c494f81e", permissions: ["CREATE", "READ", "UPDATE", "DELETE"] }, // Usuarios
                { module: "68ba0d5d5c9e5845c494f820", permissions: ["CREATE", "READ", "UPDATE", "DELETE"] }, // Roles
                { module: "68ba0d5e5c9e5845c494f822", permissions: ["CREATE", "READ", "UPDATE", "DELETE"] }, // Productos
                { module: "68ba0d5e5c9e5845c494f824", permissions: ["CREATE", "READ", "UPDATE", "DELETE"] }, // Ventas
                { module: "68ba0d5e5c9e5845c494f826", permissions: ["CREATE", "READ", "UPDATE", "DELETE"] }, // Reportes
            ]
        },
        {
            name: "Cajero", description: "Gestión de ventas y caja", modules: [
                { module: "68ba0d5e5c9e5845c494f824", permissions: ["CREATE", "READ", "UPDATE"] }, // Ventas
                { module: "68ba0d5e5c9e5845c494f822", permissions: ["READ"] }, // Productos
            ]
        }
    ];

    for (const r of roles) {
        await roleRepository.create(r);
    }

    console.log("✅ Roles sembrados con éxito usando Repository");
};