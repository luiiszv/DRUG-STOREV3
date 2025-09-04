import { ModuleRepository } from "../modules/modules/module.repository";

export const seedModules = async () => {
  const moduleRepository = new ModuleRepository();

  const count = await moduleRepository.count();
  if (count > 0) {
    console.log("⚠️ Módulos ya existen, seeder omitido");
    return;
  }

  const modules = [
    { name: "Usuarios", description: "Gestión de usuarios del sistema" },
    { name: "Roles", description: "Gestión de roles y permisos" },
    { name: "Productos", description: "Control de inventario y stock" },
    { name: "Ventas", description: "Registro de ventas y facturación" },
    { name: "Reportes", description: "Reportes de gestión y estadísticas" },
  ];

  for (const m of modules) {
    await moduleRepository.create(m);
  }

  console.log("✅ Módulos sembrados con éxito usando Repository");
};