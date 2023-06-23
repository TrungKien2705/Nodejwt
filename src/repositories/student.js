import Exception from "../exceptions/Exception.js";
import HttpStatusCode from "../exceptions/HttpStatusCode.js";
import { print } from "../helpers/print.js";
import { Student } from "../models/index.js";
import { faker } from "@faker-js/faker";
const getAllStudent = async ({ page, size, searchSrting }) => {
  page = parseInt(page);
  size = parseInt(size);
  let filterStudent = await Student.aggregate([
    {
      $match: {
        $or: [
          {
            name: { $regex: `.*${searchSrting}.*`, $options: "i" },
          },
          {
            email: { $regex: `.*${searchSrting}.*`, $options: "i" },
          },
          {
            address: { $regex: `.*${searchSrting}.*`, $options: "i" },
          },
        ],
      },
    },
    {
      $skip: (page - 1) * size,
    },
    {
      $limit: size,
    },
  ]);
  return filterStudent;
};

const getStudentById = async (id) => {
  const student = await Student.findById(id);
  if (!student) {
    throw new Exception("Cannot find Stuent with id ", +id);
  }
  return student;
};

const postCreateStudent = async (data) => {
  try {
    const student = await Student.create(data);
    return student;
  } catch (error) {
    if (error.errors) {
      return new Exception("Invali input", error.errors);
    }
  }
};

const putUpdateStudent = async (data) => {
  // console.log(data);
  try {
    const student = await Student.findById(data.id);
    if (!student) {
      throw new Exception("Cannot find Stuent with id ", +id);
    }
    student.name = data.name ?? student.name;
    student.email = data.email ?? student.email;
    student.languages = data.languages ?? student.languages;
    student.gender = data.gender ?? student.gender;
    student.phoneNumber = data.phoneNumber ?? student.phoneNumber;
    student.address = data.address ?? student.address;
    await student.save();

    return student;
  } catch (error) {
    if (error) {
      return new Exception("Invali input", error);
    }
  }
};

const genertaFakeStudent = async () => {
  let fakeStudents = [];
  for (let i = 0; i < 1000; i++) {
    let fakeStudent = {
      name: `${faker.name.fullName()}-fake`,
      email: faker.internet.email(),
      languages: [
        faker.helpers.arrayElement(["English", "Vietnamese", "French"]),
        faker.helpers.arrayElement(["Korean", "Japanese", "Chinese"]),
      ],
      gender: faker.helpers.arrayElement(["Male", "Female"]),
      phoneNumber: faker.phone.number(),
      address: faker.address.streetAddress(),
    };
    fakeStudents.push(fakeStudent);
  }
  await Student.insertMany(fakeStudents);
};
export default {
  getAllStudent,
  getStudentById,
  postCreateStudent,
  putUpdateStudent,
  genertaFakeStudent,
};
