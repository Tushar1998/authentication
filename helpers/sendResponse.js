// this will send response 

// res.status(201).json({
//     status: "Sucessfull",
//     data: [newTask]
// });

const sendResponse = (statusCode, status, data, req, res) => {
    res.status(statusCode).json({
        status: status,
        data: data
    });
}

module.exports = sendResponse;