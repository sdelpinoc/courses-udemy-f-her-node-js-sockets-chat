import moongoose from 'mongoose';

const { Schema, model } = moongoose;

const RoleSchema = Schema({
    role: {
        type: 'String',
        required: [true, 'The Role is obligatory']
    }
});

// Mongoose by default it will add a 's' to the name of collection
// The initial letter must be capitalized
const Role = model('Role', RoleSchema);

export default Role;