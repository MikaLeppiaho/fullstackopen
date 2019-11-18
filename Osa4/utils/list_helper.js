const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const initialValue = 0
    return blogs.reduce((accumulator, currentValue ) => {
        return accumulator + currentValue.likes
    }, initialValue)
     
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((max,p) => p.likes > max ? p.likes: max, blogs[0].likes)
}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}