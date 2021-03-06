const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            resident_number: {
                type: Sequelize.STRING(14),
                primaryKey: true,
                allowNull: false
            },
            uid: {
                type: Sequelize.STRING(30),
                allowNull: false
            },
            password: {
                type: Sequelize.STRING(100),
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
            birth_day: { // 생년월일
                type: Sequelize.STRING(50),
                allowNull: false,
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
            timezone: '+09:00',
            paranoid: true,
            modelName: 'User',
            tableName: 'users',
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
};