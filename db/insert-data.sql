-- insert categories
INSERT INTO Categories (id, name) VALUES 
(1, 'Grelha'),
(2, 'Tábua'),
(3, 'Doce'),
(4, 'Bebidas alcoólicas'),
(5, 'Bebidas não-alcoólicas');

-- insert contributions
INSERT INTO Contributions (category_id, name, qtyPer10Adults, qtyPer10Children) VALUES 
(1, 'Frango (1un)', 3, 3),
(1, 'Costelinha (1un)', 3, 3),
(1, 'Hambúrgeres (2un)', 4, 4),
(1, 'Febras (0.5kg)', 3, 3),
(1, 'Chouriço (1un)', 3, 2),
(1, 'Salsichas (1emb)', 3, 5),

(2, 'Queijo (1un)', 3, 1),
(2, 'Enchidos (1un)', 3, 1),
(2, 'Tostas / crackers / grissinos (1emb)', 2, 2),
(2, 'Frutos secos / Azeitonas (1emb)', 2, 2),
(2, 'Frutos silvestres / Figos', 3, 3),
(2, 'Uvas / Maçãs', 3, 3),
(2, 'Mel / Húmus (1un)', 1, 1),
(2, 'Tomates cereja / Cenouras / Pepinos', 2, 2),

(3, 'Bolo de noivos', 1, 1),
(3, 'Sobremesa (que não precise de frio)', 2, 2),
(3, 'Torta / Tarte', 1, 1),
(3, 'Biscoitos / Bolachas / Queques (1emb)', 2, 2),

(4, 'Vinho Branco (2un)', 3, 0),
(4, 'Vinho Alvarinho (2un)', 3, 0),
(4, 'Vinho Rosé (2un)', 3, 0),
(4, 'Vinho Tinto (2un)', 2, 0),
(4, 'Espumante (2un)', 3, 0),
(4, 'Gin + Tónica (1un)', 2, 0),
(4, 'Porto + Tónica (1un)', 2, 0),
(4, 'Vodka (1un)', 1, 0),
(4, 'Champarrião (cerveja + vinho branco + gasosa)', 3, 0),

(5, 'Água das Pedras (2un)', 2, 1),
(5, 'Coca-cola (2un)', 1, 1),
(5, 'Seven-up (2un)', 1, 1),
(5, 'Ice Tea (2un)', 1, 1),
(5, 'Fanta / Sumol (2un)', 0, 2),
(5, 'Sumos de fruta (2un)', 0, 3);
