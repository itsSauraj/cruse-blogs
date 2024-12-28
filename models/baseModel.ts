const baseModal = {
  created_at: {
    type: Date,
    default: Date.now(),
    required: [true, "createdAt is required"],
  },
  updated_at: {
    type: Date,
    default: Date.now(),
  },
  deleted_at: {
    type: Date,
    default: null,
  },
};

export default baseModal;
