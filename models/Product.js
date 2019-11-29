const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema Product
const ProductSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    min: 0,
    default: 0.0
  },
  image: {
    type: String,
    required: false
  },
  description: {
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
}, { collection: 'products', versionKey: false });

ProductSchema
.virtual('url')
.get(function () {
    return '/product/' + this._id;
});

module.exports = Product = mongoose.model("products", ProductSchema);
