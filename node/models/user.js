module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        company_name: DataTypes.STRING,
        vat_number: DataTypes.STRING,
        fee: DataTypes.DECIMAL,
        token: DataTypes.STRING,
        token_expires: DataTypes.STRING,
        reset_password_token: DataTypes.STRING
    }, {
        tableName: 'users'
    });

    return User;
};