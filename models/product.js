import moongoose from 'mongoose';
import mongooseHidden from 'mongoose-hidden';

const { Schema, model } = moongoose;

const ProductSchema = Schema({
    name: {
        type: 'String',
        required: [true, 'The name is obligatory'],
        unique: true
    },
    status: {
        type: Boolean,
        default: true,
        required: true
    },
    price: {
        type: Number,
        default: 0
    },
    description: { type: String },
    available: { type: Boolean, default: true },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        require: true 
    },
    img: {
        type: String
    }
});

ProductSchema.plugin(mongooseHidden(), { hidden: { _v: true, status: true } });

// Mongoose by default it will add a 's' to the name of collection
// The initial letter must be capitalized
const Product = model('Product', ProductSchema);

export default Product;