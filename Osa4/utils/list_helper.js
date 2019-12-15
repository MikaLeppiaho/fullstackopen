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
    const likes =  blogs.reduce((max,p) => p.likes > max ? p: max, blogs[0].likes)
    const bestBlog = {
        title: likes.title,
        author: likes.author,
        likes: likes.likes
    }
    console.log(bestBlog)
    return bestBlog
}
const mostBlogs = (blogs) => {
    
}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}