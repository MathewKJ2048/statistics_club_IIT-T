const mongoose = require('mongoose');
const { Schema } = mongoose;

const EventSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    emergency_message:
    {
        type: String,
        required: false
    },
    venue: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        required: true
    },
    pointsOfContact: [
        {
            name: {
                type: String,
                required: true
            },
            phoneNumber: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            }
        }
    ],
    posterLink: {
        type: String
    }
});

const Event = mongoose.model('Event', EventSchema);
module.exports = Event;
