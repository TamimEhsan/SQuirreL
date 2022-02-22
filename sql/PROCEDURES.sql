CREATE OR REPLACE PROCEDURE REVIEW_BOOK(BID IN NUMBER, UID IN NUMBER, STAR IN NUMBER, REVIEW_MSG IN VARCHAR2 ) IS
    hasRated  NUMBER;
    hasBought NUMBER;
    ISTAR NUMBER;
BEGIN
    SELECT COUNT(*)
    INTO hasRated
    FROM RATES
    WHERE user_id = UID
      AND book_id = BID;

    SELECT COUNT(*)
    INTO hasBought
    FROM picked
             JOIN cart ON cart.id = picked.cart_id and cart.user_id = UID
             JOIN book_order on book_order.cart_id = cart.id and book_order.state = 5
    WHERE book_id = BID;
    ISTAR := ROUND(STAR,0);
    IF hasRated = 0 AND hasBought <> 0 AND STAR > 0 AND STAR <=5 THEN

        INSERT INTO RATES(user_id,book_id,stars,review)
        VALUES(UID,BID,ISTAR,REVIEW_MSG);
        DBMS_OUTPUT.PUT_LINE('inserted review');
    ELSE
        DBMS_OUTPUT.PUT_LINE('can not review');
    end if;

end;
/

-- Assign new cart to user
CREATE OR REPLACE PROCEDURE ASSIGN_NEW_CART(UID IN NUMBER) IS
    CID NUMBER;
BEGIN
    INSERT INTO cart(user_id) VALUES(UID) RETURNING ID INTO CID;
    UPDATE APP_USER SET cart_id = CID WHERE id = UID;
END;
/


-- Create new order

CREATE OR REPLACE PROCEDURE CREATE_ORDER(UID IN NUMBER, VID IN NUMBER, NAME_ IN VARCHAR2, PHONE1_ IN VARCHAR2,
                                         PHONE2_ IN VARCHAR2,
                                         ADDRESS_ IN VARCHAR2, PICK_ IN NUMBER) IS
    CID             NUMBER;
    PRICE_VALUE     NUMBER;
    ITEM_COUNT      NUMBER;
    CAP_VALUE       NUMBER;
    DISCOUUNT_VALUE NUMBER;
    STOCKED_OUT     NUMBER;
    BID             NUMBER;
    AMNT            NUMBER;
BEGIN
    SELECT cart_id INTO CID FROM app_user WHERE id = UID;
    SELECT SUM(price * AMOUNT)
    INTO PRICE_VALUE
    FROM picked
             JOIN book ON picked.book_id = book.id
    WHERE cart_id = CID;
    SELECT SUM(AMOUNT)
    INTO ITEM_COUNT
    FROM picked
             JOIN book ON picked.book_id = book.id
    WHERE cart_id = CID;
    IF ITEM_COUNT IS NULL THEN
        RETURN;
    end if;
    IF ITEM_COUNT <= 0 THEN
        RETURN ;
    end if;

    -- Check for stock availibity
    STOCKED_OUT := HAS_STOCK(CID);
    IF STOCKED_OUT = 1 THEN
        RETURN ;
    end if;

    -- Update total price after adding voucher
    IF VID IS NOT NULL THEN
        SELECT DISCOUNT INTO DISCOUUNT_VALUE
        FROM VOUCHER WHERE ID = VID AND VALIDITY>sysdate;

        SELECT CAP INTO CAP_VALUE
        FROM VOUCHER WHERE ID = VID AND VALIDITY>sysdate;

        PRICE_VALUE := PRICE_VALUE - LEAST( PRICE_VALUE*DISCOUUNT_VALUE/100,CAP_VALUE );
        PRICE_VALUE := CEIL(PRICE_VALUE);
    end if;

    -- Insert into order
    INSERT INTO book_order(cart_id, voucher_id, total_price, total_item, name, phone1, phone2, address, pick, state)
    VALUES (CID, VID, PRICE_VALUE+50, ITEM_COUNT, NAME_, PHONE1_, PHONE2_, ADDRESS_, PICK_, 1);

    ASSIGN_NEW_CART(UID);
end;
/
