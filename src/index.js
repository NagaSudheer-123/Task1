require('../src/db/mongoose')

const Product=require('../src/models/product')


const express=require('express')
const app=express()


const port=3000


const productRoute=require('../src/routers/product')
app.use(express.json())


app.use(productRoute)


app.listen(port,(req,res)=>{
    console.log('Running...')
})




