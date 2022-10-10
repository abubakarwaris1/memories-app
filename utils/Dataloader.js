const DataLoader = require('dataloader');
const { collections } = require('../utils/ModelMappings');
const loader = {};
const batchFunction = async(keys, collection) => {
    try {
        const result = await collections[collection].find({_id: keys }).lean();
        const lookup = result.reduce((acc, row) => {
            acc[row._id] = row;
            return acc;
        },{});
        return keys.map(key => lookup[key] || null);
    }catch(e){
        return e.message;
    }    
}

const load = (collection, id) => {
    
    if(!loader[collection]){
        loader[collection] = new DataLoader(keys => batchFunction(keys, collection));
    }
    try {
        return loader[collection].load(id)
    } catch(e) {
        return e.message;
    }
}

module.exports = load;