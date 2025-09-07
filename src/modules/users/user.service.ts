import { UserRepository } from "./user.repository";
import { CreateUserDto } from "./dto/create-user.dto";
import { ApiError } from "../../core/errors/ApiError";

export class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async createUser(userData: CreateUserDto) {
        return this.userRepository.create(userData);
    }

    async getUserById(id: string) {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw ApiError.notFound("Usuario no encontrado");
        }
        return user;
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw ApiError.notFound("Usuario no encontrado");
        }
        return user;
    }

    async getUserByName(name: string) {
        const user = await this.userRepository.findByName(name);
        if (!user) {
            throw ApiError.notFound("Usuario no encontrado");
        }
        return user;
    }

    async getAllUsers() {
        return this.userRepository.findAll();
    }

    async countUsers() {
        return this.userRepository.count();
    }

    async updateUserById(id: string, updateData: Partial<CreateUserDto>) {
        const user = await this.userRepository.updateById(id, updateData);
        if (!user) {
            throw ApiError.notFound("Usuario no encontrado");
        }
        return user;
    }

    async deleteUserById(id: string) {
        const user = await this.userRepository.deleteById(id);
        if (!user) {
            throw ApiError.notFound("Usuario no encontrado");
        }
        return user;
    }
}