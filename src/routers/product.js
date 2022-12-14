
const express=require('express')
const Product=require('../models/product')
const router=new express.Router()

router.get('/products',async (req,res)=>{

    try{
        const products=await Product.find({}) 
        res.status(200).send(products)
    }
    catch(e){
        res.status(400).send(e)

    }
})


router.get('/products/:id',async (req,res)=>{
 
    const _id=req.params.id
    try{
       
        const product=await Product.findById(_id)

        if(!product){
            return res.status(404).send()
        }

        res.status(200).send(product)

    }
    catch(e){
        res.status(500).send(e)

    }


})

router.post('/products',async (req,res)=>{
    
    const prod=new Product(req.body)

    try{
        await prod.save()
        res.status(201).send(prod)

    }catch(e){
        res.status(400).send(e)
    }

    
})


router.patch('/products/:id',async (req,res)=>{
    const _id=req.params.id

    const updates= Object.keys(req.body)
    const allowedUpdates=['pname','pdescription','sid','pprice','pcategory']

    const isValidOperation=updates.every((update)=>allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error:'Invalid Updates'})
    }

    try{

        const product=await Product.findByIdAndUpdate(_id,req.body,{new:true,runValidators:true})
        if(!product){
            return res.status(404).send()
        }
        res.send(product)

    }
    catch(e){
        res.status(400).send(e)
    }
})

router.delete('/products/:id',async (req,res)=>{
    const _id=req.params.id

    try{
        const product=await Product.findByIdAndDelete(_id)

        if(!product){
            return res.status(404).send()
        }
        res.status(200).send("Record was deleted")
    }
    catch(e){
        res.status(500).send(e)
    }
  

})


module.exports=router