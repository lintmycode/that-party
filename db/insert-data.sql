-- insert categories
INSERT INTO Categories (id, name) VALUES 
(1, 'Grelha'),
(2, 'Tábua'),
(3, 'Doce'),
(4, 'Bebidas alcoólicas'),
(5, 'Bebidas não-alcoólicas');

-- insert contributions
INSERT INTO Contributions (category_id, name, qtyPer10Adults, qtyPer10Children) VALUES 
(1, 'Frango', 3, 3),
(1, 'Costelinha', 3, 3),
(1, 'Hambúrgeres', 4, 4),
(1, 'Febras', 3, 3),
(1, 'Chouriço', 4, 2),
(1, 'Salsichas', 4, 5),

(2, 'Queijo', 3, 1),
(2, 'Enchidos', 3, 1),
(2, 'Tostas / crackers / grissinos', 2, 2),
(2, 'Frutos secos / Azeitonas', 2, 2),
(2, 'Frutos silvestres / Figos', 3, 3),
(2, 'Uvas / Maçãs', 3, 3),
(2, 'Mel / Húmus', 2, 2),
(2, 'Tomates cereja / Cenouras / Pepinos', 2, 2),

(3, 'Bolo de noivos', 1, 1),
(3, 'Sobremesa', 2, 2),
(3, 'Torta / Tarte', 1, 1),
(3, 'Biscoitos / Bolachas / Queques', 2, 2),

(4, 'Vinho Branco', 3, 0),
(4, 'Vinho Alvarinho', 3, 0),
(4, 'Vinho Rosé', 3, 0),
(4, 'Vinho Tinto', 3, 0),
(4, 'Gin + Tónica', 1, 0),
(4, 'Porto + Tónica', 1, 0),
-- (4, 'Cerveja', 2, 0),
(4, 'Champarrião (cerveja + vinho + gasosa)', 2, 0),
(4, 'Espumante', 3, 0),

(5, 'Água das Pedras', 2, 1),
(5, 'Coca-cola', 1, 1),
(5, 'Seven-up', 1, 1),
(5, 'Ice Tea', 1, 1),
(5, 'Fanta / Sumol', 1, 1),
(5, 'Sumos de fruta', 1, 1);
