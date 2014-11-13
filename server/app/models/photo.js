
/*!
 * Module dependencies
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    photoSchema;

/**
 * Photo schema
 */

photoSchema = new Schema({
    title: {
        type: String,
        trim: true
    },
    caption: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    albums: [{ type: Schema.Types.ObjectId, ref: 'Album' }],
    cloudinary: {
        id: {
            type: String,
            required: true
        },
        data: {}
    }
});

photoSchema.index({ 'albums': 1 })

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Pre-save hooks
 */


/**
 * Virtuals
 */

/**
 * Register
 */

mongoose.model('Photo', photoSchema);
