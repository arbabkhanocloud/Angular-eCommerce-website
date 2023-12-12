import { Container } from "inversify";
import { UserRepository } from "../repositories/User";
import { UserService } from "../services/User";
import { CategoryRepository } from "../repositories/Category";

let container = new Container();
container.bind<UserRepository>(UserRepository).toSelf().inSingletonScope();
CategoryRepository;
container.bind<UserService>(UserService).toSelf().inSingletonScope();
container
  .bind<CategoryRepository>(CategoryRepository)
  .toSelf()
  .inSingletonScope();

export default container;
