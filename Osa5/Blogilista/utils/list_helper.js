var lodash = require('lodash')
const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogList =  [ 
    { 
      title: "React patterns", 
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7, 
    }, 
    {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra", url: 
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", 
      likes: 5,
    },
    { 
      
      title: "Canonical string reduction", 
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", 
      likes: 12, 
    },
    { 
      title: "First class tests", 
      author: "Robert C. Martin", 
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", 
      likes: 10, 
    }, 
    { 
      title: "TDD harms architecture", 
      author: "Robert C. Martin", 
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", 
      likes: 0, 
    }, 
    { 
    title: "Type Wars", 
    author: "Robert C. Martin", 
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", 
    likes: 0, 
    },
]

const initialUsersList = [
    {
        name: "Mika Leppiaho",
        username: "mika",
        password: "salasana"
    }
]

const BlogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(note => note.toJSON())
  }

const UsersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    
    const initialValue = 0
    
    let sum = blogs.reduce(
        (acc, cur) => acc + cur.likes
    , initialValue )
    return sum
}

const favouriteBlog = (blogs) => {
    
    let biggestVote = Math.max.apply(Math, blogs.map(n => n.likes))
    let mostVoted = blogs.filter(n => n.likes == biggestVote)
    return mostVoted
}


function mostBlogs(blogs){
    
    const sortBlogs = blogs.sort((a,b) => blogs.filter(v => v===a).length - blogs.filter(v => v===b).length)
    const mostBlogs = sortBlogs[sortBlogs.length-1].author

    const amount = blogs.reduce((acc,curr) => {
        if(curr.author === mostBlogs){
            acc++
        }
        return acc
    },0)

    return {
        author: mostBlogs,
        blogs: amount,
    }
}

const mostLikes = (blogs) => {
    
    const arrayBloggers = blogs.map(n => {
        return {author: n.author,
                likes: n.likes} 
    } )
    const summed = lodash(arrayBloggers)
        .groupBy('author')
        .map((obj, key) => {
            return{
                'author':key,
                'likes' :lodash.sumBy(obj, 'likes')
            }
        }).value()

        let biggestVote = Math.max.apply(Math, summed.map(n => n.likes))
        let mostVoted = summed.filter(n => n.likes == biggestVote)
        console.log("biggestVote",mostVoted)
        return {"author":mostVoted[0].author, "likes":mostVoted[0].likes}

    

    
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes,
    initialBlogList,
    initialUsersList,
    BlogsInDb,
    UsersInDb
}