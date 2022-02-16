-- 1
create TABLE author (
    ID          NUMBER GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1) ,
    Name        VARCHAR2(100),
    password    VARCHAR2(1024),
    CONSTRAINT author_pk primary key (ID)
);

-- 2
create TABLE  genre (
    ID         NUMBER GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1) ,
    type       VARCHAR2(50),
    CONSTRAINT genre_pk PRIMARY KEY(ID)
);

-- 3
create TABLE publisher(
    ID              NUMBER GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1) ,
    name            VARCHAR2(100) NOT NULL,
    founding_date   DATE,
    CONSTRAINT publisher_pk PRIMARY KEY(ID)
);

-- 4
create TABLE voucher (
    ID          NUMBER GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1) ,
    name        VARCHAR2(100) NOT NULL ,
    discount    NUMBER NOT NULL,
    validity    DATE,
    CONSTRAINT voucher_pk PRIMARY KEY(ID)
);

-- 5
create TABLE app_user (
    ID          NUMBER GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1) ,
    Name        VARCHAR2(100) NOT NULL ,
    password    VARCHAR2(1024) NOT NULL ,
    address     VARCHAR2(1000),
    CONSTRAINT user_pk primary key (ID)
);

-- 6
create TABLE book(
    ID                  NUMBER GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1) ,
    author_id           NUMBER,
    publisher_id        NUMBER,
    publishing_year     NUMBER,
    Price               NUMBER,
    Stock               NUMBER,
    Language            VARCHAR2(20),
    CONSTRAINT book_pk PRIMARY KEY (ID),
    CONSTRAINT book_author_fk FOREIGN KEY(author_id) REFERENCES author(ID),
    CONSTRAINT book_publisher_fk FOREIGN KEY(publisher_id) REFERENCES publisher(ID)
);

-- 7
create TABLE cart (
    ID          NUMBER GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1) ,
    user_id     NUMBER,
    created_at  DATE DEFAULT SYSDATE,
    CONSTRAINT cart_pk PRIMARY KEY(ID),
    CONSTRAINT cart_user_fk FOREIGN KEY(user_id) REFERENCES app_user(ID)
);

-- 8
create TABLE award (
    ID          NUMBER GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1) ,
    name        VARCHAR2(100) NOT NULL ,
    provider    VARCHAR2(100),
    CONSTRAINT award_pk PRIMARY KEY(ID)
);

-- 9
create TABLE book_order (
    ID              NUMBER GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1),
    cart_id         NUMBER,
    voucher_id      NUMBER,
    total_price     NUMBER,
    total_item      NUMBER,
    state           VARCHAR2(50),
    payment_method  VARCHAR2(50),
    created_at      DATE DEFAULT SYSDATE,
    CONSTRAINT order_pk PRIMARY KEY(ID),
    CONSTRAINT order_cart_fk FOREIGN KEY(cart_id) REFERENCES cart(ID),
    CONSTRAINT order_voucher_fk FOREIGN KEY(voucher_id) REFERENCES voucher(ID)
);

-- 10
create TABLE rates(
    ID          NUMBER GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1) ,
    user_id     NUMBER,
    book_id     NUMBER,
    stars       NUMBER,
    created_at  DATE DEFAULT SYSDATE,
    CONSTRAINT rates_pk PRIMARY KEY(ID),
    CONSTRAINT rates_user_fk FOREIGN KEY(user_id) REFERENCES app_user(ID),
    CONSTRAINT rates_book_fk FOREIGN KEY(book_id) REFERENCES book(ID)
);

-- 11
create TABLE comments(
    ID          NUMBER GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1) ,
    user_id     NUMBER,
    book_id     NUMBER,
    comments    VARCHAR2(2000),
    created_at  DATE DEFAULT SYSDATE,
    CONSTRAINT comments_pk PRIMARY KEY(ID),
    CONSTRAINT comments_user_fk FOREIGN KEY(user_id) REFERENCES app_user(ID),
    CONSTRAINT comments_book_fk FOREIGN KEY(book_id) REFERENCES book(ID)
);

-- 12
create TABLE picked
(
    ID         NUMBER GENERATED ALWAYS as IDENTITY (START with 1 INCREMENT by 1),
    cart_id    NUMBER,
    book_id    NUMBER,
    created_at DATE DEFAULT SYSDATE,
    CONSTRAINT picked_pk PRIMARY KEY (ID),
    CONSTRAINT picked_cart_fk FOREIGN KEY (cart_id) REFERENCES cart(ID),
    CONSTRAINT picked_book_fk FOREIGN KEY (book_id) REFERENCES book (ID)
);

-- 13
create TABLE awarded(
    ID          NUMBER GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1) ,
    award_id    NUMBER,
    book_id     NUMBER,
    year        NUMBER,
    CONSTRAINT awarded_pk PRIMARY KEY(ID),
    CONSTRAINT awarded_award_fk FOREIGN KEY(award_id) REFERENCES award(ID),
    CONSTRAINT awarded_book_fk FOREIGN KEY(book_id) REFERENCES book(ID)
);

-- didn't add still
alter table APP_USER
	add cart_id NUMBER ;

alter table APP_USER
	add constraint APP_USER_CART_ID_FK
		foreign key(cart_id) references CART;


-- Added columns
alter table APP_USER
	add EMAIL varchar2(100) not null;

alter table BOOK
	add IMAGE varchar2(1000) default 'https://st2.depositphotos.com/5703046/12114/i/950/depositphotos_121142344-stock-photo-white-book-on-white-background.jpg';

alter table AUTHOR
	add IMAGE varchar2(1000) default 'https://www.123rf.com/photo_91832679_man-avatar-icon-flat-illustration-of-man-avatar-vector-icon-isolated-on-white-background.html';

alter table AUTHOR
	add DESCRIPTION VARCHAR2(3000);

alter table BOOK
	add NAME VARCHAR2(100);

alter table BOOK
	add ISBN VARCHAR2(100);

alter table BOOK
	add PAGE NUMBER;

alter table BOOK
	add EDITION VARCHAR2(100);

alter table PICKED
	add AMOUNT NUMBER default 1
    CONSTRAINT PICKED_AMOUNT_MIN_MAX_VALUE check(AMOUNT between 1 and 5);

alter table BOOK_ORDER
	add NAME VARCHAR2(100) not null
	add phone1 VARCHAR2(20) not null
	add phone2 VARCHAR2(20)
	add address VARCHAR2(1000)
	add pick NUMBER default 1 not null;

alter table RATES
	add REVIEW VARCHAR2(1000);

alter table APP_USER
    add PHONE varchar2(20)
    add DOB varchar2(20)
	add IMAGE VARCHAR2(1000) default '/images/no-profile-picture.jpg';

create TABLE WISH_LIST(
	user_id INTEGER NOT NULL,
	book_id INTEGER NOT NULL,
	CONSTRAINT WISH_LIST_PK PRIMARY KEY(user_id,book_id),
	CONSTRAINT WISH_LIST_USER_FK FOREIGN KEY(user_id) REFERENCES APP_USER(ID) ,
	CONSTRAINT WISH_LIST_BOOK_FK FOREIGN KEY(book_id) REFERENCES BOOK(ID)
);

alter table PUBLISHER
	add FID VARCHAR2(50);

alter table AUTHOR
	add FID VARCHAR2(50);

alter table BOOK
	add SUMMARY VARCHAR2(3000);

alter table BOOK
    add STAR NUMBER default 0
    add REVIEW_COUNT NUMBER default 0;

alter table VOUCHER
	add CAP NUMBER default 250;

