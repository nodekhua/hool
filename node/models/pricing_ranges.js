module.exports = (sequelize, DataTypes) => {
	const PricingRanges = sequelize.define('PricingRanges', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true
		},
		min_price: DataTypes.DECIMAL,
		max_price: DataTypes.DECIMAL,
		fee: DataTypes.DECIMAL,
		login: DataTypes.BOOLEAN
	}, {
		tableName: 'pricing_ranges'
	});

	PricingRanges.associate = models => {
        models.PricingRanges.hasMany(models.Discount, { foreignKey: 'pricing_ranges_id' });
    };

	return PricingRanges;
};