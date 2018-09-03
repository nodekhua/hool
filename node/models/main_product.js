module.exports = (sequelize, DataTypes) => {
    const MainProduct = sequelize.define('MainProduct', {
        name: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        manufacturer: DataTypes.STRING,
        picture: DataTypes.STRING,
        datasheet: DataTypes.STRING,
        description: DataTypes.STRING,
        description_et: DataTypes.STRING,
        description_fi: DataTypes.STRING
    }, {
        tableName: 'main_products'
    });

    MainProduct.associate = models => {
        models.MainProduct.belongsTo(models.Category, { foreignKey: 'subcategory_id', as: 'subcategory' });
        models.MainProduct.hasMany(models.Product, { foreignKey: 'main_product_name', as: 'products' });
    };

    return MainProduct;
};