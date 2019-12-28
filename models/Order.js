const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema Order
const OrderSchema = new Schema({
  idUser: {
    type: String,
    required: true
  },
  cartItemIds: {
    type: Array,
    required: true
  },
  cartItemQuantities: {
    type: Array,
    required: true
  },
  shipDate: {
    type: Date,
    default: new Date(+new Date() + 864e5 * 30)
  },
  shipTo: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'waiting',
  },

  cardOwner:    { type: String, required: true },
  cardNo:       { type: String, required: true },
  cardType:     { type: String, required: true },
  cardExpDate:  { type: String, required: true },
  cardCvv:      { type: String, required: true },

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

OrderSchema.virtual('shipTime')
.get(function () {
    let day = this.shipDate.getDate();
    if (day < 10) day = "0" + day;
    let mon = this.shipDate.getMonth()+1;
    if (mon < 10) mon = "0" + mon;
    return day + '/' + mon + '/' + this.shipDate.getFullYear();
});

OrderSchema.virtual('statusName')
.get(function () {
  if (this.status === "waiting")
    return "Đang chờ xử lý";
  if (this.statusnewStatus === "delivering")
    return "Đang được giao chuyển";
  if (this.statusnewStatus === "received")
    return "Đã nhận hàng";
  if (this.statusnewStatus === "cancel")
    return "Đã hủy đơn";
  else
    return "Tình trạng không hợp lệ!"
});

OrderSchema.methods
.updateStatus = function (newStatus) {
  if (newStatus === "waiting" || newStatus === "delivering" || newStatus === "received" || newStatus === "cancel")
    this.status = newStatus
}

module.exports = Order = mongoose.model("orders", OrderSchema);
