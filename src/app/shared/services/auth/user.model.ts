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
        private pTitle: string,
        private pUserName: string,
        private pToken: string,
        private pImageUrl: string,
        private pAuthLevel: number,
        private expirationTime: number
    ) {

    }

    get id(): number {
        return this.pId;
    }

    get name(): string {
        return this.pTitle;
    }

    get username(): string {
        return this.pUserName;
    }

    get authLevel(): number {
        return this.pAuthLevel;
    }

    get token(): string {
        const currentTime = (new Date()).getTime();
        if (this.expirationTime < currentTime) {
            return '';
        }
        return this.pToken;
    }
}
