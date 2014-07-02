
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
    title: {
        type: String,
        trim: true,
        required: true    
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
    console.log('the slug is: ' + this.slug);
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