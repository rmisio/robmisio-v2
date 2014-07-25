
/*!
 * Module dependencies
 */

var util = require('../../util'),
    moment = require('moment'), 
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    blogSchema;

/**
 * Blog schema
 */

blogSchema = new Schema({
    // title needs to be unique because of current implementation
    // of populate-blog-entries script
    title: {
        type: String,
        trim: true,
        required: true,
        unique: true    
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    slug: {
        type: String
    }
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Pre-save hooks
 */

blogSchema.pre('save', function (next) {
    this.slug = util.slugify(this.title);
    next(); 
});

/**
 * Virtuals
 */

blogSchema.virtual('url').get(function () {
    var date = moment(this.createdAt),
        formatted = date.format('YYYY[/]MM[/]');

    // formatted results in the format '2012/10/'
    return formatted + this.slug;
});

/**
 * Register
 */

mongoose.model('Blog', blogSchema);