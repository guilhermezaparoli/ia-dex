export class MonsterNameAlreadyExistsError extends Error{
    constructor() {
        super('Monster name aready exists!')
    }
}