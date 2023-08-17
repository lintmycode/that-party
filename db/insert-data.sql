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
(1, 'Costelinha (piano)', 3, 3),
(1, 'Hamburgeres (pack 2)', 4, 4),
(1, 'Fêveras', 3, 3),
(1, 'Chouriço', 4, 2),
(1, 'Salsichas', 4, 5),

(2, 'Queijo', 3, 1),
(2, 'Enchidos', 3, 1),
(2, 'Tostas / Crackers / Grissinos', 2, 2),
(2, 'Frutos secos / Azeitonas', 2, 2),
(2, 'Frutos silvestres / figos', 3, 3),
(2, 'Uvas / maças', 3, 3),
(2, 'Mel / húmus', 2, 2),
(2, 'Tomates cereja / cenouras / pepinos', 2, 2),

(3, 'Torta / tarte', 1, 1),
(3, 'Biscoitos / Bolachas', 2, 2),
(3, 'Sobremesa', 2, 2),
(3, 'Bolo de noiva', 1, 1),

(4, 'Vinho branco', 3, 0),
(4, 'Vinho alvarinho', 3, 0),
(4, 'Vinho rosé', 3, 0),
(4, 'Vinho tinto', 3, 0),
(4, 'Gin + tónica', 1, 0),
(4, 'Porto + tónica', 1, 0),
(4, 'Cerveja (pack 6)', 2, 0),
(4, 'Champarrião (cerveja + vinho + gasosa)', 2, 0),
(4, 'Espumante', 3, 0),

(5, 'Água das Pedras', 2, 1),
(5, 'Coca-cola (1.5l)', 1, 1),
(5, 'Seven-up (1.5l)', 1, 1),
(5, 'Ice Tea (1.5l)', 1, 1),
(5, 'Fanta / Sumol (1.5l)', 1, 1),
(5, 'Sumos de fruta (1l)', 1, 1);
