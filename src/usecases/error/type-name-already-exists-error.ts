export class TypeNameAlreadyExistsError extends Error{
    constructor() {
        super('Type name already exists!')
    }
}