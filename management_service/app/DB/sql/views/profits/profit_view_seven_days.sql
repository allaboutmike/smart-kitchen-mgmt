CREATE MATERIALIZED VIEW IF NOT EXISTS profit_view_seven_days
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
WHERE servedtimestamp >= current_date - interval '7 days';