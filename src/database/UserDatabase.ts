import { User } from "../model/UserModel";
import { BaseDatabase } from "./base/BaseDatabase";


export class UserDatabase extends BaseDatabase {
    private static TABLE_NAME = 'user_spotenu';

    async create(user: User): Promise<void> {
        try {
            await this.getConnection()
                .insert(user)
                .into(UserDatabase.TABLE_NAME);
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        };
    };

    async getByEmailOrNickname(emailOrNickname: string): Promise<User | undefined> {
        try {
            const result = await this.getConnection()
                .select('*')
                .from(UserDatabase.TABLE_NAME)
                .whereRaw(`nickname like "%${ emailOrNickname }%"`)
                .or.where({ email: emailOrNickname });
            return User.toUser(result[0]);
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        };
    };

    async getById(id: string): Promise<User | undefined> {
        try {
            const result = await this.getConnection()
                .select('*')
                .from(UserDatabase.TABLE_NAME)
                .where({ id });
            return User.toUser(result[0]);
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        };
    };

    async getByEmail(email: string): Promise<User | undefined> {
        try {
            const result = await this.getConnection()
                .select('*')
                .from(UserDatabase.TABLE_NAME)
                .where({ email });
            return User.toUser(result[0]);
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        };
    };

    async getByNickname(nickname: string): Promise<User | undefined> {
        try {
            const result = await this.getConnection()
                .select('*')
                .from(UserDatabase.TABLE_NAME)
                .where({ nickname });
            return User.toUser(result[0]);
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        };
    };

    async getAllBands(): Promise<any[] | undefined> {
        try {
            const result = await this.getConnection()
                .select('*')
                .from(UserDatabase.TABLE_NAME)
                .where({ type: 'band' });
            return result;
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        };
    };

    async updateApproval(id: string): Promise<void> {
        try {
            await this.getConnection().raw(`
                UPDATE ${UserDatabase.TABLE_NAME}
                SET approval = 1
                WHERE id = "${id}";
            `);     
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        };
    };
};