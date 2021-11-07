const Sequelize = require('sequelize');
DataTypes = Sequelize.DataTypes;

module.exports = class AccountToCard extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            card_num: {
                type: Sequelize.TEXT,
                default: 'NaN'
            },
            card_name: {
                type: Sequelize.STRING(1000),
                default: 'NaN'
            },
            account_num: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            account_name: { // 통장 이름
                type: Sequelize.STRING(20),
                allowNull: false
            },
            AccountId: {
                type: Sequelize.INTEGER
            },
            CardId: {
                type: Sequelize.INTEGER
            }
        }, {
            sequelize,
            timestamps: true,
            paranoid: true,
            modelName: 'AccountToCard',
            tableName: 'accountTocards',
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate(db) {
        db.AccountToCard.belongsTo(db.User);
    }
};