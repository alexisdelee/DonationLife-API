const Exception = require("../exceptions");
const UserModel = require("../models").User;


module.exports = class User {
    constructor(id, role, email, password) {
        this.id = id;
        this.role = role;
        this.email = email;
        this.password = password;
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
                    password
                });

                if (user) {
                    return resolve(user);
                }

                throw new Exception.NotFound("no users with this email have been registered")
            } catch (e) { reject(e); }
        });
    }

    save() {
        return new Promise(async (resolve, reject) => {
            try {
                const userModel = new UserModel({
                    email: this.email,
                    password: this.password,
                    isAdmin: false
                });

                const user = await userModel.save();
                resolve(user);
            } catch (e) { reject(e); }
        });
    }
};
