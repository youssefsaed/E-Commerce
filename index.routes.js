
import categoryRouter from "./src/modules/category/category.routes.js";
import BrandRouter from "./src/modules/brand/brand.routes.js";
import subCategoryRouter from "./src/modules/subcategory/subcategory.routes.js";
import productRouter from "./src/modules/product/product.routes.js";
import authRouter from "./src/modules/Auth/auth.routes.js";
import userRouter from "./src/modules/user/user.routes.js";
import reviewRouter from "./src/modules/review/review.routes.js";
import wishlistRouter from "./src/modules/wishlist/wishlist.routes.js";
import addressRouter from "./src/modules/addresses/address.routes.js";
import couponRouter from "./src/modules/coupon/coupon.routes.js";
import cartRouter from "./src/modules/cart/cart.routes.js";
import orderRouter from "./src/modules/order/order.routes.js";

const baseUrl = '/api/v1'

function init(app) {
    app.use(`${baseUrl}/categories`, categoryRouter)
    app.use(`${baseUrl}/subcategories`, subCategoryRouter)
    app.use(`${baseUrl}/brands`, BrandRouter)
    app.use(`${baseUrl}/products`, productRouter)
    app.use(`${baseUrl}/auth`, authRouter)
    app.use(`${baseUrl}/users`, userRouter)
    app.use(`${baseUrl}/reviews`, reviewRouter)
    app.use(`${baseUrl}/wishlist`, wishlistRouter)
    app.use(`${baseUrl}/addresses`, addressRouter)
    app.use(`${baseUrl}/coupon`, couponRouter)
    app.use(`${baseUrl}/cart`, cartRouter)
    app.use(`${baseUrl}/order`, orderRouter)

    app.all('*', (req, res, next) => {
        next(new Error("invalid url - can't access this endpoint" + req.originalUrl, { cause: 404 }))
    })
    app.use((err, req, res, next) => {
        res.status(err['cause'] || 500).json({ Error: err.message })
    })
}

export default init