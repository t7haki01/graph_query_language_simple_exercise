let express = require('express');

var data = require('./data');

const { ApolloServer, gql } = require('apollo-server-express');

const app = express();

const schema = gql`
  type Mutation {
# From here starting post/create request mutation 
    createStudent(
      name: studentName!,
      email: String!,
      address: String!,
      birthday: String!,
      class: String!,
      groupId: Int!,
      alias: String
      ): createResponse!
    ,
    createCourse(
      teacher: String!,
      name: String!,
      description: String!,
      ) : createResponse!
    ,
    createGrade(
      course: Int!,
      student: Int!,
      grade: String!,
    ) : createResponse!
    ,
# And from here starting edit/update request mutation
    editStudent(
      id: ID!,
      name: studentName,
      email: String,
      address: String,
      birthday: String,
      groupId: Int,
      class: String,
      alias: String
    ) : editResponse!
    ,
    editCourse(
      id: ID!,
      teacher: String,
      description: String,
      name: String
    ) : editResponse!
    ,
    editGrade(
      id: ID!,
      student: Int!,
      course: Int!,
      grade: String
    ) : editResponse!
    ,
# And from here delete request mutation
    deleteStudent(
      id:ID!
    ) : deleteResponse!
    ,
    deleteCourse(
      id:ID!
    ) : deleteResponse!
    ,
    deleteGrade(
      id:ID!
    ) : deleteResponse!

  }

# Simply create, delete response give simple information but for the testing,
# when editting i put all the available edittable field from all data then show as result
# and using it to all response

  type createResponse {
    success: Boolean!    
  }

  type deleteResponse {
    msg: String!,
    result: Boolean!
  }

  type editResponse {
    Firstname: String,
    Lastname: String,
    Email: String,
    Birthday: String,
    Address: String,
    Class: String,
    Id: ID!,
    GroupId: Int,
    alias: String,
    Teacher: String,
    Name: String,
    Description: String,
    Course: Int,
    Student: Int,
    Grade: String
    msg: String!
  }

  type Query {
    student(id: ID!): Student,
    students: [Student!]!,

    course(id: ID!): Course,
    courses: [Course!]!,

# below Those two are unnecessary and not used really
    grade(id: ID!): Grade,
    grades: [Grade!]!,

    gradeInfo(id: ID!): GradeInfo,
    gradesInfo: [GradeInfo!]!,
# And this is for own query to study little bit about gql
    gradeByStudent(id: ID!): GradeByStudent,
  }

  type Student {
    Id: ID!,
    GroupId: Int!,
    Email: String!,
    Name: Name!,
    Address: String!,
    Birthday: String!,
    Class: String!,
    alias: String
  }

  type Course{
    Teacher: String!,
    Name: String!,
    Description: String!,
    Id: ID!
  }

  type Grade{
    Course: Int!,
    Student: Int!,
    Grade: String!,
    Id: ID!
  }

  type Name {
      Firstname: String!,
      Lastname: String!
  }

  input studentName {
    Firstname: String!,
    Lastname: String!
  }

  type GradeByStudent {
    Id: ID!
    gradeData: [gradeData]
  }

  type gradeData{
    Course: String,
    Student: String,
    Grade: String,
    Id: ID
  }

  type GradeInfo {
    Id:ID!,
    Course: Course,
    Student: Student,
    Grade: String
  }
`;

const resolvers = {
  Query: {
    student: (parent, args, context, info) => {
      return data.students.find(student => parseInt(student.Id) === parseInt(args.id));
    },
    students: (parents, args, context, info) => {
      return data.students;
    },
    course: (parent, args, context, info) => {
      return data.courses.find(course => course.Id === parseInt(args.id));
    },
    courses: (parent, args, context, info) => {
      return data.courses;
    },
    grade: (parent, args, context, info) => {
      return data.grades.find(grade => grade.Id === parseInt(args.id));
    },
    grades: (parent, args, context, info) => {
      return data.grades;
    },
    gradeByStudent: (parent, args, context, info) => {
      return data.grades.find(grade => grade.Student === parseInt(args.id));
    },
    gradeInfo: (parent, args, context, info) => {
      return data.grades.find(grade => parseInt(grade.Id) === parseInt(args.id));
    },
    gradesInfo: (parent, args, context, info) => {
      return data.grades;
    }
  },

  Mutation: {
    createStudent: (parent, args, context, info) => { 
      let newStudent = {
        Id: data.students.length+1,
        Email: args.email,
        Firstname: args.name.Firstname,
        Lastname: args.name.Lastname,
        Address: args.address,
        Class: args.class,
        GroupId : args.groupId,
        Birthday: args.birthday,
        alias: args.alias
      }
      data.students.push(newStudent);
      return { success: true }
    },

    createCourse: (parent, args, context, info) => {
      let newCourse = {
        Id: data.courses.length+1,
        Teacher: args.teacher,
        Name: args.name,
        Description: args.description,
      }
      data.courses.push(newCourse);
      return { success: true }
    },

    createGrade: (parent, args, context, info) => {
      let newGrade = {
        Id: data.grades.length+1,
        Course: args.course,
        Student: args.student,
        Grade: args.grade,
      }
      data.grades.push(newGrade);
      return { success: true }
    },

    editStudent: (parent, args, context, info) => {
      var index = data.students.findIndex(student=> student.Id === parseInt(args.id));

      var modifiedStudent = {
        Firstname: args.name.Firstname,
        Lastname: args.name.Lastname,
        Email: args.email,
        Birthday: args.birthday,
        Address: args.address,
        Class: args.class,
        Id: args.id,
        GroupId: args.groupId,
        alias: args.alias
      };
 
      data.students[index] = modifiedStudent ;

      modifiedStudent = {
        Firstname: args.name.Firstname,
        Lastname: args.name.Lastname,
        Email: args.email,
        Birthday: args.birthday,
        Address: args.address,
        Class: args.class,
        Id: parseInt(args.id),
        GroupId: args.groupId,
        alias: args.alias,
        msg: "Student Data modified as above"
      } 
      return modifiedStudent ;
    },

    editCourse: (parent, args, context, info) => {

      var index = data.courses.findIndex(course=> course.Id === parseInt(args.id));

      var modifiedCourse = {
        Teacher: args.teacher,
        Name: args.name,
        Description: args.description,
        Id: parseInt(args.id)
      };
 
      data.courses[index] = modifiedCourse ;

      modifiedCourse = {
        Teacher: args.teacher,
        Name: args.name,
        Description: args.description,
        Id: parseInt(args.id),
        msg: "Course Data modified as above"
      } 
      return modifiedCourse ;
    },
    editGrade: (parent, args, context, info) => {

      var index = data.grades.findIndex(grade=> grade.Id === parseInt(args.id));

      var modifiedGrade = {
        Course: parseInt(args.course),
        Student: parseInt(args.student),
        Grade: args.grade,
        Id: parseInt(args.id)
      };
 
      data.grades[index] = modifiedGrade ;

      modifiedGrade = {
        Course: parseInt(args.course),
        Student: parseInt(args.student),
        Grade: args.grade,
        Id: parseInt(args.id),
        msg: "Grade Data modified as above"
      } 
      return modifiedGrade ;
    },

    deleteStudent: (parent, args, context, info) => {
      var index = data.students.findIndex(student=>parseInt(student.Id) === parseInt(args.id));
      data.students.splice(index,1);
      return {
              msg: "Student data which id is " + args.id + ", has been deleted",
              result: true
            }
    },
    deleteCourse: (parent, args, context, info) => {
      var index = data.courses.findIndex(course=>parseInt(course.Id) === parseInt(args.id));
      data.courses.splice(index,1);
      return {
              msg: "Course data which id is " + args.id + ", has been deleted",
              result: true
            }
    },
    deleteGrade: (parent, args, context, info) => {
      var index = data.grades.findIndex(grade=>parseInt(grade.Id) === parseInt(args.id));
      data.grades.splice(index,1);
      return {
              msg: "Grade data which id is " + args.id + ", has been deleted",
              result: true
            }
    },

  },

  Student: {
    Name: (parent, args, context, info) =>
    {
      return {
        Firstname: parent.Firstname,
        Lastname: parent.Lastname
      }
    },
  }, 
  GradeInfo: {
    Student: (parent,args,context,info) => {
      return data.students.find(student => student.Id == parent.Student);
    },
    Course: (parent,args,context,info) => {
      return data.courses.find(course => course.Id == parent.Course);
    }
  },
  GradeByStudent: {
    gradeData: (parent, args, context, info) => {
        var studentName = data.students.find(student => student.Id === parseInt(parent.Id)).Firstname +
            " " + data.students.find(student => student.Id === parseInt(parent.Id)).Lastname ;
        var gradeinfo = new Array();

        for(var grade in data.grades){
          if(data.grades[grade].Student === parseInt(parent.Id)){
            var temp = {};
            var courseName = data.courses.find(course => course.Id === parseInt(data.grades[grade].Course)).Name;
            temp.Course = courseName;
            temp.Student = studentName;
            temp.Id = data.grades[grade].Id;
            temp.Grade = data.grades[grade].Grade;
            gradeinfo.push(temp);
          }
        }
      return gradeinfo;
    }
  }
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  formatError: error => {
    console.log(error);
    return error;
  },
  formatResponse: response => {
    console.log(response);
    return response;
  },
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: 8000 }, () => {
  console.log('Apollo Server on http://localhost:8000/graphql');
  console.log('Server on ' + new Date());
});