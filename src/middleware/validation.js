export const validation = (schema) => {
    return (req, res, next) => {
        const requestkeys = ['body', 'query', 'params', 'headers', 'file', 'files']
        for (const key of requestkeys) {
            if (schema[key]) {
                let { error } = schema[key].validate(req[key], { abortEarly: false })
                if (!error) return next()
                let errors = error.details.map(detail => detail.message)
                return res.json(errors)
            }
        }

    }
}