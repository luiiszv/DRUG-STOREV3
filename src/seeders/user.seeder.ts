import { UserRepository } from "../modules/users/user.repository";
import { CreateUserDto } from "../modules/users/dto/create-user.dto";



export const seedUsers = async () => {
    const userRepository = new UserRepository();

    const count = await userRepository.count();
    if (count > 0) {
        console.log("⚠️ Usuarios ya existen, seeder omitido");
        return;
    }

    const users: CreateUserDto[] = [
        {
            email: "admin@gmail.com",
            password: "luis123",
            name: "Admin",
            lastName: "Martinez",
            identificationNumber: "1002953841",
            roles: ["68bb2fb2891d82deee2d6031"]
        },
        {
            email: "cajero@example.com",
            password: "luis123",
            name: "cajero",
            lastName: "cajero",
            identificationNumber: "1002953842",
            roles: ["68bb2fb2891d82deee2d6038"]
        }
    ];

    for (const user of users) {
        await userRepository.create(user);
    }

    console.log("✅ Usuarios sembrados con éxito usando Repository");
};
