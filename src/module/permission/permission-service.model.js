const path =require("path");
const sequelize = require(path.join(process.cwd(),'/src/config/sequilize'))
const {DataTypes} = require('sequelize')

const PermissionService = sequelize.define('permission-services',{
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
    service_id: {
        type:DataTypes.UUID,
        allowNull:true
    },
    type: {
      type:DataTypes.ENUM("custom","standard"),
      defaultValue:"custom"
    },
   
   
},
  {
    tableName: 'permission-services',
    timestamps: false,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
    
  }
)

module.exports = PermissionService