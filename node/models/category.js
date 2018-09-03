module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        name: DataTypes.STRING,
        name_et: DataTypes.STRING,
        name_fi: DataTypes.STRING,
        order: DataTypes.INTEGER,
        parent_category_id: DataTypes.INTEGER
    }, {
        tableName: 'categories'
    });

    Category.associate = models => {
        models.Category.belongsTo(models.Category, { foreignKey: 'parent_category_id', as: 'category' });
    };

    return Category;
};