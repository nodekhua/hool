const { Category, MainProduct, Product, sequelize } = require('../models');
const Seq = require('sequelize');
const { Op } = Seq;

async function categories(ctx) {
    const categories = await getCategoriesByParentId(0)
    ctx.body = categories
}

async function subCategories(ctx) {
    const { id } = ctx.params
    const subCategories =  await getCategoriesByParentId(id)
    ctx.body = subCategories;
}

async function mainProducts(ctx) {

    const products = await MainProduct.findAll({
        include: [{
            model: Category,
            as: 'subcategory',
            where: {
                id: ctx.params.id
            },
            attributes: []
        }]
    });

    ctx.body = products;
}

async function bestProducts(ctx) {
    const product = await Product.findAll({
        include: [{
            model: MainProduct,
        }],
        where: {
            original_number:{
                [Op.in]: ['1450g2D-2USB-1', 'QD2430-BKK1B', 'C31CD52002', 'PC42DLE033010']
            }
        },
        group: 'original_number',
        order: ['price']
    });

    ctx.body = product;
}

async function mainProduct(ctx) {

    const product = await MainProduct.findById(ctx.params.id, {
        include: [{
            model: Product,
            as: 'products'
        }, {
            model: Category,
            as: 'subcategory'
        }]
    });

    ctx.body = product;
}

async function productsSearch(ctx) { 
    let searchOnName = await MainProduct.findAll({
        include: [{
            model: Product,
            as: 'products',
            where: {
                [Op.or]: {
                    name: {
                        [Op.like]: `%${ctx.query.search}%`
                    },
                    main_product_name: {
                        [Op.like]: `%${ctx.query.search}%`
                    },
                    original_number: {
                        [Op.like]: `%${ctx.query.search}%`
                    },
                    number: {
                        [Op.like]: `%${ctx.query.search}%`
                    }
                }
            }
        }]
    });

    let searchOnDescription = await MainProduct.findAll({
        include: [{
            model: Product,
            as: 'products',
            where: {
                description: {
                    [Op.like]: `%${ctx.query.search}%`
                }
            }
        }]
    });
    
    ctx.body = searchOnName.concat(searchOnDescription.slice(0, 10));
}

async function changeOrder (ctx) {
    const { id, oldOrder, newOrder, parent_category } = ctx.request.body
    
    await offsetOrder(parent_category, oldOrder, newOrder)

    const result = await Category.update({
        order: newOrder
    }, 
    {
        where: {
            id: id
        }
    })

    ctx.body = result
}

async function offsetOrder (category, oldOrder , newOrder) {
    if(typeof newOrder === "undefined") {
        console.log(newOrder)
        const categories = await getCategoriesByParentId(category)
        newOrder = categories[categories.length-1].order
    }
    let offsetOrders = "UPDATE categories SET `order` = `order` "
    offsetOrders += oldOrder < newOrder ? "- 1" : "+ 1"
    offsetOrders += " WHERE parent_category_id = " + category + " AND `order` BETWEEN "
    offsetOrders += oldOrder < newOrder ? oldOrder + " AND " + newOrder : newOrder + " AND " + oldOrder
    await sequelize.query(offsetOrders)
}

async function createCategory (ctx) {
    const { name, nameEt, nameFi, parentCategoryId } = ctx.request.body
    const order = await generateLastOrder(parentCategoryId)
    const newCategory = Category.build({
        name: name,
        name_et: nameEt,
        name_fi: nameFi,
        order: order,
        parent_category_id: parentCategoryId
    })

    const addCategoryResult = await newCategory.save()

    ctx.body = addCategoryResult
}

async function deleteCategory (ctx) {
    const { id } = ctx.params
    const category = await getCategoryById (id)
    await deleteCategoryById(id)
    await offsetOrder(category.parent_category_id, category.order)
    await Category.update({
        parent_category_id: null
    }, 
    {
        where: {
            parent_category_id: id,
            created_at: {
                [Op.gt]: new Date('2018-03-28')
            }
        }
    })
    ctx.body = 'OK'
}

async function getCategoryList (ctx) {
    const categories = await Category.findAll()
    ctx.body = categories
}

async function moveCategory (ctx) {
    const { id, new_parent, type } = ctx.request.body
    if (!type) {
        return
    }
    if (type === 'append') {
        const order = await generateLastOrder(new_parent)
        const result = await Category.update({
            parent_category_id: new_parent,
            order: order
        }, 
        {
            where: {
                id: id,
                created_at: {
                    [Op.gt]: new Date('2018-03-28')
                }
            }
        })
    }
    if (type === 'move') {
        const order = await generateLastOrder(new_parent)
        const result = await Category.update({
            parent_category_id: new_parent,
        }, 
        {
            where: {
                parent_category_id: id,
                created_at: {
                    [Op.gt]: new Date('2018-03-28')
                }
            }
        })

        await deleteCategoryById(id)
        setCategoryOrder(new_parent)
    }

    ctx.body = 'OK'
}

async function deleteCategoryById (id) {
    const deleteCategoryResult = await Category.destroy({
        where: {
            id: id,
            created_at: {
                [Op.gt]: new Date('2018-03-28')
            }
        }
    });

    return deleteCategoryResult
}

async function getCategoryById (id) {
    const category = await Category.findById(id) 
    return category
}

async function getCategoriesByParentId (id) {
    const categories = await Category.findAll({
        where: {
            parent_category_id: id,
            name: {
                [Op.not]: null
            }
        },
        order: ['order', 'id']
    });

    return categories
}

async function setCategoryOrder (id) {
    let query = "UPDATE categories JOIN (SELECT @rank := -1) r SET `order`=@rank:=@rank+1 where `parent_category_id` = " + id
    await sequelize.query(query)
}

async function generateLastOrder (parentCategoryId) {
    const query = "SELECT MAX( `order` ) AS max FROM categories WHERE parent_category_id = " + parentCategoryId
    const result = await sequelize.query(query)
    return result[0][0].max + 1
}

exports.register = ({router}) => {
    router.get('/categories', categories)
    router.get('/categories/:id', subCategories)
    router.get('/categories/:id/products', mainProducts)
    router.get('/products', productsSearch)
    router.get('/products/:id', mainProduct)
    router.get('/top_products', bestProducts)
    router.put('/change_order', changeOrder)
    router.post('/create_category', createCategory)
    router.delete('/delete_category/:id', deleteCategory)
    router.get('/category_list', getCategoryList)
    router.put('/move_category', moveCategory)
}
