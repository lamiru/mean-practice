var mongoose = require('mongoose')
var Schema = mongoose.Schema

var UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    username: {
        type: String,
        trim: true
    },
    password: String,
    website: {
        type: String,
        get: function(url) {
            if (!url) {
                return url
            } else {
                if (url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) {
                    url = 'http://' + url
                }
                return url
            }
        }
    },
    created: {
        type: Date,
        default: Date.now
    }
})

UserSchema.virtual('fullName').get(function() {
    return this.firstName + ' ' + this.lastName
}).set(function(fullName) {
    var splitName = fullName.split(' ')
    this.firstName = splitName[0] || ''
    this.lastName = splitName[1] || ''
})

UserSchema.set('toJSON', { getters: true, virtuals: true })

mongoose.model('User', UserSchema)
