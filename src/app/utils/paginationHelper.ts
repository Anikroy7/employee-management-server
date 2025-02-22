type IOptions = {
    page?: number,
    limit?: number,
    sortOrder?: string,
    sortBy?: string
}

type IOptionsResult = {
    page: number,
    limit: number,
    skip: number,
   
}

const calculatePagination = (options: IOptions): IOptionsResult => {

    const page: number = Number(options.page) || 1;
    const limit: number = Number(options.limit) || 9;
    const skip: number = (Number(page) - 1) * limit;


    return {
        page,
        limit,
        skip,
        
    }
}


export const paginationHelper = {
    calculatePagination
}