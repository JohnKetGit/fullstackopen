const supertest = require('supertest')
const mongoose = require('mongoose')

const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')
const Blog = require('../models/blog')

beforeAll(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog))
  const blogPromises = blogObjects.map((blog) => blog.save())
  await Promise.all(blogPromises)
})

describe('When there are some blogs saved initially', () => {
  let authoriseHeader

  beforeEach(async () => {
    const newUser = {
      username: 'root',
      name: 'root',
      password: 'sekret',
    }

    await api
      .post('/api/users')
      .send(newUser)

    const result = await api
      .post('/api/login')
      .send(newUser)

    authoriseHeader = {
      'Authorization': `bearer ${result.body.token}`
    }
  })

  test('Check blogs are returned as JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 100000)

  test('Ensure all the blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('Ensure that the ID field is named correctly', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
  })

  describe('Addition of a new blog', () => {
    test('Succeeds with valid data', async () => {
      const newBlog = {
        title: 'K-On!',
        author: 'Kakifly',
        url: 'https://myanimelist.net/anime/5680/K-On',
        likes: 1300
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .set(authoriseHeader)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

      const titles = blogsAtEnd.map(b => b.title)
      expect(titles).toContain(
        'K-On!'
      )
    })

    test('Verify the likes property is missing (Default to 0)', async () => {
      const newBlog = {
        title: 'Digimon',
        author: 'Akiyoshi Hongo',
        url: 'https://en.wikipedia.org/wiki/Digimon'
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .set(authoriseHeader)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      let blog = blogsAtEnd.find(blog => blog.url === newBlog.url)

      expect(blog.likes).toBe(0)
    })

    test('Verify if either title/url missing, show status code 400', async () => {
      const newBlog = {
        title: 'Bleach',
        author: 'Noriyuki Abe'
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .set(authoriseHeader)
        .expect(400)
        .expect('Content-Type', /application\/json/)
    })

    test('Adding a blog fails with status code 401 Unauthorized if a token is not provided', async () => {
      const blog = {
        title: 'Test',
        author: 'Test',
        url: 'Test',
        likes: 9
      }

      const response = await api
        .post('/api/blogs')
        .send(blog)
        .set('Accept','application/json')
        .expect('Content-Type',/json/)
        .expect(401)

      expect(response.body.error).toBe('invalid token')
    })
  })

  describe('Deletion of a blog', () => {
    let testBlog
    let newAuthoriseHeader
    let testBlog2

    beforeEach(async () => {
      const newBlog = {
        title: 'test1',
        author: 'test',
        url: 'test',
        likes: 7
      }

      testBlog = await api
        .post('/api/blogs')
        .send(newBlog)
        .set(authoriseHeader)

      const newUser = {
        username: 'test2',
        name: 'test2',
        password: 'test2',
      }

      await api
        .post('/api/users')
        .send(newUser)

      const result = await api
        .post('/api/login')
        .send(newUser)

      newAuthoriseHeader = {
        'Authorization': `bearer ${result.body.token}`
      }

      const newBlog2 = {
        title: 'test2',
        author: 'test2',
        url: 'test2',
        likes: 7
      }

      testBlog2 = await api
        .post('/api/blogs')
        .send(newBlog2)
        .set(newAuthoriseHeader)
    })

    test('Succeeds with status code 204 if ID is valid', async () => {
      const BlogsAtStart = await helper.blogsInDb()

      await api
        .delete(`/api/blogs/${testBlog.body.id}`)
        .set(authoriseHeader)
        .expect(204)

      const BlogsAtEnd = await helper.blogsInDb()

      expect(BlogsAtEnd).toHaveLength(
        BlogsAtStart.length - 1
      )

      const url = BlogsAtEnd.map(blog => blog.url)

      expect(url).not.toContain(testBlog.body.url)
    })

    test('Deleting a blog fails with status code 401 Unauthorized (Wrong user)', async () => {
      const res = await api
        .delete(`/api/blogs/${testBlog2.body.id}`)
        .set(authoriseHeader)
        .expect(401)

      expect(res.body.error).toBe('Only the correct user can delete this blog')
    })
  })

  describe('Updating a blog', () => {
    test('Succeeds with status code 200 if ID is valid', async () => {
      const [ oneBlog] = await helper.blogsInDb()

      const editedBlog = { ...oneBlog, likes: oneBlog.likes + 1 }

      await api
        .put(`/api/blogs/${oneBlog.id}`)
        .send(editedBlog)
        .expect(200)

      const blogsAtEnd = await helper.blogsInDb()
      const edited = blogsAtEnd.find(blog => blog.url === oneBlog.url)
      expect(edited.likes).toBe(oneBlog.likes + 1)
    })
  })
})

describe('When there is initially one user at db', () => {
  test('Creating new user with unique username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('Create user with an existing username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('expected `username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
