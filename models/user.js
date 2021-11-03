const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            uid: {
                type: Sequelize.STRING(30),
                allowNull: false
            },
            password: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            resident_number: {
                type: Sequelize.STRING(14),
                allowNull: false
            },
            name: {
                type: Sequelize.STRING(10),
                allowNull: false
            },
            address: {
                type: Sequelize.STRING(30),
                allowNull: false
            },
            email: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            phone: {
                type: Sequelize.STRING(13),
                allowNull: false
            },
            job: {
                type: Sequelize.STRING(15),
                allowNull: false
            }
        }, {
            sequelize,
            timestamps: true,
            paranoid: true,
            modelName: 'User',
            tableName: 'users',
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
};