import { ModuleModel } from "./module.model";
import { CreateModuleDto } from "./dto/create-module.dto";


export class ModuleRepository {
  async create(moduleData: CreateModuleDto) {
    const module = new ModuleModel(moduleData);
    return module.save();
  }

  async findByName(name: string) {
    return ModuleModel.findOne({ name });
  }

  async count() {
    return ModuleModel.countDocuments();
  }

  async findAll() {
    return ModuleModel.find();
  }
}