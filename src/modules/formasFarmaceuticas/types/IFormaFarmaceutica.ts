

export interface IFormaFarmaceutica {
  _id: string; // Identificador único
  nombre: string; // Nombre de la forma farmacéutica, ej: "Tableta", "Cápsula"
  descripcion?: string; // Descripción opcional, ej: "Sólido en forma de pastilla", "Líquido oral"
  createdAt?: Date; // Fecha de creación
  updatedAt?: Date; // Fecha de última actualización
}