import "reflect-metadata";

import { AuthenticationUseCase } from "@application/useCases/authentication/authenticationUseCase";
import { LoginUseCase } from "@application/useCases/authentication/loginUseCase";
import { GetUsersUseCase } from "@application/useCases/users/getUserUseCase";
import dbConnection from "@infrastructure/db/mongodb/helpers/db-connection";
import { TokenRepository, UserRepository } from "@infrastructure/db/mongodb/repositories";
import { GetUserController } from "@infrastructure/http/controllers/getUserController";
import { LoginController } from "@infrastructure/http/controllers/loginController";
import { AuthMiddleware } from "@infrastructure/http/middleware/authMiddleware";
import { BodyParamValidationComposite } from "@infrastructure/http/validators/bodyParamValidationComposite";
import { FieldValidation } from "@infrastructure/http/validators/fieldValidation";
import { RequiredFieldValidation } from "@infrastructure/http/validators/requiredFieldValidation";
import { Container } from "inversify";
import { BINDINGS } from "./bindings";

const container = new Container();

const setupDI = async () => {
    container.bind(BINDINGS.db).toConstantValue(dbConnection);
    container.bind(BINDINGS.TokenRepository).to(TokenRepository);
    container.bind(BINDINGS.UserRepository).to(UserRepository);

    // container.bind(BINDINGS.BaseMiddleware).to(BaseMiddleware);
    container.bind(BINDINGS.AuthMiddleware).to(AuthMiddleware);

    container.bind(BINDINGS.LoginUseCase).to(LoginUseCase);
    container.bind(BINDINGS.GetUsersUseCase).to(GetUsersUseCase);
    container.bind(BINDINGS.AuthenticationUseCase).to(AuthenticationUseCase);

    container.bind(BINDINGS.LoginController).to(LoginController);
    container.bind(BINDINGS.GetUserController).to(GetUserController);
    container.bind(BINDINGS.ValidationComposite).to(BodyParamValidationComposite);


    container.bind(BINDINGS.LoginParamValidator).toFactory(() => {
        return (name: string) => {
            const validators: FieldValidation[] = [];

            switch (name) {
                case "login":
                    validators.push(new RequiredFieldValidation("password"));
                    validators.push(new RequiredFieldValidation("username"));
                    break;

                default:
                    break;
            }

            return new BodyParamValidationComposite(validators);
        }
    })
}

export { container, setupDI };
