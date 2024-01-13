const Product=require('../models/productModel')

//to post/insert product

exports.postProduct=async(req,res)=>{
    let product= new Product({
        product_name:req.body.product_name,
        product_price:req.body.product_price,
        countInStock:req.body.countInStock,
        product_description:req.body.product_description,
        product_image:req.file.path,
        category:req.body.category
    })
    product= await product.save()
    if(!product){
        return res.status(400).json({error:'something went wrong'})
    }
    res.send(product)
}

//to show all the product
exports.productList=async(req,res)=>{
    const  product= await Product.find()
    if(!product){
        return res.status(400).json({error:'something went wrong'})
    }
    res.send(product)
}

//to show prioductdetails
exports.productDetails=async(req,res)=>{
    const product = await Product.findById(req.params.id).populate('category','category_name')
    if(!product){
        return res.status(400).json({error:'something went wrong'})
    }
    res.send(product)
}

//to update
exports.updateProduct=async(req,res)=>{
    const product = await Product.findByIdAndUpdate(
        req.params.id,{
        product_name:req.body.product_name,
        product_price:req.body.product_price,
        countInStock:req.body.countInStock,
        product_description:req.body.product_description,
        product_image:req.file.path,
        category:req.body.category
        },
        {new:true}
        )
    if(!product){
        return res.status(400).json({error:'something went wrong'})
    }
    res.send(product)
}

//to delete
exports.deleteProduct=(req,res)=>{
    Product.findByIdAndDelete(req.params.id)
    .then(product=>{
        if(!product){
            return res.status(404).json({error:'product with that id not found'})
        }
        else{
            return res.status(200).json({message:'product deleted'})
        }
    })
    .catch(err=>{
        return res.status(400).json({error:err})
    })
}