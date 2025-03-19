CREATE MATERIALIZED VIEW IF NOT EXISTS profit_view_one_year
AS
 SELECT COALESCE(( SELECT sum(menuitems.price) AS sum
           FROM menuitems
             JOIN orderitems ON menuitems.menuitemid = orderitems.menuitemid
          WHERE orderitems.servedtimestamp::date >= (CURRENT_DATE - '1 year'::interval)), 0::numeric) - COALESCE(( SELECT sum(expenses.amount) AS sum
           FROM expenses
          WHERE expenses.expensedate::date >= (CURRENT_DATE - '1 year'::interval)), 0::numeric) AS profit;