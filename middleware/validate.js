const Joi = require('joi');


module.exports.universitySchema = Joi.object({
    universityName: Joi.string().trim().required(),
    universityId: Joi.string(),
    email: Joi.string().email().required().lowercase().trim(),
    isDeleted: Joi.boolean().default(false),
    password: Joi.string().min(3).max(30).required(),
    token: Joi.string()
});

module.exports.branchSchema = Joi.object({
    branchName: Joi.string().required().trim(),
    branchCode: Joi.string(),
    universityId: Joi.string(),
    isDeleted: Joi.boolean().default(false)
});


module.exports.subjectSchema = Joi.object({
    subjectName: Joi.string().required().trim(),
    subjectCode: Joi.string(),
    universityId: Joi.string().required(),
    branchId: Joi.string().required(),
    isDeleted: Joi.boolean().default(false)
});


module.exports.facultySchema = Joi.object({
    facultyName: Joi.string().required().trim(),
    facultyId: Joi.string(),
    age: Joi.number().required(),
    email: Joi.string().email().required().lowercase().trim(),
    universityId: Joi.string().required(),
    branchId: Joi.string().required(),
    isDeleted: Joi.boolean().default(false),
    password: Joi.string().min(3).max(30),
    token: Joi.string()

});



module.exports.studentSchema = Joi.object({
    studentName: Joi.string().required().trim(),
    studentId: Joi.string(),
    age: Joi.number().required(),
    email: Joi.string().email().required().lowercase().trim(),
    address: Joi.string().required(),
    universityId: Joi.string().required(),
    branchId: Joi.string().required(),
    mentorId: Joi.string().required(),
    isDeleted: Joi.boolean().default(false),
    password: Joi.string().min(3).max(30),
    token: Joi.string()

});


module.exports.updateStudentSchema = Joi.object({
    studentName: Joi.string().trim(),
    age: Joi.number(),
    address: Joi.string(),
    universityId: Joi.string(),
    branchId: Joi.string(),
    mentorId: Joi.string(),
});

module.exports.updateFacultySchema = Joi.object({
    facultyName: Joi.string().trim(),
    age: Joi.number(),
    universityId: Joi.string(),
    branchId: Joi.string(),
    facultySubjects: Joi.string()
});


module.exports.updateSubjectSchema = Joi.object({
    subjectName: Joi.string().trim(),
    universityId: Joi.string(),
    branchId: Joi.string(),
});


module.exports.UpdateBranchSchema = Joi.object({
    branchName: Joi.string().trim(),
    branchCode: Joi.string(),
    universityId: Joi.string(),
});

module.exports.updateUniversitySchema = Joi.object({
    universityName: Joi.string().trim().required(),
    universityId: Joi.string(),
});