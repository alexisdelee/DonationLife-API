const db = require("../models");


/*
Admin
    |-- User
 */


class Role {
    constructor(role, parent = null) {
        this.name = role;
        this.__parent__ = parent;
    }

    static get Admin() {
        return new Role("admin");
    }

    static get User() {
        return new Role("user", Role.Admin);
    }

    static findInstanceByName(role, currentRole = Role.User) {
        if (role === currentRole.name) {
            return currentRole;
        } else if (currentRole.__parent__ === null) {
            return null;
        }

        return Role.findInstanceByName(role, currentRole.__parent__);
    }

    static findByName(role) {
        return db.Role.findOne({
            where: {
                name: role
            }
        });
    }

    static underControl(lowestRoleRequested, role, strict) {
        role = { ...role };

        if (strict) {
            if (lowestRoleRequested.__parent__ === null) {
                return false;
            }

            return Role.underControl(lowestRoleRequested.__parent__, role, false);
        } else {
            if (lowestRoleRequested.name === role.name) {
                return true;
            } else if (lowestRoleRequested.__parent__ === null) {
                return false;
            }

            return Role.underControl(lowestRoleRequested.__parent__, role, false);
        }
    }
}


module.exports = Role;
