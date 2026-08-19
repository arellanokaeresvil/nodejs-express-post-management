import UserService from "../services/userServices";

import { Request, Response } from "express";

class userController{

    private userService: UserService;

   constructor(userService: UserService) {
        this.userService = userService;
    }

    index = async (req: Request, res: Response) => {
        const users = await this.userService.findAll();
        res.status(200).json({
            message: "Users retrieved successfully",
            data: users
        })
    };

    show = async (req: Request, res: Response) => {
        const { id } = req.params;
        const user = await this.userService.findById(id as string);
        res.send(user);
    };

    store = async (req: Request, res: Response) => {
        const newUser = req.body;
        const createdUser = await this.userService.create(newUser);
        res.send(createdUser);
    };

    update = async (req: Request, res: Response) => {
        const { id } = req.params;
        const updatedUser = req.body;
        const result = await this.userService.update(id as string, updatedUser);
        res.send(result);
    };

    destroy = async (req: Request, res: Response) => {
        const { id } = req.params;
        const result = await this.userService.delete(id as string);
        res.send(result);
    };


}

export default userController;