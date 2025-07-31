export const validation = (schema) => {
    return (req, res, next) => {
        const requestkeys = { ...req.body, ...req.query, ...req.params }
        let { error } = schema.validate(requestkeys, { abortEarly: false })
        if (!error) return next()
        let errors = error.details.map(detail => detail.message)
        return res.json(errors)
    }
}
