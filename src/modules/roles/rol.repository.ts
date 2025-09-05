import { RoleModel } from "./rol.model";
import { CreateRoleDto } from "./dto/rol.create.dto";



export class RoleRepository {
    async create(roleData: CreateRoleDto) {
        const role = new RoleModel(roleData);
        return role.save();
    }

    async findByName(name: string) {
        return RoleModel.findOne({ name });
    }

    async findById(id: string) {
        return RoleModel.findById(id);
    }

    async count() {
        return RoleModel.countDocuments();
    }

    async findAll() {
        return RoleModel.find();
    }
}