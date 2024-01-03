import { Container } from "inversify";
import { UserRepository } from "../repositories/User";
import { UserService } from "../services/User";
import { CategoryRepository } from "../repositories/Category";
import { OrderRepository } from "../repositories/Order";
import { OrderService } from "../services/Order";
import { ProductRepository } from "../repositories/Product";
import { ProductService } from "../services/Product";

let container = new Container();
container.bind<UserRepository>(UserRepository).toSelf().inSingletonScope();
CategoryRepository;
container.bind<UserService>(UserService).toSelf().inSingletonScope();
container
  .bind<CategoryRepository>(CategoryRepository)
  .toSelf()
  .inSingletonScope();
container.bind<OrderRepository>(OrderRepository).toSelf().inSingletonScope();
container.bind<OrderService>(OrderService).toSelf().inSingletonScope();
container
  .bind<ProductRepository>(ProductRepository)
  .toSelf()
  .inSingletonScope();
container.bind<ProductService>(ProductService).toSelf().inSingletonScope();

export default container;
