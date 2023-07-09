// If the function only contains a single expression then the braces are not needed.
const Header = (course) => <h1>{course.course.name}</h1>

const Part = (part) => {
  // console.log(part.part);
  return (
    <>
      <p>{part.part.name} {part.part.exercise}</p>
    </>
  )
}

const Content = (course) => {
  return (
    <div>
      <Part part={course.course.parts[0]}/>
      <Part part={course.course.parts[1]}/>
      <Part part={course.course.parts[2]}/>
    </div>
  )
}

const Total = (course) => {
  return (
    <>
      <p>Number of exercises {
        course.course.parts[0].exercise + 
        course.course.parts[1].exercise + 
        course.course.parts[2].exercise
      }
      </p>
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React', 
        exercise: 10
      },
      {
        name: 'Using props to pass data', 
        exercise: 7
      },
      {
        name: 'State of a component', 
        exercise: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course}/>
      <Content course={course}/>
      <Total course={course}/>
    </div>
  )
}

export default App
