import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";

export class UserController {
    async signup(request: Request, response: Response) {
        const userBusiness: UserBusiness = new UserBusiness();
        try {
            const input = {
                name: request.body.name,
                nickname: request.body.nickname,
                email: request.body.email,
                password: request.body.password,
                type: request.params.type,
                category: request.body.category,
                description: request.body.description,
                token: request.headers.authorization as string
            };

            const result = await userBusiness.signup(input);

            response.status(200).send({ result });

        } catch (error) {
            response.status(error.customErrorCode || 400).send({
                message: error.message
            });
        };
    };


    async signin(request: Request, response: Response) {
        const userBusiness: UserBusiness = new UserBusiness();
        try {
            const input = {
                emailOrNickname: request.body.emailOrNickname,
                password: request.body.password
            };

            const token = await userBusiness.signin(input);

            response.status(200).send({ token });

        } catch (error) {
            response.status(error.customErrorCode || 400).send({
                message: error.message
            });
        };
    };

    async listAllBands(request: Request, response: Response) {
        const userBusiness: UserBusiness = new UserBusiness();
        try {
            const input = {
                token: request.headers.authorization as string
            };

            const bands = await userBusiness.listAllBands(input);

            response.status(200).send({ bands });

        } catch (error) {
            response.status(error.customErrorCode || 400).send({
                message: error.message
            });
        };
    };

    async approvalBands(request: Request, response: Response) {
        const userBusiness: UserBusiness = new UserBusiness();
        try {
            const input = {
                token: request.headers.authorization as string,
                id: request.params.id
            };

            await userBusiness.approvalBands(input);

            response.status(200).send({ "success": true });

        } catch (error) {
            response.status(error.customErrorCode || 400).send({
                message: error.message
            });
        };
    };
};