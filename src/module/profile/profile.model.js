const path =require("path");
const sequelize = require(path.join(process.cwd(),'/src/config/sequilize'))
const {DataTypes} = require('sequelize')

const Profile = sequelize.define('profiles',{
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
    description: {
        type:DataTypes.STRING,
        allowNull:true
    },
    type: {
        type:DataTypes.ENUM("custom","standard"),
        defaultValue:"custom"
    },
    created_by: {
        type:DataTypes.UUID
    },
    updated_by: {
        type:DataTypes.UUID
    }
   
   
},
  {
    tableName: 'profiles',
    timestamps: false,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
)

module.exports = Profile