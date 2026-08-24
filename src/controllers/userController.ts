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
            message: "Users fetch successfully",
            data: users
        })
    };

    show = async (req: Request, res: Response) => {
        const { id } = req.params;
        const user = await this.userService.findById(id as any);
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
        const result = await this.userService.update(id as any, updatedUser);
        res.send(result);
    };

    destroy = async (req: Request, res: Response) => {
        const { id } = req.params;
        const result = await this.userService.delete(id as any);
        res.send(result);
    };

   restore = async (req: Request, res: Response) => {
       const { id } = req.params;
       const result = await this.userService.restore(id as any);
       res.send(result);
   };

}

export default userController;