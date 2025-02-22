"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationHelper = void 0;
const calculatePagination = (options) => {
    const page = Number(options.page) || 1;
    const limit = Number(options.limit) || 9;
    const skip = (Number(page) - 1) * limit;
    return {
        page,
        limit,
        skip,
    };
};
exports.paginationHelper = {
    calculatePagination
};
