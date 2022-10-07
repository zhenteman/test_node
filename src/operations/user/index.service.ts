import { Injectable } from '@nestjs/common';
import { DBUserService } from 'src/database/mongodb/user/index.service';
import { encryptPassword } from 'src/utils/validate';

@Injectable()
export class UserService {
    constructor(private readonly dbUserService: DBUserService) {}

    getUser() {
        return this.dbUserService.find_Id({
            u_id: 123,
        });
    }

    updatePassword(u_id, password) {
        this.dbUserService.updatePassword({
            u_id,
            password: encryptPassword(password),
        });
    }
}
