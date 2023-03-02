import { GetUserController } from "@infrastructure/http/controllers/getUserController";
import { AuthMiddleware } from "@infrastructure/http/middleware/authMiddleware";
import expressRouteAdapter from "@main/adapters/expressRouteAdapter";
import middlewareRouteAdapter from "@main/adapters/middlewareRouteAdapter";
import { Router } from "express";

export default (router: Router) => {

    router.get('/user', middlewareRouteAdapter(AuthMiddleware), expressRouteAdapter(GetUserController));
}