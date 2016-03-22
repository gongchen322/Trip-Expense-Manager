module.exports = function (sequelize, DataTypes) {
	return sequelize.define('tripInfo', {
		location: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		startDate: {
			type: DataTypes.STRING,
			allowNull: false,
	
		},
		endDate: {
			type: DataTypes.STRING,
			allowNull: false,
	
		},
		totalMoney: {
			type: DataTypes.STRING,
			allowNull: false,
	
		},
		people: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		group: {
			type: DataTypes.STRING,
			allowNull: false,
		}
	});
};
