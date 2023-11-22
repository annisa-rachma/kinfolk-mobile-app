const { Category, Image, Product, sequelize } = require("../models");

class AdminController {
    
    static async getAllProducts(req, res, next) {
        try{
            const products = await Product.findAll({
                include: [
                    {   model: Category,
                        attributes : {
                            exclude : ['createdAt', 'updatedAt']
                        }
                    },
                ],
                attributes : {
                    exclude : ['createdAt', 'updatedAt']
                },
                order : [['id']]
            })
            res.status(200).json(products)
        }
        catch(err) {
            console.log(err)
            next(err)
        }
    }

    static async getProductById(req, res, next) {
        try {
            const product = await Product.findOne({
                where : {id : req.params.productId},
                include: [
                    {   model: Category,
                        attributes : {
                            exclude : ['createdAt', 'updatedAt']
                        }
                    },
                    {   model: Image,
                        where : {productId : req.params.productId },
                        attributes : {
                            exclude : ['createdAt', 'updatedAt']
                        }
                    },
                ],
                attributes : {
                    exclude : ['createdAt', 'updatedAt']
                },
            })
            if(!product) throw {name : "NotFound"} 
            res.status(200).json(product)
        } catch (err) {
            console.log(err)
          next(err);
        }
    }

    static async postProduct(req, res, next) {
        const t = await sequelize.transaction();
        try{
            console.log(req.body, "<<<<")
            const {name, description, price, mainImg, categoryId, Images, authorId} = req.body

            
            const product = await Product.create({
                name, description, price, mainImg, slug : name.split(' ').join('-'), categoryId, authorId, 
            }, { transaction: t })
            
            if(!Images || Images.length === 0 || Images[0].imgUrl === "" ) throw {name : "AdditionImageRequired"} 
            
            let images = Images.map(element => {
                return {
                    productId : product.id,
                    imgUrl : element.imgUrl
                }
            });

            await Image.bulkCreate(images, { transaction: t })

            t.commit();
            res.status(201).json({message: `Successfully added new product`})
        }
        catch(err) {
            console.log(err)
            t.rollback();
            next(err)
        }
    }

    static async putProduct(req, res, next) {
        try{
            const {name, description, price, mainImg, categoryId} = req.body
            if(!name || !description || !price || !mainImg || !categoryId) {
                return res.status(400).json({message : "Input is required"})
            }
            
            await Product.update({
                name, description, price, mainImg, categoryId
            }, {
                where : {id : req.params.productId}
            })

            res.status(200).json({message: `Succesfully edited product`})
        }
        catch(err) {
            console.log(err)
            next(err)
        }
    }

    static async deleteProduct(req, res, next) {
        try {
            await Product.destroy({where : {id : req.params.productId}})
            res.status(200).json({message : `Succesfully deleted selected product`})  
        } catch (err) {
            next(err)
        }
    }

}

module.exports = AdminController