import { LoginController } from "@infrastructure/http/controllers/loginController";
import expressRouteAdapter from "@main/adapters/expressRouteAdapter";
import { Router } from "express";

export default (router: Router) => {
    router.post('/login', expressRouteAdapter(LoginController))
}