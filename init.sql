CREATE TABLE books (
     id SERIAL
    ,name VARCHAR(255)
    ,author VARCHAR(255)
    ,description TEXT
    ,isbn VARCHAR(13)
    ,date_public DATE
    ,publisher VARCHAR(255)
    ,lang VARCHAR(255)
    ,is_in_stock BOOLEAN
);

CREATE INDEX ix_name ON books(name);
CREATE INDEX ix_publisher ON books(publisher);
CREATE unique index uix_books__isbn ON books (isbn);

GRANT ALL ON TABLE books to postgres;
GRANT ALL ON TABLE books to public;