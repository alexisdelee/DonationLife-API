const Exception = require("../exceptions");
const UserModel = require("../models").User;
const Role = require("./Role");
const Authencation = require("./Authentication");


module.exports = class User {
    constructor(id, role, firstname, lastname, email, password, age, gender, phone, address, bloodType, sexualOrientation, allergens, vaccines, medicalForm) {
        this.id = id;
        this.role = role;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.age = age;
        this.gender = gender;
        this.phone = phone;
        this.address = address;
        this.bloodType = bloodType;
        this.sexualOrientation = sexualOrientation;
        this.allergens = allergens;
        this.vaccines = vaccines;
        this.medicalForm = medicalForm;
    }

    static get Instance() {
        return new User();
    }

    find(criteria) {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await UserModel.findOne(criteria);
                resolve(user);
            } catch (e) { reject(e); }
        });
    }

    static findAll() {
        return new Promise(async (resolve, reject) => {
            try {
                const users = await UserModel.find();
                resolve(users);
            } catch (e) { reject(e); }
        });
    }

    static sign(email, password) {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await User.Instance.find({
                    email,
                    password: Authencation.hash(password)
                });

                if (user) {
                    return resolve(user);
                }

                throw new Exception.NotFound("no users with this email have been registered")
            } catch (e) { reject(e); }
        });
    }

    save() {
        const self = this;

        return new Promise(async (resolve, reject) => {
            try {
                const userModel = new UserModel({
                    firstname: self.firstname,
                    lastname: self.lastname,
                    email: self.email,
                    password: Authencation.hash(self.password),
                    age: self.age,
                    gender: self.gender,
                    phone: self.phone,
                    address: self.address,
                    bloodType: self.bloodType,
                    sexualOrientation: self.sexualOrientation,
                    isAdmin: self.role == Role.Admin.name,
                    allergens: null,
                    vaccines: null,
                    medicalForm: null
                });

                if (self.age < 18) {
                    throw new Exception.BadRequest("you must be of legal age");
                } else if (self.phone.length != 10) {
                    throw new Exception.BadRequest("please enter a valid phone number");
                }

                const user = await userModel.save();
                resolve(user);
            } catch (e) { reject(e); }
        });
    }

    saveMedicalData() {
        const self = this;

        return new Promise(async (resolve, reject) => {
            try {
                await UserModel.findByIdAndUpdate(self.id, {
                    $set: {
                        allergens: self.allergens,
                        vaccines: self.vaccines,
                        medicalForm: self.medicalForm
                    }
                });

                resolve();
            } catch (e) { reject(e); }
        });
    }
};
