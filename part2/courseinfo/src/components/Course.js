const Header = ({course}) => <h2>{course.name}</h2>

const Part = ({part}) => <p>{part.name} {part.exercises}</p>

const Content = ({course}) => {
  return (
    <div>
      <Header course={course}/>
      {course.parts.map((part) => <Part key={part.id} part={part}/>)}
      <Total course={course}/>
    </div>
  )
}

const Course = ({courses}) => {
  //console.log(courses)

  // courses.map((course) => {
  //   console.log(course)
  // })

  return (
    <>
      {courses.map((course) => <Content key={course.id} course={course}/>)}
    </>
  )
}

const Total = ({course}) => {
  const result = course.parts.reduce((initial, parts) => initial + parts.exercises, 0)

  return (
    <>
      <b>total of {result} exercises</b>
    </>
  )
}

export default Course
