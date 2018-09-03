module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define('Cart', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        product_number: DataTypes.STRING,
        order_id: DataTypes.INTEGER,
        quantity: DataTypes.INTEGER,
        product_id: DataTypes.INTEGER
    }, {
        tableName: 'cart'
    });

    Cart.associate = models => {
        models.Cart.belongsTo(models.Product, { foreignKey: 'product_id', as: 'Product' });
        models.Cart.belongsTo(models.Order, { foreignKey: 'order_id' });
    };

    return Cart;
};