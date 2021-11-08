const Sequelize = require('sequelize');

module.exports = class Deposit extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            sender: { // 보내는 사람 id
                type: Sequelize.TEXT,
                allowNull: false
            },
            sender_name: { // 보내는 사람 이름
                type: Sequelize.STRING(100),
                allowNull: false
            },
            money: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            receiver: { // 받는 사람 id
                type: Sequelize.TEXT,
                allowNull: false
            },
            receiver_name: { // 받는 사람 이름
                type: Sequelize.STRING(100),
                allowNull: false
            },
        }, {
            sequelize,
            timestamps: true,
            paranoid: true,
            modelName: 'Deposit',
            tableName: 'deposits',
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
};