module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        user_id: DataTypes.INTEGER,
        status: DataTypes.STRING,
        invoice_name: DataTypes.STRING
    }, {
        tableName: 'orders'
    });

    Order.associate = models => {
        models.Order.belongsTo(models.User, { foreignKey: 'user_id' });
        models.Order.hasMany(models.Cart, { foreignKey: 'order_id' });
    };

    return Order;
};