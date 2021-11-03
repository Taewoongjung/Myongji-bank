const Sequelize = require('sequelize');

module.exports = class Account extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            name: { // 통장 이름
                type: Sequelize.STRING(20),
                allowNull: false
            },
            account_num: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            deposit: {
                type: Sequelize.INTEGER,
                default: 0
            },
            interest: { // 금리
                type: Sequelize.FLOAT,
                allowNull: false
            },
            fee: { // 수수료
                type: Sequelize.FLOAT,
                allowNull: false
            },
            variability: { // 변동 금리
                type: Sequelize.STRING(1),
                allowNull: false,
                default: "T"
            }
        }, {
            sequelize,
            timestamps: true,
            paranoid: true,
            modelName: 'Account',
            tableName: 'accounts',
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate(db) {
        db.Account.belongsTo(db.User);
    }
};