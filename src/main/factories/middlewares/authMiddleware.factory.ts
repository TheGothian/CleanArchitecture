import { AuthMiddleware } from "@infrastructure/http/middleware/authMiddleware";
import createAuthUseCase from "../userCases/authentication/auth.factory";

export default () => {
    const useCase = createAuthUseCase();
    return new AuthMiddleware(useCase);
}