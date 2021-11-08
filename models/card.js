const Sequelize = require('sequelize');

module.exports = class Card extends Sequelize.Model {
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
            annual_fee: { // 연회비
                type: Sequelize.TEXT,
                allowNull: false
            },
            fee: { // 수수료
                type: Sequelize.STRING(1000),
                allowNull: false
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
            user_account_name: {
                type: Sequelize.STRING(20),
                allowNull: false
            },
            user_phone: {
                type: Sequelize.STRING(15),
                allowNull: false,
            },
            user_email: {
                type: Sequelize.STRING(50),
                allowNull: false,
            }
        }, {
            sequelize,
            timestamps: true,
            paranoid: true,
            modelName: 'Card',
            tableName: 'cards',
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
};