import { Request, Response } from "express";
import { PermissionServices } from './permission.service';


export class PermissionController {

    private permissionServices: PermissionServices;

    constructor() {
        this.permissionServices = new PermissionServices();
    }

    async findAllPermission(req: Request, res: Response) {
        try {
            const result = await this.permissionServices.findAllPermissions();
            res.status(200).json({ result });
        } catch (error) {
            console.error("Error fetching permissions: ", error);
            res.status(500).json({ message: "Internal sercer error" });
        }
    }




}