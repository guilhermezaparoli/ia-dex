export class UserEmailAlreadyExistsError extends Error{
    constructor() {
        super('E-mail aready exists!')
    }
}