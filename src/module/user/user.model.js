const path =require("path");
const sequelize = require(path.join(process.cwd(),'/src/config/sequilize'))
const {DataTypes} = require('sequelize')

const User = sequelize.define('users',{
    id: {
      allowNull: false,
      primaryKey: true,
      type:DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4
    },
    email: {
        type:DataTypes.STRING
    },
    pass: {
        type:DataTypes.STRING
    },
    profile_id: {
        type:DataTypes.UUID,
        allowNull:true
    },
    created_by: {
        type:DataTypes.UUID
    },
    updated_by: {
        type:DataTypes.UUID
    }
   
},
  {
    tableName: 'users',
    timestamps: false,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
)

module.exports = User