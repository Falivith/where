const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('avalia', {
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
    comentario: {
      type: DataTypes.STRING(256),
      allowNull: true
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'avalia',
    timestamps: false,
    indexes: [
      {
        name: "Avalia_FK",
        using: "BTREE",
        fields: [
          { name: "email_fk" },
        ]
      },
      {
        name: "Avalia_FK_1",
        using: "BTREE",
        fields: [
          { name: "codEvento_fk" },
        ]
      },
    ]
  });
};
