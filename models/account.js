const Sequelize = require('sequelize');
DataTypes = Sequelize.DataTypes;

module.exports = class Account extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            account_num: {
                type: Sequelize.STRING(255),
                primaryKey: true,
                allowNull: false
            },
            name: { // 통장 이름
                type: Sequelize.STRING(20),
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
            kind_of_account: { // 예금구분
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            fee: { // 수수료
                type: Sequelize.FLOAT,
                allowNull: false
            },
            is_card_registered: { // isCardRegistered
                type: Sequelize.STRING(100),
                allowNull: false,
                default: "F"
            },
            user_name: { // UserName
                type: Sequelize.STRING(10),
                allowNull: false,
            },
            user_phone: { // UserPhone
                type: Sequelize.STRING(15),
                allowNull: false,
            },
            user_email: { // UserEmail
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            user_resident_num: { // UserResidentNum
                type: Sequelize.STRING(14),
                allowNull: false,
            }
        }, {
            sequelize,
            timestamps: true,
            timezone: '+09:00',
            paranoid: true,
            modelName: 'Account',
            tableName: 'accounts',
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
};