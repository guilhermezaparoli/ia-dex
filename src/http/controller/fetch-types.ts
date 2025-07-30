import { makeFetchTypesUseCase } from "@/usecases/factories/make-fetch-types.js";

export async function fetchTypes() {


    const fetchTypesUseCase = makeFetchTypesUseCase()


    const { types } = await fetchTypesUseCase.execute()

    return {
        types
    }
}