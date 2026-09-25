/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("users", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },
    username: {
      // for reference, usernames are limited to 39 characters on githubs
      type: "varchar(30)",
      notNull: true,
      unique: true,
    },
    // for reference, emails are limited to 254 characters according to the standard
    email: {
      type: "varchar(255)",
      notNull: true,
      unique: true,
    },
    password: {
      // for reference, bcrypt hashed passwords are 60 characters long
      type: "varchar(72)",
      notNull: true,
    },
    created_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("now()"),
    },
    updated_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("now()"),
    },
  });
};

exports.down = (pgm) => {};
