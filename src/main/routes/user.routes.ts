import expressRouteAdapter from "@main/adapters/expressRouteAdapter";
import middlewareRouteAdapter from "@main/adapters/middlewareRouteAdapter";
import { createUserController } from "@main/factories/controllers/users/getUser/controller.factory";
import { Router } from "express";
import createAuthMiddleware from "../factories/middlewares/authMiddleware.factory";

export default (router: Router) => {

    router.get('/user', middlewareRouteAdapter(createAuthMiddleware()), expressRouteAdapter(createUserController()));
}