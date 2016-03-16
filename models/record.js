module.exports = function (sequelize, DataTypes) {
	return sequelize.define('record', {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false,
	
		},
		money: {
			type: DataTypes.STRING,
			allowNull: false,
	
		}
	});
};
