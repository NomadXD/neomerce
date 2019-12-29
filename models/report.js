const connection = require('../config/db');


const dateDataField = (a, b) => ({ date: new Date(a), value: b - 0 });

const getProductCounts = async () => {
    const query = `select product.product_id, 
                        product.title, 
                        sum(orderitem.quantity) as quantity, 
                        sum(payment.payment_amount)  as income 
                    from product 
                        join variant using(product_id) 
                        join orderitem using(variant_id) 
                        join payment using(order_id)
                    group by product.product_id
                    order by quantity desc limit 10`;
    const out = await connection.query(query);
    const products = out.rows.map(
        (value, index) => [index + 1, value.title, value.quantity, value.income, value.product_id],
    );
    const productVsQuantity = out.rows.map(
        (value, index) => ({ label: `#${index + 1}`, value: value.quantity - 0 }),
    );
    return { products, productVsQuantity };
};


const getTopCategoryLeafNodes = async () => {
    const query = `select category_id, 
                        category.parent_id,
                        category.title,
                        sum(orderitem.quantity) as quantity, 
                        sum(payment.payment_amount)  as income 
                    from category
                        join productcategory using(category_id)
                        join variant using(product_id)
                        join orderitem using(variant_id) 
                        join payment using(order_id)
                    where category_id not in (
                        select parent_id from category where parent_id is not null
                        )
                    group by category_id
                    order by quantity desc
                    limit 10;`;
    const out = await connection.query(query);

    const topCategoryData = out.rows.map(
        (value) => [value.title, value.category_id, value.quantity, value.income],
    );
    const topCategoryVsQuantity = out.rows.map(
        (value) => ({ label: value.title, value: value.quantity - 0 }),
    );
    const topCategoryVsIncome = out.rows.map(
        (value) => ({ label: value.title, value: value.income - 0 }),
    );

    return { topCategoryData, topCategoryVsQuantity, topCategoryVsIncome };
};


const getCategoryTreeReport = async () => {
    const query = `select category_id, 
                        category.parent_id,
                        category.title,
                        sum(orderitem.quantity) as quantity, 
                        sum(payment.payment_amount)  as income 
                    from category
                        join productcategory using(category_id)
                        join variant using(product_id)
                        join orderitem using(variant_id) 
                        join payment using(order_id)
                    group by category_id`;
    const out = await connection.query(query);
    const categoryData = out.rows.map((value) => [value.title, value.quantity, value.income]);
    const categoryParents = out.rows.map((value) => [value.category_id, value.parent_id]);
    return { categoryData, categoryParents };
};


const getProductVisitedCountReport = async (productId) => {
    const query = `select date(visited_date) as  visited_day,
                        count(*)
                    from visitedproduct 
                    where product_id=$1 
                    group by visited_day
                    order by visited_day`;
    const out = await connection.query(query, [productId]);
    const productVisits = out.rows.map((value) => dateDataField(value.visited_day, value.count));
    return productVisits;
};


const getProductOrderedCountReport = async (productId) => {
    const query = `select date(orderdata.order_date) as order_day, 
                        count(orderitem.quantity) as sells
                    from orderdata 
                        join orderitem using(order_id) 
                        join variant using(variant_id)
                    where product_id=$1
                    group by order_day
                    order by order_day`;
    const out = await connection.query(query, [productId]);
    const productOrders = out.rows.map(
        (value) => dateDataField(value.order_day, value.sells),
    );
    return productOrders;
};


const getProductMonthlyOrdersReport = async (productId) => {
    const query = `select * from
                (
                    select to_char(visited_date,'mm') as month,
                        count(*) as visits
                    from visitedproduct
                    where product_id=$1
                    group by month
                ) as visits_month join
                (    
                    select to_char(orderdata.order_date, 'mm') as month,
                        count(*) as orders
                    from orderdata
                        join orderitem using(order_id)
                        join variant using(variant_id)
                    where product_id=$1
                    group by month
                ) as orders_month using(month)`;
    const out = await connection.query(query, [productId]);
    return out.rows;
};

const getProductData = async (productId) => {
    const query1 = 'select * from product where product_id = $1';
    const out1 = await connection.query(query1, [productId]);
    const query2 = 'select * from Variant where product_id = $1';
    const out2 = await connection.query(query2, [productId]);
    return {
        productData: out1.rows[0],
        variantData: out2.rows,
    };
};

const getProducts = async () => {
    const query = 'select * from productbasicview order by added_date';
    const out = await connection.query(query);
    return out.rows;
};


const getPopularProductsBetweenDates = async (date1, date2) => {
    const query = `select product.product_id, 
                        product.title, 
                        sum(orderitem.quantity) as quantity, 
                        sum(payment.payment_amount)  as income 
                    from product 
                        join variant using(product_id) 
                        join orderitem using(variant_id) 
                        join orderdata using(order_id) 
                        join payment using(order_id)
                    where orderdata.order_date between $1 and $2
                    group by product.product_id
                    order by quantity desc limit 10`;

    const out = await connection.query(query, [date1, date2]);
    const products = out.rows.map(
        (value, index) => [index + 1, value.title, value.quantity, value.income, value.product_id],
    );
    const productVsQuantity = out.rows.map(
        (value, index) => ({ label: `#${index + 1}`, value: value.quantity - 0 }),
    );
    return { products, productVsQuantity };
};

module.exports = {
    getProductCounts,
    getCategoryTreeReport,
    getTopCategoryLeafNodes,
    getProductVisitedCountReport,
    getProductOrderedCountReport,
    getProductData,
    getProducts,
    getPopularProductsBetweenDates,
    getProductMonthlyOrdersReport,
};
