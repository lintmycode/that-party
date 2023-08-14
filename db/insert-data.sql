-- insert categories
INSERT INTO Categories (id, name) VALUES 
(1, 'Para a grelha'),
(2, 'Sobremesas'),
(3, 'Bebidas alcoólicas'),
(4, 'Bebidas não-alcoólicas');

-- insert contributions
INSERT INTO Contributions (id, category_id, name, qty) VALUES 
(1, 1, 'Frango', 10),
(2, 1, 'Costelinha', 20),
(3, 1, 'Hamburgeres', 10),
(4, 1, 'Chouriço', 20),
(5, 1, 'Toscanas', 20),

(6, 2, 'Aletria', 10),
(7, 2, 'Bolo de noiva', 10),

(8, 3, 'Vinho branco', 10),
(9, 3, 'Vinho alvarinho', 10),
(10, 3, 'Vinho rosé', 10),
(11, 3, 'Gin + tónica (pack 6)', 10),
(12, 3, 'Cerveja (pack 6)', 10),

(13, 4, 'Água das Pedras (pack 6)', 20),
(14, 4, 'Coca-cola (1.5l)', 10),
(15, 4, 'Seven-up (1.5l)', 10),
(16, 4, 'Ice Tea (1.5l)', 10),
(17, 4, 'Fanta / Sumol (1.5l)', 10),
(18, 4, 'Sumos de fruta (1l)', 10);
