SELECT 
	menuitems.name,
	COUNT(menuitems.menuitemid) AS totalSaleCount
FROM
	orderitems
	INNER JOIN menuitems USING (menuitemid)
WHERE orderitems.servedtimestamp >= (CURRENT_DATE - '7 days'::interval)
GROUP BY
	menuitems.name
ORDER BY totalSaleCount DESC/ASC
LIMIT 1;