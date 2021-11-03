const Sequelize = require('sequelize');

module.exports = class Card extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            name: { // 통장 이름
                type: Sequelize.STRING(20),
                allowNull: false
            },
            annual_fee: { // 연회비
                type: Sequelize.FLOAT,
                allowNull: false
            },
            fee: { // 수수료
                type: Sequelize.FLOAT,
                allowNull: false
            },
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
    static associate(db) {
        db.Card.belongsTo(db.User);
    }
};