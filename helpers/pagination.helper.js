const PaginationConfig = require('./../configs/pagination.config')

module.exports = function(options = {}){
    let perPage = Number(options.pageSize) || PaginationConfig.defaultPageSize
    let currentPage = Number(options.pageNumber || PaginationConfig.defaultPageNumber) 
    let skipCount = perPage * (currentPage -1 ) 
 
    return new Array(perPage, skipCount)
}