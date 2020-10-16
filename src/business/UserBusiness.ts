import { UserDatabase } from "../database/UserDatabase";
import { User, USER_TYPE } from "../model/UserModel";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";


export class UserBusiness {
    private userDatabase: UserDatabase = new UserDatabase();
    private idGenerator: IdGenerator = new IdGenerator();
    private hashManager: HashManager = new HashManager();
    private authenticator: Authenticator = new Authenticator();

    async signup(input: SignUpInput) {
        try {
            const email = await this.userDatabase.getByEmail(input.email);

            const nickname = await this.userDatabase.getByNickname(input.nickname);

            if(email || nickname) {
                throw new Error('invalid data');
            };

            if(input.type === USER_TYPE.ADMIN  && input.password.length < 10) {
                throw new Error('password must contain at least 10 characters');
            } else if(
                input.type === USER_TYPE.BAND && input.password.length < 6 || 
                input.type === USER_TYPE.LISTENER && input.password.length < 6
            ) {
                throw new Error('password must contain at least 6 characters');
            };

            let user = User.toUser({
                ...input,
                id: this.idGenerator.generate(),
                password: await this.hashManager.hash(input.password),
                blocked: false,
                approval: input.type === USER_TYPE.BAND ? false : true,
                category: input.type === USER_TYPE.LISTENER ? 'free' : null 
            });

            if(user?.getType() === USER_TYPE.ADMIN) {
                const authenticator = this.authenticator.getData(input.token as string);
                if(authenticator.type !== USER_TYPE.ADMIN) {
                    throw new Error('permission denied');
                };
            };
            await this.userDatabase.create(user!);
            return user!;
        } catch (error) {
            throw new Error(error);
        };
    };

    async signin(input: SignInInput) {
        try {
            const user = await this.userDatabase.getByEmailOrNickname(input.emailOrNickname)

            if(!user) {
                throw new Error('invalid credentials');
            };

            const comparePassword = await this.hashManager.compare(
                input.password, 
                user.getPassword()
            );

            if(!comparePassword) {
                throw new Error('invalid password');
            };

            if(user.getBlocked()) {
                throw new Error('user blocked');
            };

            if(user!.getType() === USER_TYPE.BAND && user!.getApproval() === 0) {
                throw new Error('user pending approval');
            };

            const token = this.authenticator.generateToken({ 
                id: user.getId(), 
                type: user.getType() 
            });
            return token;
        } catch (error) {
            
        };
    };

    async listAllBands(input: ListAllBandsInput) {
        try {
            if(input.token !== USER_TYPE.ADMIN) {
                throw new Error('permission denied');
            };
            const result = await this.userDatabase.getAllBands()

            let bands = []
            if(result) {
                for(let i = 0; i < result.length; i++) {
                    bands.push({
                        name: result[i].name,
                        email: result[i].email,
                        nickname: result[i].nickname,
                        approval: User.convertIntToBoolean(result[i].approval)
                    });
                };
            };
            return bands;
        } catch (error) {
            throw new Error(error);
        };
    };

    async approvalBands(input: ApprovalBandsInput) {
        try {
            if(input.token !== USER_TYPE.ADMIN) {
                throw new Error('permission denied');
            };

            const band = await this.userDatabase.getById(input.id);

            if(!band) {
                throw new Error('band does not exist');
            };

            const approval = band!.getApproval()
            if(User.convertIntToBoolean(approval!)) {
                throw new Error('band already approved');
            };

            await this.userDatabase.updateApproval(input.id);
        } catch (error) {
            throw new Error(error);
        }
    };
};

interface SignUpInput {
    name: string;
    nickname: string;
    email: string;
    password: string;
    type: string;
    category?: string;
    description?: string;
    token?: string;
};

interface SignInInput {
    emailOrNickname: string;
    password: string;
};

interface ListAllBandsInput {
    token: string;
};

interface ApprovalBandsInput {
    token: string;
    id: string;
};