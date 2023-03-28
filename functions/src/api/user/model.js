module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("users");
  Users.init({
      id: {
          type: DataTypes.UUIDV4(36),
          defaultValue: DataTypes.UUIDV4(),
          autoIncrement: true,
          primaryKey: true,
          field: 'id'
      },
      name: {
          type: DataTypes.STRING,
          field: 'name'
      },
      birthDay: {
          type: DataTypes.STRING,
          field: 'birth_day'
      },
      phoneNumber: {
          type: DataTypes.STRING,
          field: 'phone_number'
      },
      email:{
          type: DataTypes.STRING,
          field: 'email'
      },
      createdAt: {
          type: DataTypes.TIME,
          field: 'created_at'
      },
      createdBy: {
          type: DataTypes.STRING,
          field: 'created_by'
      },
      updatedAt: {
          type: DataTypes.TIME,
          field: 'updated_at'
      },
      updatedBy: {
          type: DataTypes.STRING,
          field: 'updated_by'
      },
  }, {sequelize, freezeTableName: true});

  return Users;
};
