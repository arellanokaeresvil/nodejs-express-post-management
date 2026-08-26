import UserService from "../services/userServices";
import ApiResponse from "../utils/response";

import { Request, Response } from "express";

class userController{

    private userService: UserService;

   constructor(userService: UserService) {
        this.userService = userService;
    }

    index = async (req: Request, res: Response) => {
        const users = await this.userService.findAll();
        return ApiResponse.success(res, users, "Users fetch successfuly", 200)
    };

    show = async (req: Request, res: Response) => {
        const { id } = req.params;
        const user = await this.userService.findById(id as any);
         return ApiResponse.success(res, user, "User fetch successfuly", 200)
    };

    store = async (req: Request, res: Response) => {
        const newUser = req.body;
        const createdUser = await this.userService.create(newUser);
        return ApiResponse.created(res, createdUser, 'User created successfuly')
    };

    update = async (req: Request, res: Response) => {
        const { id } = req.params;
        const updatedUser = req.body;
        const result = await this.userService.update(id as any, updatedUser);
       return ApiResponse.success(res, result, 'User updated successfuly',200)
    };

    destroy = async (req: Request, res: Response) => {
        const { id } = req.params;
        const result = await this.userService.delete(id as any);
        return ApiResponse.success(res, result, 'User deleted successfuly',200)
    };

   restore = async (req: Request, res: Response) => {
       const { id } = req.params;
       const result = await this.userService.restore(id as any);
       return ApiResponse.success(res, result, 'User restored successfuly',200)
   };

}

export default userController;