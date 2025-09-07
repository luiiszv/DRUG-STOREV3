import { UserModel } from "../users/user.model";

export class AuthRepository {
    async findByEmail(email: string) {
        return UserModel.findOne({ email });
    }

    async findById(id: string) {
        return UserModel.findById(id);
    }


}