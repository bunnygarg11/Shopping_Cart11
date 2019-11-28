const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Product =require('../../models/products')
const Item = require('../../models/Item');

router.patch('/', async(req, res) => {
 const {product_Id}=req.body
  // Item.find()
  //   .sort({ date: -1 })
  //   .then(items => res.json(items));
 const product= await Product.findById(product_Id)
await product.populate("items").execPopulate()
res.json(product.items)
  
});
router.get('/products', (req, res) => {
  Product.find()
    .sort({ date: -1 })
    .then(items => res.json(items));
});


router.post('/', auth, async(req, res) => {
  // const newItem = new Item({
  //   name: req.body.name
  // });

  // newItem.save().then(item => res.json(item));

  const {Product_name, itemlist}=req.body;
  const prod1=await Product.findOne({product_name:Product_name})
  console.log(prod1)
  if(prod1){

  //   itemlist.map((item)=>{
  //     Item.insertMany({
  //      product_id:prod1._id,
  //      name:Object.keys(item)[0],
  //      quantity:Object.values(item)[0]
  //     })
  //  })
   return res.status(400).json({msg:"Product Name already exist"})
  }else{
    const product=new Product({
      product_name:Product_name
    })
    await product.save()
    itemlist.map((item)=>{
      Item.insertMany({
       product_id:product._id,
       name:Object.keys(item)[0],
       quantity:Object.values(item)[0]
      })
   })
   return res.json({product})
  }
  


  // const response=await Item.find({product_name:Product_name})
// console.log(response)
  // res.json({product})
  // res.json({name:Product_name});
});


router.delete('/:id', auth, async(req, res) => {
 try
 { const product=await Product.findByIdAndDelete(req.params.id)
    // .then(item => item.remove().then(() => res.json({ success: true })))
    if(!product){
      const item=await Item.findByIdAndDelete(req.params.id)
    //  await item.remove()
     return res.json({ success: true })
    }
    // await product.remove()
    res.json({ success: true })

   }catch(err){
    res.status(404).json({ success: false })
   }
  })
  router.post("/update",async (req,res)=>{
      console.log("gv n")
     try{
      req.body.item.map(async itemm=>{
        await Item.findByIdAndUpdate(itemm._id,{quantity:itemm.quantity})
      })
      res.json({success:true})
     }catch(err){
       res.status(404).json({msg:"failed"})
     }
    })
module.exports = router