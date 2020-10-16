export enum USER_TYPE {
    ADMIN = 'admin',
    BAND = 'band',
    LISTENER = 'listener'
};

export enum LISTENER_TYPE {
    FREE = 'free',
    PREMIUM = 'premium'
};

export class User {
    constructor(
        private id: string,
        private name: string,
        private nickname: string,
        private email: string,
        private password: string,
        private type: USER_TYPE,
        private blocked: number,
        private category?: LISTENER_TYPE,
        private description?: string,
        private approval?: number
    ) {};

    getId(): string {
        return this.id;
    };

    getName(): string {
        return this.name;
    };

    getNickname(): string {
        return this.nickname;
    };

    getEmail(): string {
        return this.email;
    };

    getPassword(): string {
        return this.password;
    };

    getType(): USER_TYPE {
        return this.type;
    };

    getBlocked(): number {
        return this.blocked;
    };

    getCategory(): LISTENER_TYPE | undefined {
        return this.category;
    };

    getDescription(): string | undefined {
        return this.description;
    };

    getApproval(): number | undefined {
        return this.approval;
    };

    setId(id: string): string {
        return this.id = id;
    };

    setName(name: string): string {
        return this.name = name;
    };

    setNickname(nickname: string): string {
        return this.nickname = nickname;
    };

    setEmail(email: string): string {
        return this.email = email;
    };

    setPassword(password: string): string {
        return this.password = password;
    };

    setType(type: USER_TYPE): USER_TYPE {
        return this.type = type;
    };

    setBlocked(blocked: number): number {
        return this.blocked = blocked;
    };

    setCategory(category: LISTENER_TYPE): LISTENER_TYPE {
        return this.category = category;
    };

    setDescription(description: string): string {
        return this.description = description;
    };

    setApproval(approval: number): number {
        return this.approval = approval;
    };

    public static convertIntToBoolean(value: number): boolean{
        return value === 1;
    };

    public static convertBooleanToInt(value: boolean): number{
        return value? 1: 0;
    };

    public static toUser(data?: any): User | undefined {
        return (
            data &&
            new User(
                data.id,
                data.name,
                data.nickname,
                data.email,
                data.password,
                data.type,
                data.blocked,
                data.category,
                data.description,
                data.approval
            )
        );
    };
};