const pictureResize = async (req, res, next) => {
    console.log(await req)
    next()
}

module.exports = pictureResize