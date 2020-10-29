export class UserStandard {
    id: number;
    username: string;
    password: string;
    enabled: boolean;
    name: string;
    lastName: string;
    email: string;
    roles: string[] = [];
}