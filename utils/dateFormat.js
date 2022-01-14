const dateFormat = (mongooseDate) => {
    var dateString = (mongooseDate.getMonth() + 1) + "-" + mongooseDate.getDate() + "-" + mongooseDate.getFullYear() + " at " +
        mongooseDate.getHours() + ":" + mongooseDate.getMinutes();

    return dateString
}

module.exports = dateFormat;