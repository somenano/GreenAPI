const mongoose = require('mongoose');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');

const js_helper = require('../helpers/js.js');

const Schema = mongoose.Schema;

var SnapshotSchema = new Schema({
    dtg: {
        type: Date,
        default: Date.now,
        required: true
    },
    representatives_online: [],
    peers: [],
    blocks: {
        type: Number,
        required: true
    }

},{
    versionKey: false,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

SnapshotSchema.plugin(mongooseLeanVirtuals);

module.exports = mongoose.model('snapshot', SnapshotSchema);