import userModal from "../../../DB/model/user.modal.js"



const addAddress = async (req, res, next) => {

    const user = await userModal.findOneAndUpdate({ _id: req.user.id }, { $push: { address: req.body } }, { new: true })
    return res.json({ message: "success", Address: user.address })
}

const removeAddress = async (req, res, next) => {
    await userModal.findOneAndUpdate({ _id: req.user.id }, {
        $pull: {
            address: { _id: req.params.id }
        }
    }, { new: true })
    return res.json({ message: "success" })
}

const getAddressWithUser = async (req, res, next) => {
    const user = await userModal.findOne({ _id: req.user.id }).populate('address')
    return res.json({ message: "success", address: user.address })
}

export {
    addAddress,
    removeAddress,
    getAddressWithUser
}