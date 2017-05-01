export default {
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  refresh_token: {
    type: String,
    unique: true,
  },
  reset_token: {
    type: String,
    unique: true,
  },
  reset_token_expire_date: {
    type: Date,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
};
