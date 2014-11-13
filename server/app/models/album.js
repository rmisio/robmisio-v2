
/*!
 * Module dependencies
 */

var util = require('../../util'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    albumSchema;

/**
 * Album schema
 */

albumSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    photos: [{ type: Schema.Types.ObjectId, ref: 'Photo' }],
    slug: {
        type: String,
        required: true
    }
});

albumSchema.index({ 'photos': 1 })

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Pre-save hooks
 */

albumSchema.pre('save', function (next) {
    this.slug = util.slugify(this.title);
    next();
});


/**
 * Virtuals
 */

/**
 * Register
 */

mongoose.model('Album', albumSchema);
