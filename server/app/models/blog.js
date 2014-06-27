
/*!
 * Module dependencies
 */

var mongoose = require('mongoose'),
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
    }
});


/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Virtuals
 */

// *** will do client side ***
// blogSchema.virtual('createdAtVerbose')
//     .get(function () {
//         var str = '',
//             now = new Date(),
//             daysElapsed,
//             secElapsed = (new Date() - this.createdAt) / 1000;

//         daysElapsed = Math.round(Math.abs(
//             (now.getTime() - this.createdAt) / (24*60*60*1000)
//         ));

//         if (daysElapsed > 1) {
//             str = 
//         }
//         if (secElapsed > 60) {
//             str = secElapsed + 'minute' +
//                 (secElapsed > 60 : 's' : '') + 'ago';
//         } 

//         return str;
//     });

/**
 * Register
 */

mongoose.model('Blog', blogSchema);