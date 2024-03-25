const init = () => {
    const path =require("path");
    const async = require("async");
    const sequelize =require(path.join(process.cwd(),'/src/config/sequilize'))

    const Admin = require(path.join(process.cwd(),'/src/module/admin/admin.model'))
    const User = require(path.join(process.cwd(),'/src/module/user/user.model'))
    const Service = require(path.join(process.cwd(),'/src/module/service/service.model'))
    const Permission = require(path.join(process.cwd(),'/src/module/permission/permission.model'))
    const Profile = require(path.join(process.cwd(),'/src/module/profile/profile.model'))
    const ProfilePermission= require(path.join(process.cwd(),'/src/module/permission/profile-permission.model'))
    const PermissionService = require(path.join(process.cwd(),'/src/module/permission/permission-service.model'))
    


    sequelize.query('CREATE DATABASE IF NOT EXISTS xyz')
    .then(()=>{
       console.log('successfully');
    })
    .catch((error)=>{
        console.log(error)
    })

    sequelize.sync()
    .then(()=>{
        console.log('successfully');
    })
    .catch((error)=>{
        console.log(error)
    });

    const adminSeeder = (callback) => {
        Admin.findOrCreate({
            where: {
                email:'rasel@gmail.com',
            },
            defaults: {
                pass:'1234'
            }
        })
        .then(() => {
            callback()
        })
    }

    const profileSeeder = (callback) => {
        Admin.findOne({
            where:{
                email:'rasel@gmail.com',
            }
        })
        .then((admin) => {
            const profiles = [
                {title:'System Admin', description:'This is the default profile for System Admin',type:'standard',created_by:admin.id,updated_by:admin.id},
                {title:'Customer', description:'This is the default profile for System Admin',type:'standard',created_by:admin.id,updated_by:admin.id}
            ];
            Profile.destroy({truncate: {cascade:true}})
            .then(()=>{
                Profile.bulkCreate(profiles,
                    {
                        returning: true,
                        ignoreDuplicates:false,
                    })
                    .then(()=>{
                        callback()
                    })
            })
        })
    }

    const adminUpdateSeeder = (callback) => {
         Admin.findOne({
            where: {
                email:'rasel@gmail.com'
            }
         })
         .then((admin) => {
            Profile.findOne({
                where: {
                    title:'System Admin'
                }
            })
            .then(profile => {
                admin.update({profile_id: profile.id})
                callback()
            })
         })
    }

    const serviceSeeder = (callback) => {
        Admin.findOne({
            where: {
                email:'rasel@gmail.com',
            }
        })
        .then(admin => {
            const services = [
                {title:'Manage Users',created_by:admin.id,updated_by:admin.id},
                {title:'Manage Permissions',created_by:admin.id,updated_by:admin.id},
                {title:'Manage Profiles',created_by:admin.id,updated_by:admin.id}
            ];
            Service.destroy({truncate: {cascade: true}})
            .then(()=>{
                Service.bulkCreate(services,
                    {
                        returning:true,
                        ignoreDuplicates:false,
                    })
                    .then(()=>{
                        callback()
                    });
            })
        })
    }

    const permissionSeeder = (callback) => {
        Admin.findOne({
            where: {
                email:'rasel@gmail.com',
            }
        })
        .then(admin => {
            const permissions = [
                { title: "System Admin", description: "This is the default permission for System Admin", type:"standard",created_by:admin.id ,updated_by:admin.id }
            ];

            Permission.destroy({truncate: {cascade: true}})
            .then(()=>{
                Permission.bulkCreate(permissions,
                    {
                        returning:true,
                        ignoreDuplicates:false,
                    })
                    .then(()=>{
                        callback()
                    });
            })
        })
    }

    const permissionServiceSeeder = (callback) => {
        Admin.findOne({
            where: {
                email:'rasel@gmail.com'
            }
        }
        )
        .then(()=>{
            Promise.all([
                Service.findOne({ where: {title:'Manage Users'}}),
                Service.findOne({ where: {title:'Manage Permissions'}}),
                Service.findOne({ where: {title:'Manage Profiles'}}),

                Permission.findOne({ where: {title:'System Admin'}})
            ])
            .then(values => {
                const [ manageUserService ,manageProfileService,managePermissionService,systemAdminPermission ] = values 

                const permissionServices = [
                    {permission_id:systemAdminPermission.id, service_id:manageUserService.id},
                    {permission_id:systemAdminPermission.id, service_id:manageProfileService.id},
                    {permission_id:systemAdminPermission.id, service_id:managePermissionService.id},
                ]
                PermissionService.destroy({truncate: {cascade: true}})
                .then(()=>{
                    PermissionService.bulkCreate(permissionServices,{
                        returning:true,
                        ignoreDuplicates:false
                    })
                    .then(()=>{
                        callback()
                    })
                })
            })
        })
    }

    const profilePermissionSeeder = (callback) => {
        Admin.findOne({
            where: {
                email:"rasel@gmail.com"
            },
            
         })
         .then((admin)=>{
             Promise.all([
                 Profile.findOne({ where : {title:"System Admin"}}),
                 Permission.findOne({ where : {title:"System Admin"}}),
             ])
            
           .then((values) =>{
            const [ systemAdminProfile , systemAdminPermission ] =values
     
            const profile_permissions = [
             {permission_id : systemAdminPermission.id, profile_id : systemAdminProfile.id},
            ]
     
            ProfilePermission.destroy({ truncate: {cascade:true}})
            .then(() => {
                ProfilePermission.bulkCreate(profile_permissions,{
                    returning: true,
                    ignoreDuplicates:false
                })
                .then(() => {
                    callback()
                })
            })
           })      
         })
         }

    async.waterfall([
        adminSeeder,
        profileSeeder,
        adminUpdateSeeder,
        serviceSeeder,
        permissionSeeder,
        permissionServiceSeeder,
        profilePermissionSeeder
    ], (err) => {
        if(err) console.error(err);
        else console.log("DB seed completed successfully")
        process.exit()
    })

    
}

init()
