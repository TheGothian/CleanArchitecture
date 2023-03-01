import expressRouteAdapter from "@main/adapters/expressRouteAdapter";
import { createLoginController } from "@main/factories/controllers/authentication/controller.factory";
import { Router } from "express";

export default (router: Router) => {
    router.post('/login', expressRouteAdapter(createLoginController()))
}