After cloning the git repository, required to run command "npm install" for installing dependecies.
For the testing the graph query languages, running server with "node index.js" or "nodemon index.js" which is required to perform after installing all the dependencies.

Some simple query example could be available following below,

query Get_queries_get_student_by_id

#query basic_student_get
#student_get_by_id
{
  student(id:1){
    Name{Firstname, Lastname}
    Email
    Birthday
    Address
    Class
    Id
    GroupId
  }
}
query stduent_get_all
#student get all
{students
  {
    Id
    Email
    Address
    Class
    alias
    Birthday
    Name{
    	Firstname 
      Lastname
  	}
  }
}

#query basic_course_get
query get_course_by_id
#Get course by id
{
  course(id:1){
    Name
    Teacher
    Description
    Id
  }
}

#Get Courses all
query course_get_all
{
  courses{
    Name
    Teacher
    Description
    Id 
  }
}

query Grade_info_individuals{
  gradeInfo(id: 3){
    Course{Name}, Student{Name{Firstname, Lastname}}, Grade
  }
}

query Grades_info_individuals{
  gradesInfo{
    Id,
    Course{Name}, Student{Name{Firstname, Lastname}}, Grade
  }
}

#get student grades by student id
query Grade_by_student_id{
  gradeByStudent(id: 3){
    gradeData{Student, Course, Id, Grade}
  }
}

mutation Post_mutations_create_student
#mutation create_student
{
  createStudent(
    email: "test@email.com"
    name: { Firstname: "test", Lastname: "yo" }
    class: "Test19"
		address: "WallStreet 1"
    groupId: 1
    birthday: "05-06-2000"
  ) {
    success
  }
}

#mutation create_course
mutation create_course {
  createCourse(
    name: "Test Course"
		teacher: "Test Teacher"
		description: "This is test"
  ) {
    success
  }
}

#mutation create_grade
mutation create_grade {
  createGrade(
		student: 1,
    course: 1,
    grade: "test"
  ) {
    success
  }
}

mutation Edit_mutations_edit_student 
#mutation update student data
{
  editStudent(
    id: 1,
    name:{Firstname: "Test", Lastname:"First"},
    email: "test@test.com",
    birthday: "01-02-1987",
    address: "TestKatu 1",
    class: "Test19",
    groupId: 2,
    alias: "tester"
  ) {
  Id,Firstname,Lastname,Email,Birthday,Address,Class,GroupId,alias,msg
  }
}

#mutation update course data
mutation edit_course {
  editCourse(
    id: 1,
		teacher: "Tester",
    description: "This is edit test",
    name: "Test course"
  ) {
  Id, Name, Teacher, Description, msg
  }
}

#mutation update grade data
mutation edit_grade {
  editGrade(
    id: 1,
		student: 1,
    course: 1,
    grade: "A"
  ) {
  Id, Student, Course, Grade, msg
  }
}

mutation Delete_mutations_delete_student
#mutation delete_student 
{
  deleteStudent(
    id: 1,
  ) {
  msg, result
  }
}

mutation delete_course{
  deleteCourse(
    id: 2,
  ) {
  msg, result
  }
}

mutation delete_grade
{
  deleteGrade(
    id: 3,
  ) {
  msg, result
  }
}