let express = require("express");
var router = express.Router();
const { updateRole, createRole, getAllRoles, deleteRole } = require("../controller/role.controller");

//  CREATE ROLE
//In future only make admins to create role add the middleware verifyAdmin from getAllUsers
router.post('/create', createRole);

//  UPDATE DB
router.put('/update/:id', updateRole);

//  GET ALL ROLES
router.get('/get', getAllRoles);

//  DELETE ROLE
router.delete('/delete/:id', deleteRole);





module.exports = router;