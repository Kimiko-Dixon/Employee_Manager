// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const {signToken, AuthenticationError} = require('../utils/auth')
const { User, Employee, TimeOffRequest } = require("../models");

const resolvers = {
  Query: {
    me: async (_, __, context) => {
      if (context.user) {
        return await User.findById(context.user._id);
      }
      throw AuthenticationError;
    },
    employees: async (_, { searchTerm, searchBy }) => {
      let query = {};
      if (searchTerm && searchBy) {
        if (searchBy === "name") {
          query = {
            $or: [
              { firstName: { $regex: searchTerm, $options: "i" } },
              { lastName: { $regex: searchTerm, $options: "i" } },
            ],
          };
        } else if (searchBy === "id") {
          query = { _id: searchTerm };
        }
      }
      return await Employee.find(query).sort({ lastName: 1, firstName: 1 });
    },
    employee: async (_, { id }) => {
      return await Employee.findById(id);
    },
    timeOffRequests: async () => {
      return await TimeOffRequest.find().populate("employee");
    },
  },
  Mutation: {
    login: async (_, { username, password }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw AuthenticationError;
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw AuthenticationError;
      }
      const token = signToken(user)
      return { token, user };
    },
    signup: async(_,{username,password,email,role}) => {
      const employee = await Employee.findOne({email})
      if(!employee){
        return new AuthenticationError
      }
      
      const newUser = await User.create({
        username,
        password,
        role
      })

      employee.user.set(newUser._id)
      await employee.save()
      return newUser
    },
    addEmployee: async (_, args) => {
      const employee = await Employee.create(args);
      // Here you would also create a User account for the employee
      return employee;
    },
    updateEmployee: async (_, { id, ...updates }) => {
      return await Employee.findByIdAndUpdate(id, updates, { new: true });
    },
    terminateEmployee: async (_, { id, adminPassword }, context) => {
      if (context.user && context.user.role === "admin") {
        const admin = await User.findById(context.user._id);
        // const isCorrect = await bcrypt.compare(adminPassword, admin.password);
        if (isCorrect) {
          await Employee.findByIdAndUpdate(id, { isActive: false });
          return true;
        }
      }
      return false;
    },
    createTimeOffRequest: async (_, { employeeId, startDate, endDate }) => {
      return await TimeOffRequest.create({
        employee: employeeId,
        startDate,
        endDate,
        status: "pending",
      });
    },
    updateTimeOffRequestStatus: async (_, { requestId, status }) => {
      return await TimeOffRequest.findByIdAndUpdate(
        requestId,
        { status },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
