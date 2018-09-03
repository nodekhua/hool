module.exports = (sequelize, DataTypes) => {
	const Discount = sequelize.define('Discount', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true
		},
		min_count: DataTypes.INTEGER,
		max_count: DataTypes.INTEGER,
		discount: DataTypes.DECIMAL,
        pricing_ranges_id: DataTypes.INTEGER
	}, {
		tableName: 'discount'
	});

	Discount.associate = models => {
        models.Discount.belongsTo(models.PricingRanges, { foreignKey: 'pricing_ranges_id', as: 'ranges' });
    };

	return Discount;
};