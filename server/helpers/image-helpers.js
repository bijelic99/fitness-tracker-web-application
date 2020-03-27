//for converting stream to base64 encoding
const streamToBase64 = async function(stream){
    return stream.on('data', chunk => chunk.toString('base64'))
}

module.exports = {
    streamToBase64: streamToBase64
}