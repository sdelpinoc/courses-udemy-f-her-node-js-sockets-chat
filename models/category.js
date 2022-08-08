import moongoose from 'mongoose';
import mongooseHidden from 'mongoose-hidden';

const { Schema, model } = moongoose;

const CategorySchema = Schema({
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
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

CategorySchema.plugin(mongooseHidden(), { hidden: { _v: true, status: true, _id: false } });

// Mongoose by default it will add a 's' to the name of collection
// The initial letter must be capitalized
const Category = model('Category', CategorySchema);

export default Category;