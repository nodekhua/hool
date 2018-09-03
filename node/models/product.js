module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        productID: DataTypes.INTEGER,
        number: DataTypes.STRING,
        name: DataTypes.STRING,
        quantity: DataTypes.INTEGER,
        packing_unit: DataTypes.INTEGER,
        description: DataTypes.TEXT,
        warranty: DataTypes.INTEGER,
        weight: DataTypes.DECIMAL,
        pre_exchange: DataTypes.INTEGER,
        date_price_change: DataTypes.DATEONLY,
        price: DataTypes.DECIMAL,
        original_number: DataTypes.STRING,
        type: DataTypes.ENUM('Version', 'Accessory'),
        fullcover: DataTypes.BOOLEAN,
        source: DataTypes.STRING
        // primary: DataTypes.INTEGER
    }, {
        tableName: 'products'
    });

    Product.associate = models => {
        models.MainProduct.hasMany(models.Cart, { foreignKey: 'id' });
        models.Product.belongsTo(models.MainProduct, { foreignKey: 'main_product_name' });
    };

    return Product;
};