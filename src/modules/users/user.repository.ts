import { UserModel } from "./user.model";
import { CreateUserDto } from "./dto/create-user.dto";

export class UserRepository {
    async create(userData: CreateUserDto) {
        const user = new UserModel(userData);
        return user.save();
    }

    async findByName(name: string) {
        return UserModel.findOne({ name });
    }

    async findById(id: string) {
        return UserModel.findById(id);
    }

    async findByEmail(email: string) {
        return UserModel.findOne({ email });
    }

    async findAll() {
        return UserModel.find();
    }

    async count() {
        return UserModel.countDocuments();
    }

    async updateById(id: string, updateData: Partial<CreateUserDto>) {
        return UserModel.findByIdAndUpdate(id, updateData, { new: true });
    }

    async deleteById(id: string) {
        return UserModel.findByIdAndDelete(id);
    }
}