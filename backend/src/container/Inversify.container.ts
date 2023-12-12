import { Container } from "inversify";
import { UserRepository } from "../repositories/User";
import { UserService } from "../services/User";

let container = new Container();
container.bind<UserRepository>(UserRepository).toSelf().inSingletonScope();
container.bind<UserService>(UserService).toSelf().inSingletonScope();

export default container;
