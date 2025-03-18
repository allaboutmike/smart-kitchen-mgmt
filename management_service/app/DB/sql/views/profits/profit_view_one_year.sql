CREATE MATERIALIZED VIEW IF NOT EXISTS profit_view_one_year
AS
SELECT
  SUM(menuitems.price) - (
    SELECT
      SUM(expenses.amount)
    FROM
      expenses
    ) AS profit
FROM
  menuitems INNER JOIN orderitems on menuitems.menuitemid = orderitems.menuitemid
WHERE servedtimestamp >= current_date - interval '1 year';