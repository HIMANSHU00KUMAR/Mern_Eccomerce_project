import Item from '../models/item.js';

export const get_items = (req,res) => {
    Item.find().sort({date:-1}).then(items => res.json(items));
}

export const post_item = (req,res) => {
    let image_filename=`${req.file.filename}`;
    const newItem = new Item({
        title:req.body.title,
        description:req.body.description,
        category:req.body.category,
        price:req.body.price,
        image:image_filename
    });
    newItem.save().then(item => res.json(item));
}

export const update_item = (req,res) => {
    Item.findByIdAndUpdate({_id: req.params.id},req.body).then(function(item){
        Item.findOne({_id: req.params.id}).then(function(item){
            res.json(item);
        });
    });
}

export const delete_item = (req,res) => {
    Item.findByIdAndDelete({_id: req.params.id}).then(function(item){
        res.json({success: true});
    });
}