const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Pokemon',
    author: 'Nitendo',
    url: 'https://nitendo.com',
    likes: 3
  },
  {
    title: 'Hunter\'s x Hunter\'s',
    author: 'Yoshihiro Togashi',
    url: 'https://myanimelist.net/anime/11061/Hunter_x_Hunter_2011',
    likes: 13
  },
  {
    title: 'SHIROBAKO',
    author: 'Michiko Itō and Hajime Tanka',
    url:'https://myanimelist.net/anime/25835/Shirobako',
    likes: 130
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb
}
