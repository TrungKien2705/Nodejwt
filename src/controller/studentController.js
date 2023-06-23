import HttpStatusCode from "../exceptions/HttpStatusCode.js";
import { studentRepositories } from "../repositories/index.js";
const getAllStudent = async (req, res) => {
  try {
    const MAX_RECORDS = 100;
    let { page = 1, size = MAX_RECORDS, searchSrting = "" } = req.query;
    size = size >= MAX_RECORDS ? MAX_RECORDS : size;

    let std = await studentRepositories.getAllStudent({
      page,
      size,
      searchSrting,
    });
    res.status(HttpStatusCode.OK).json({
      msg: "Get all Student success",
      page,
      searchSrting,
      size: std.length,
      data: std,
    });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      msg: error.message,
    });
  }
};

const getStudentById = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const student = await studentRepositories.getStudentById(id);
    res.status(HttpStatusCode.OK).json({
      msg: "Get detail Student success",
      data: student,
    });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      msg: error.message,
    });
  }
};

const postCreateStudent = async (req, res) => {
  try {
    const student = await studentRepositories.postCreateStudent(req.body);
    res.status(HttpStatusCode.OK).json({
      msg: "Create new Student",
      data: student,
    });
  } catch (error) {
    res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ msg: error.toString() });
  }
};

const putUpdateStudent = async (req, res) => {
  try {
    const student = await studentRepositories.putUpdateStudent(req.body);
    res.status(HttpStatusCode.OK).json({
      msg: "Update Student success",
      data: student,
    });
  } catch (error) {
    res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ msg: error.toString() });
  }
};

const genertaFakeStudent = async (req, res) => {
  await studentRepositories.genertaFakeStudent();
  res.status(HttpStatusCode.OK).json({
    msg: "Create new Student Fake",
  });
};
export default {
  getAllStudent,
  getStudentById,
  postCreateStudent,
  putUpdateStudent,
  genertaFakeStudent,
};
