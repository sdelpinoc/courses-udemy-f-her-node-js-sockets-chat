import moongoose from 'mongoose';
import mongooseHidden from 'mongoose-hidden';

const { Schema, model } = moongoose;

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'The name is obligatory']
    },
    email: {
        type: String,
        required: [true, 'The email is obligatory'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'The password is obligatory']
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: true,
        // enum: ['ADMIN_ROLE', 'USER_ROLE'] // We get them from the database
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

// By default the plugin hide the _id and __v properties
// With the line below you can remove the default behaviour
// UserSchema.plugin(mongooseHidden({autoHideJSON: false, autoHideObject: false}));

// unhides _id and hide password
UserSchema.plugin(mongooseHidden(), { hidden: { _id: false, password: true } });

// Another option to remove attributes from the schema
// UserSchema.methods.toJSON = function() {
//     const { __v, password, ...user } = this.toObject();

//     return user;
// };

UserSchema.methods.toJSON = function() {
    const { _id: uid, ...user } = this.toObject();

    user.uid = uid;

    return user;
};

// Mongoose by default it will add a 's' to the name of collection
// The initial letter must be capitalized
const User = model('User', UserSchema);

export default User;