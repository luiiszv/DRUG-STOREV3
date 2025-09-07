import { UserRepository } from "../modules/users/user.repository";
import { CreateUserDto } from "../modules/users/dto/create-user.dto";
import { hashPassword } from "../utils/bcrypt.util";

export const seedUsers = async () => {
    const userRepository = new UserRepository();

    const count = await userRepository.count();
    if (count > 0) {
        console.log("⚠️ Usuarios ya existen, seeder omitido");
        return;
    }

    const users: Omit<CreateUserDto, "password">[] = [
        {
            email: "admin@gmail.com",
            name: "Admin",
            lastName: "Martinez",
            identificationNumber: "1002953841",
            roles: ["68bb2fb2891d82deee2d6031"]
        },
        {
            email: "cajero@example.com",
            name: "cajero",
            lastName: "cajero",
            identificationNumber: "1002953842",
            roles: ["68bb2fb2891d82deee2d6038"]
        }
    ];

    for (const user of users) {
        const password = await hashPassword("luis123");
        await userRepository.create({ ...user, password });
    }

    console.log("✅ Usuarios sembrados con éxito usando Repository y bcrypt");
};