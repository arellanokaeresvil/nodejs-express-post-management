import AuthService from "../services/authServices";
import ApiResponse from "../utils/response";

class AuthController{
    private authService: AuthService;

    constructor(authService: AuthService) {
        this.authService = authService;
    }

    login = async (req: any, res: any) => {
        const { email, password } = req.body;
        const result = await this.authService.login(email, password);
        return ApiResponse.success(res, result, 'Login successful',200)
    }

    logout = async (req: any, res: any) => {
        const result = await this.authService.logout(req.user);
        res.json(result);
    }
}

export default AuthController;
