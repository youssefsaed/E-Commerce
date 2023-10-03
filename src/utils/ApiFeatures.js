export class ApiFeatures {
    constructor(reuseQuery, reqQuery) {
        this.reuseQuery = reuseQuery
        this.reqQuery = reqQuery
    }
    //pagination
    paginate() {
        let page = this.reqQuery.page * 1 || 1
        if (page <= 0) page = 1
        let skip = (page - 1) * 5
        this.reuseQuery.skip(skip).limit(5)
        this.page = page
        return this
    }
    //filteration
    filter() {
        let filterObj = { ...this.reqQuery }
        const exception = ['page', 'sort', 'fields', 'keyword']
        exception.forEach(q => {
            delete filterObj[q]
        })
        filterObj = JSON.stringify(filterObj)
        filterObj = filterObj.replace(/\b(gt|lt|gte|lte)\b/g, value => `$${value}`)
        filterObj = JSON.parse(filterObj)
        this.reuseQuery.find(filterObj)
        return this
    }
    //sort
    sort() {
        if (this.reqQuery.sort) {
            const sort = this.reqQuery.sort.split(',').join(' ')
            this.reuseQuery.sort(sort)
        }
        return this
    }
    //search
    search() {
        if (this.reqQuery.keyword) {
            this.reuseQuery.find({
                $or: [
                    { title: { $regex: this.reqQuery.keyword, $options: 'i' } },     // i => insensitive
                    { description: { $regex: this.reqQuery.keyword, $options: 'i' } },
                ]
            })
        }
        return this
    }
    //selcted fields
    fields() {
        if (this.reqQuery.fields) {
            const fields = this.reqQuery.fields.split(',').join(' ')
           this.reuseQuery.select(fields)
        }
        return this
    }
}










