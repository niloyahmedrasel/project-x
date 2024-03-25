const path =require("path");
const sequelize = require(path.join(process.cwd(),'/src/config/sequilize'))
const {DataTypes} = require('sequelize')

const Profilepermission = sequelize.define('profile-permissions',{
    id: {
        allowNull: false,
        primaryKey: true,
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4
    },
    permission_id: {
        type:DataTypes.UUID,
        allowNull: false,
    },
    profile_id: {
        type:DataTypes.UUID,
        allowNull:true
    },
    type: {
      type:DataTypes.ENUM("custom","standard"),
      defaultValue:"custom"
    },
   
   
},
  {
    tableName: 'profile-permissions',
    timestamps: false,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
)

module.exports = Profilepermission