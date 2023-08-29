const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('participam', {
    email_fk: {
      type: DataTypes.STRING(60),
      allowNull: false,
      references: {
        model: 'usuarios',
        key: 'email'
      }
    },
    codEvento_fk: {
      type: DataTypes.STRING(32),
      allowNull: false,
      references: {
        model: 'eventos',
        key: 'codEvento'
      }
    },
    confirmado: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'participam',
    timestamps: false,
    indexes: [
      {
        name: "Participam_FK",
        using: "BTREE",
        fields: [
          { name: "email_fk" },
        ]
      },
      {
        name: "Participam_FK_1",
        using: "BTREE",
        fields: [
          { name: "codEvento_fk" },
        ]
      },
    ]
  });
};
