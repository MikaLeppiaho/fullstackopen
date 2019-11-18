const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const initialValue = 0
    const sum = blogs.reduce((accumulator, currentValue ) => {
        return accumulator + currentValue.likes
    }, initialValue)
    return sum
}


module.exports = {
    dummy,
    totalLikes
}