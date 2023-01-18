const sequelize  = require('../database')
const {DataTypes} = require('sequelize')

//main entities
const User = sequelize.define('user', {
    id:                  {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    number:              {type: DataTypes.STRING, allowNull: false },  //need to set , unique: true
    password:            {type: DataTypes.STRING, allowNull: false},
    role:                {type: DataTypes.STRING, defaultValue: 'USER'}  //need to set , unique: true defaultValue: 'USER'
})

const Item = sequelize.define('item', {
    id:                  {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    categoryId:          {type: DataTypes.INTEGER,    allowNull: false },
    subcategoryId:       {type: DataTypes.INTEGER,    allowNull: false },
    brandId:             {type: DataTypes.INTEGER,    allowNull: false },
    availability:        {type: DataTypes.STRING,    allowNull: false },
    name:                {type: DataTypes.STRING,    allowNull: false },
    vendor:              {type: DataTypes.STRING,    allowNull: false },
    description:         {type: DataTypes.STRING,    allowNull: false },
    price:               {type: DataTypes.INTEGER,   allowNull: false },
    oldPrice:            {type: DataTypes.INTEGER,   allowNull: false },
    mark:                {type: DataTypes.INTEGER,    allowNull: false },
    marksCount:          {type: DataTypes.INTEGER,   allowNull: false },
    image:               {type: DataTypes.STRING,    allowNull: false },
})
//helpers
const ItemImages = sequelize.define('item_images', {
    id:                  {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    img:                 {type: DataTypes.STRING,    allowNull: false}
})
const ItemReviews = sequelize.define('item_reviews', {
    id:                  {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    mark:                {type: DataTypes.INTEGER,    allowNull: false},
    comment:             {type: DataTypes.STRING,    allowNull: false},
})
const ItemColors = sequelize.define('item_colors', {
    id:                  {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    color:                {type: DataTypes.STRING,    allowNull: false},
})
const ItemSizes = sequelize.define('item_sizes', {
    id:                  {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    size:                {type: DataTypes.STRING,    allowNull: false},
})
//sorting entities
const Category = sequelize.define('item_category', {
    id:                  {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:                {type: DataTypes.STRING,    allowNull: false }
})

const Subcategory = sequelize.define('item_subcategory', {
    id:                  {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:                {type: DataTypes.STRING,    allowNull: false }
})

const Brand = sequelize.define('item_brand', {
    id:                  {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:                {type: DataTypes.STRING,    allowNull: false },
})

const Availability = sequelize.define('item_availability', {
    id:                  {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:                {type: DataTypes.STRING,    allowNull: false },
})
//Merged sorting entities (for next relations):
const CategorySubcategory = sequelize.define('category_subcategory', {
    id:                   {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})
const CategoryBrand = sequelize.define('category_brand', {
    id:                   {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})
const CategoryAvailability = sequelize.define('category_availability', {
    id:                   {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})
const SubcategoryBrand = sequelize.define('subcategory_brand', {
    id:                   {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})
const SubcategoryAvailability = sequelize.define('subcategory_availability', {
    id:                   {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})
const BrandAvailability = sequelize.define('brand_availability', {
    id:                   {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

//define relations between HELPERS and MAIN entities
Item.hasMany(ItemImages,{as: 'images'})
ItemImages.belongsTo(Item)

Item.hasMany(ItemReviews,{as: 'reviews'})
ItemReviews.belongsTo(Item)

Item.hasMany(ItemColors,{as: 'colors'})
ItemColors.belongsTo(Item)

Item.hasMany(ItemSizes,{as: 'sizes'})
ItemSizes.belongsTo(Item)

//define relations between SORTING and MAIN entities:
Category.hasMany(Item)
Item.belongsTo(Category)

Subcategory.hasMany(Item)
Item.belongsTo(Subcategory)

Brand.hasMany(Item)
Item.belongsTo(Brand)

Availability.hasMany(Item)
Item.belongsTo(Availability)
//define relations between SORTING entities:
Category.belongsToMany(Subcategory, {through: CategorySubcategory})
Subcategory.belongsTo(Category)

Category.belongsToMany(Brand, {through: CategoryBrand})
Brand.belongsToMany(Category, {through: CategoryBrand})

Category.belongsToMany(Availability, {through: CategoryAvailability})
Availability.belongsToMany(Category, {through: CategoryAvailability})

Subcategory.belongsToMany(Availability, {through: SubcategoryAvailability})
Availability.belongsToMany(Subcategory, {through: SubcategoryAvailability})

Subcategory.belongsToMany(Brand, {through: SubcategoryBrand})
Brand.belongsToMany(Subcategory, {through: SubcategoryBrand})

Availability.belongsToMany(Brand, {through: BrandAvailability})
Brand.belongsToMany(Availability, {through: BrandAvailability})

//export
module.exports = {
    User, Item, Category, Subcategory, Brand, Availability, ItemImages,
    CategorySubcategory, CategoryBrand,
    CategoryAvailability, SubcategoryBrand,
    SubcategoryAvailability, BrandAvailability, ItemReviews, ItemSizes
}