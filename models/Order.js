const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema Order
const OrderSchema = new Schema({
  idUser: {
    type: String,
    required: true
  },
  cart: {
    type: Array,
    required: false
  },
  shipDate: {
    type: Date,
    default: Date.now()
  },
  shipTo: {
    type: String,
    required: false
  },
  status: {
    type: String,
    require: false
  },
  
  isDelete: {
    type: Boolean,
    default: false
  },
  createAt: {
    type: Date,
    default: Date.now()
  },
  updateAt: {
    type: Date,
    default: Date.now()
  }
}, { collection: 'orders', versionKey: false });

OrderSchema.pre('save', function (next) {
  this.updateAt = Date.now(); 
  next();
});

module.exports = Order = mongoose.model("orders", OrderSchema);
