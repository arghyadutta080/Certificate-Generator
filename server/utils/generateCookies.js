import jwt from "jsonwebtoken";

const generateCookies = async (user, msg, res) => {
    const token = jwt.sign({ userId: user._id, }, process.env.JWT_SECRET, { expiresIn: '30d' })
    return res.status(201).cookie('token', token, {
        httpOnly: true,
        secure: true,
        SameSite: 'strict'
    }).json({
        success: true,
        message: msg
    })
}

export { generateCookies }