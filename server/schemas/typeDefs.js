const typeDefs = `
  type User {
    _id: ID!
    username: String!
    role: String!
  }

  type Employee {
    _id: ID!
    firstName: String!
    lastName: String!
    address: String!
    phoneNumber: String!
    email: String!
    ssn: String!
    position: String!
    pay: Float!
    startDate: String!
    isActive: Boolean!
    user:User
  }

  type TimeOffRequest {
    _id: ID!
    employee: Employee!
    startDate: String!
    endDate: String!
    status: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    employees: [Employee]
    employee(id: ID!): Employee
    timeOffRequests: [TimeOffRequest]
  }

  type Mutation {
    login(username: String!, password: String!): Auth
    signup(username:String!, password: String!,email:String!,role:String):Auth
    addEmployee(
      firstName: String!
      lastName: String!
      address: String!
      phoneNumber: String!
      email: String!
      ssn: String!
      position: String!
      pay: Float!
      startDate: String!
      user:User
    ): Employee
    updateEmployee(
      id: ID!
      firstName: String
      lastName: String
      ssn: String
      position: String
      pay: Float
      address: String
      phoneNumber: String
      email: String
    ): Employee
    terminateEmployee(id: ID!, adminPassword: String!): Boolean
    createTimeOffRequest(
      employeeId: ID!
      startDate: String!
      endDate: String!
    ): TimeOffRequest
    updateTimeOffRequestStatus(requestId: ID!, status: String!): TimeOffRequest
  }
`;

module.exports = typeDefs;
