const Sequelize = require('sequelize');

module.exports = class CardPayment extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            card_number: {
                type: Sequelize.STRING(100),
                primaryKey: true,
                allowNull: false
            },
            name: { // 통장 이름
                type: Sequelize.STRING(100),
                allowNull: false
            },
            limit: { // 한도
                type: Sequelize.STRING(1000),
                allowNull: false,
            },
            grade: {
                type: Sequelize.STRING(20),
                allowNull: false
            },
            user_name: {
                type: Sequelize.STRING(20),
                allowNull: false
            },
            user_resident_number: {
                type: Sequelize.STRING(20),
                allowNull: false
            },
        }, {
            sequelize,
            timestamps: true,
            paranoid: true,
            modelName: 'CardPayment',
            tableName: 'card_payments',
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
};