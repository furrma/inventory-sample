CREATE DEFINER=`root`@`localhost` PROCEDURE `ItemAddEdit`(
IN _id int,
IN _name varchar(50),
IN _qty int,
IN _amount decimal
)
BEGIN
	IF _id = 0 THEN
		INSERT INTO items(name,qty,amount)
        VALUES (_name,_qty,_amount);
        
        SET _id = last_insert_id();
        
	ELSE 
		UPDATE items
        SET
        name=_name,
        qty=_qty,
        amount=_amount
        WHERE id=_id;
        
	END IF;
    
    SELECT _id AS 'id';
END