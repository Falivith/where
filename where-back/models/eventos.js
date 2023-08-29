const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('eventos', {
    codEvento: {
      type: DataTypes.STRING(32),
      allowNull: false,
      primaryKey: true
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    'endereço': {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    inicio: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    fim: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    horario: {
      type: DataTypes.DATE,
      allowNull: false
    },
    codEvento_fk: {
      type: DataTypes.STRING(32),
      allowNull: true,
      references: {
        model: 'eventos',
        key: 'codEvento'
      }
    },
    email_fk: {
      type: DataTypes.STRING(60),
      allowNull: false,
      references: {
        model: 'usuarios',
        key: 'email'
      }
    },
    latitude_fk: {
      type: DataTypes.STRING(100),
      allowNull: false,
      references: {
        model: 'locais',
        key: 'latitude'
      }
    },
    longitude_fk: {
      type: DataTypes.STRING(100),
      allowNull: false,
      references: {
        model: 'locais',
        key: 'longitude'
      }
    }
  }, {
    sequelize,
    tableName: 'eventos',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "codEvento" },
        ]
      },
      {
        name: "Eventos_FK",
        using: "BTREE",
        fields: [
          { name: "email_fk" },
        ]
      },
      {
        name: "Eventos_FK_2",
        using: "BTREE",
        fields: [
          { name: "latitude_fk" },
          { name: "longitude_fk" },
        ]
      },
      {
        name: "Eventos_FK_1",
        using: "BTREE",
        fields: [
          { name: "codEvento_fk" },
        ]
      },
    ]
  });
};
