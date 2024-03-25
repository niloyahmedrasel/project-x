const path =require("path");
const sequelize = require(path.join(process.cwd(),'/src/config/sequilize'))
const {DataTypes} = require('sequelize')

const Service = sequelize.define('services',{
    id: {
        allowNull: false,
        primaryKey: true,
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4
    },
    title: {
        type:DataTypes.STRING,
        allowNull: false,
    },
    parent_id: {
        allowNull:true,
        type:DataTypes.UUID
    },
    created_by: {
        type:DataTypes.UUID
    },
    updated_by: {
        type:DataTypes.UUID
    }
   
   
},
  {
    tableName: 'services',
    timestamps: false,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
)

module.exports = Service