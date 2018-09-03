module.exports = (sequelize, DataTypes) => {
    const New = sequelize.define('New', {
        ndate: DataTypes.DATE,
        introtext: DataTypes.STRING,
        fulltext: DataTypes.TEXT,
        image: DataTypes.STRING,
    }, {
        tableName: 'news',
        timestamps: false
    });

    return New;
};