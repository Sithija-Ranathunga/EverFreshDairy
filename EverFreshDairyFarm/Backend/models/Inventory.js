import mongoose from 'mongoose';

const InventorySchema  = new mongoose.Schema({
    itemName:{
        type: String,
        required: true,

    },
    quantity:{
        type: Number,
        required: true,
    },
    lastUpdate:{
        type: Date,
        required: true,
        default: Date.now,
    },
    
});

const Inventory = mongoose.model('Inventory',InventorySchema);
export default Inventory;
