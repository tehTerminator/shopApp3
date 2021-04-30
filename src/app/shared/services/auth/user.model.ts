export class User {
    /**
     *
     * @param pId Unique Id Assigned to User
     * @param pName Users Real Name
     * @param pUserName username used to login.
     * @param pToken Authentication Token.
     * @param expirationTime time when the Token Expires
     */
    constructor(
        private pId: number,
        private pName: string,
        private pUserName: string,
        private pToken: string,
        private expirationTime: number
    ) {

    }

    get id(): number {
        return this.pId;
    }

    get name(): string {
        return this.pName;
    }

    get username(): string {
        return this.pUserName;
    }

    get token(): string {
        const currentTime = (new Date()).getTime();
        if (this.expirationTime < currentTime) {
            return '';
        }
        return this.pToken;
    }
}
