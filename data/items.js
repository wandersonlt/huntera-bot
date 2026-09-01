// data/items.js - Lista COMPLETA de itens do Tibia/Huntera

// ============================================================
// ARMAS
// ============================================================
const ARMAS = [
  // Espadas
  'Espada Curta', 'Espada Longa', 'Espada de Duas Mãos',
  'Espada de Ferro', 'Espada de Aço', 'Espada de Mithril',
  'Espada de Dragão', 'Espada de Cristal', 'Espada de Fogo',
  'Espada de Gelo', 'Espada de Energia', 'Espada de Luz',
  'Espada de Sombra', 'Espada de Veneno', 'Espada de Sangue',
  'Espada de Guerra', 'Espada do Caos', 'Espada da Justiça',
  'Espada do Herói', 'Espada do Lendário', 'Espada do Cavaleiro',
  'Espada do Paladino', 'Espada do Guerreiro', 'Espada do Guardião',
  'Espada do Dragão', 'Espada do Demonio', 'Espada do Anjo',
  'Espada de Batalha', 'Espada do Rei', 'Espada da Rainha',
  'Espada do Trono', 'Espada do Destino', 'Espada da Alvorada',
  'Espada do Crepúsculo', 'Espada da Meia-Noite', 'Espada do Sol',
  'Espada da Lua', 'Espada das Estrelas', 'Espada do Vento',
  'Espada da Tempestade', 'Espada do Trovão', 'Espada do Relâmpago',
  'Espada do Terremoto', 'Espada do Vulcão', 'Espada do Oceano',
  'Espada do Deserto', 'Espada da Floresta', 'Espada das Montanhas',
  
  // Machados
  'Machado Curto', 'Machado Longo', 'Machado de Duas Mãos',
  'Machado de Ferro', 'Machado de Aço', 'Machado de Mithril',
  'Machado de Dragão', 'Machado de Cristal', 'Machado de Fogo',
  'Machado de Gelo', 'Machado de Energia', 'Machado de Batalha',
  'Machado de Guerra', 'Machado do Caos', 'Machado do Herói',
  'Machado do Lendário', 'Machado do Cavaleiro', 'Machado do Paladino',
  'Machado do Guerreiro', 'Machado do Guardião', 'Machado do Dragão',
  'Machado do Demonio', 'Machado do Anjo', 'Machado do Rei',
  'Machado do Trono', 'Machado do Destino', 'Machado da Alvorada',
  'Machado do Crepúsculo', 'Machado da Meia-Noite', 'Machado do Sol',
  'Machado da Lua', 'Machado das Estrelas', 'Machado do Vento',
  'Machado da Tempestade', 'Machado do Trovão', 'Machado do Relâmpago',
  
  // Arcos
  'Arco Curto', 'Arco Longo', 'Arco de Guerra',
  'Arco de Ferro', 'Arco de Aço', 'Arco de Mithril',
  'Arco de Dragão', 'Arco de Cristal', 'Arco de Fogo',
  'Arco de Gelo', 'Arco de Energia', 'Arco de Luz',
  'Arco de Sombra', 'Arco de Veneno', 'Arco de Sangue',
  'Arco do Caos', 'Arco do Herói', 'Arco do Lendário',
  'Arco do Paladino', 'Arco do Guerreiro', 'Arco do Guardião',
  'Arco do Dragão', 'Arco do Demonio', 'Arco do Anjo',
  'Arco do Rei', 'Arco do Trono', 'Arco do Destino',
  'Arco da Alvorada', 'Arco do Crepúsculo', 'Arco da Meia-Noite',
  'Arco do Sol', 'Arco da Lua', 'Arco das Estrelas',
  'Arco do Vento', 'Arco da Tempestade', 'Arco do Trovão',
  'Arco do Relâmpago', 'Arco do Oceano', 'Arco do Deserto',
  
  // Bestas
  'Besta', 'Besta de Ferro', 'Besta de Aço',
  'Besta de Mithril', 'Besta de Dragão', 'Besta de Cristal',
  'Besta de Fogo', 'Besta de Gelo', 'Besta de Energia',
  'Besta de Guerra', 'Besta do Caos', 'Besta do Herói',
  'Besta do Lendário', 'Besta do Paladino', 'Besta do Guerreiro',
  'Besta do Guardião', 'Besta do Dragão', 'Besta do Demonio',
  'Besta do Anjo', 'Besta do Rei', 'Besta do Trono',
  'Besta do Destino', 'Besta da Alvorada', 'Besta do Crepúsculo',
  'Besta da Meia-Noite', 'Besta do Sol', 'Besta da Lua',
  'Besta das Estrelas', 'Besta do Vento', 'Besta da Tempestade',
  'Besta do Trovão', 'Besta do Relâmpago', 'Besta do Oceano',
  
  // Bastões
  'Bastão', 'Bastão de Ferro', 'Bastão de Aço',
  'Bastão de Mithril', 'Bastão de Dragão', 'Bastão de Cristal',
  'Bastão de Fogo', 'Bastão de Gelo', 'Bastão de Energia',
  'Bastão de Luz', 'Bastão de Sombra', 'Bastão de Veneno',
  'Bastão de Sangue', 'Bastão de Guerra', 'Bastão do Caos',
  'Bastão do Herói', 'Bastão do Lendário', 'Bastão do Cavaleiro',
  'Bastão do Paladino', 'Bastão do Guerreiro', 'Bastão do Guardião',
  'Bastão do Dragão', 'Bastão do Demonio', 'Bastão do Anjo',
  'Bastão do Rei', 'Bastão do Trono', 'Bastão do Destino',
  'Bastão da Alvorada', 'Bastão do Crepúsculo', 'Bastão da Meia-Noite',
  'Bastão do Sol', 'Bastão da Lua', 'Bastão das Estrelas',
  'Bastão do Vento', 'Bastão da Tempestade', 'Bastão do Trovão',
  
  // Adagas
  'Adaga', 'Adaga de Ferro', 'Adaga de Aço',
  'Adaga de Mithril', 'Adaga de Dragão', 'Adaga de Cristal',
  'Adaga de Fogo', 'Adaga de Gelo', 'Adaga de Energia',
  'Adaga de Luz', 'Adaga de Sombra', 'Adaga de Veneno',
  'Adaga de Sangue', 'Adaga de Guerra', 'Adaga do Caos',
  'Adaga do Herói', 'Adaga do Lendário', 'Adaga do Cavaleiro',
  'Adaga do Paladino', 'Adaga do Guerreiro', 'Adaga do Guardião',
  'Adaga do Dragão', 'Adaga do Demonio', 'Adaga do Anjo',
  'Adaga do Rei', 'Adaga do Trono', 'Adaga do Destino',
  'Adaga da Alvorada', 'Adaga do Crepúsculo', 'Adaga da Meia-Noite',
  'Adaga do Sol', 'Adaga da Lua', 'Adaga das Estrelas',
  'Adaga do Vento', 'Adaga da Tempestade', 'Adaga do Trovão',
  'Adaga do Assassino', 'Adaga do Ladrão', 'Adaga do Espião',
  
  // Lanças
  'Lança', 'Lança de Ferro', 'Lança de Aço',
  'Lança de Mithril', 'Lança de Dragão', 'Lança de Cristal',
  'Lança de Fogo', 'Lança de Gelo', 'Lança de Energia',
  'Lança de Luz', 'Lança de Sombra', 'Lança de Veneno',
  'Lança de Sangue', 'Lança de Guerra', 'Lança do Caos',
  'Lança do Herói', 'Lança do Lendário', 'Lança do Cavaleiro',
  'Lança do Paladino', 'Lança do Guerreiro', 'Lança do Guardião',
  'Lança do Dragão', 'Lança do Demonio', 'Lança do Anjo',
  'Lança do Rei', 'Lança do Trono', 'Lança do Destino',
  'Lança da Alvorada', 'Lança do Crepúsculo', 'Lança da Meia-Noite',
  'Tridente', 'Tridente de Ferro', 'Tridente de Aço',
  'Tridente de Mithril', 'Tridente de Dragão', 'Tridente de Cristal',
  
  // Maças e Martelos
  'Maça', 'Maça de Ferro', 'Maça de Aço',
  'Maça de Mithril', 'Maça de Dragão', 'Maça de Cristal',
  'Maça de Fogo', 'Maça de Gelo', 'Maça de Energia',
  'Maça de Guerra', 'Maça do Caos', 'Maça do Herói',
  'Martelo', 'Martelo de Ferro', 'Martelo de Aço',
  'Martelo de Mithril', 'Martelo de Dragão', 'Martelo de Cristal',
  'Martelo de Fogo', 'Martelo de Gelo', 'Martelo de Energia',
  'Martelo de Guerra', 'Martelo do Caos', 'Martelo do Herói',
  'Martelo do Lendário', 'Martelo do Cavaleiro', 'Martelo do Paladino',
  
  // Cajados e Clavas
  'Cajado', 'Cajado de Ferro', 'Cajado de Aço',
  'Cajado de Mithril', 'Cajado de Dragão', 'Cajado de Cristal',
  'Cajado de Fogo', 'Cajado de Gelo', 'Cajado de Energia',
  'Cajado de Luz', 'Cajado de Sombra', 'Cajado de Guerra',
  'Cajado do Caos', 'Cajado do Herói', 'Cajado do Mago',
  'Clava', 'Clava de Ferro', 'Clava de Aço',
  'Clava de Mithril', 'Clava de Dragão', 'Clava de Cristal',
  'Clava de Fogo', 'Clava de Gelo', 'Clava de Energia',
  'Clava de Guerra', 'Clava do Caos', 'Clava do Herói',
  
  // Cetros
  'Cetro', 'Cetro de Ferro', 'Cetro de Aço',
  'Cetro de Mithril', 'Cetro de Dragão', 'Cetro de Cristal',
  'Cetro de Fogo', 'Cetro de Gelo', 'Cetro de Energia',
  'Cetro de Luz', 'Cetro de Sombra', 'Cetro de Guerra',
  'Cetro do Caos', 'Cetro do Herói', 'Cetro do Lendário',
  'Cetro do Cavaleiro', 'Cetro do Paladino', 'Cetro do Guerreiro',
];

// ============================================================
// ESCUDOS
// ============================================================
const ESCUDOS = [
  'Escudo de Madeira', 'Escudo de Couro', 'Escudo de Bronze',
  'Escudo de Ferro', 'Escudo de Aço', 'Escudo de Mithril',
  'Escudo de Dragão', 'Escudo de Cristal', 'Escudo de Fogo',
  'Escudo de Gelo', 'Escudo de Energia', 'Escudo de Luz',
  'Escudo de Sombra', 'Escudo de Veneno', 'Escudo de Sangue',
  'Escudo de Batalha', 'Escudo de Guerra', 'Escudo do Guardião',
  'Escudo do Cavaleiro', 'Escudo do Paladino', 'Escudo do Guerreiro',
  'Escudo do Herói', 'Escudo do Lendário', 'Escudo do Rei',
  'Broquel', 'Broquel de Ferro', 'Broquel de Aço',
  'Broquel de Mithril', 'Broquel de Dragão', 'Broquel de Cristal',
  'Broquel de Fogo', 'Broquel de Gelo', 'Broquel de Energia',
  'Broquel de Guerra', 'Broquel do Caos', 'Broquel do Herói',
  'Targe', 'Targe de Ferro', 'Targe de Aço',
  'Targe de Mithril', 'Targe de Dragão', 'Targe de Cristal',
  'Targe de Fogo', 'Targe de Gelo', 'Targe de Energia',
  'Targe de Guerra', 'Targe do Caos', 'Targe do Herói',
  'Escudo do Demonio', 'Escudo do Anjo', 'Escudo do Caos',
  'Escudo da Justiça', 'Escudo da Proteção', 'Escudo da Defesa',
];

// ============================================================
// ARMADURAS
// ============================================================
const ARMADURAS = [
  'Armadura de Couro', 'Armadura de Bronze', 'Armadura de Ferro',
  'Armadura de Aço', 'Armadura de Mithril', 'Armadura de Dragão',
  'Armadura de Cristal', 'Armadura de Fogo', 'Armadura de Gelo',
  'Armadura de Energia', 'Armadura de Luz', 'Armadura de Sombra',
  'Armadura de Veneno', 'Armadura de Sangue', 'Armadura de Batalha',
  'Armadura de Guerra', 'Armadura do Cavaleiro', 'Armadura do Guerreiro',
  'Armadura do Paladino', 'Armadura do Guardião', 'Armadura do Herói',
  'Armadura do Lendário', 'Armadura do Dragão', 'Armadura do Demonio',
  'Armadura do Anjo', 'Armadura do Rei', 'Armadura do Trono',
  'Armadura do Destino', 'Armadura da Alvorada', 'Armadura do Crepúsculo',
  'Túnica', 'Túnica de Seda', 'Túnica de Mago',
  'Túnica de Ferro', 'Túnica de Aço', 'Túnica de Mithril',
  'Túnica de Dragão', 'Túnica de Cristal', 'Túnica de Fogo',
  'Túnica de Gelo', 'Túnica de Energia', 'Túnica de Luz',
  'Túnica de Sombra', 'Túnica de Veneno', 'Túnica de Sangue',
  'Túnica do Arcano', 'Túnica do Elemental', 'Túnica do Caos',
  'Cota de Malha', 'Cota de Malha de Ferro', 'Cota de Malha de Aço',
  'Cota de Malha de Mithril', 'Cota de Malha de Dragão', 'Cota de Malha de Cristal',
  'Cota de Malha de Fogo', 'Cota de Malha de Gelo', 'Cota de Malha de Energia',
  'Cota de Malha de Luz', 'Cota de Malha de Sombra', 'Cota de Malha de Veneno',
  'Cota de Malha de Sangue', 'Cota de Malha de Batalha', 'Cota de Malha de Guerra',
  'Peitoral de Couro', 'Peitoral de Bronze', 'Peitoral de Ferro',
  'Peitoral de Aço', 'Peitoral de Mithril', 'Peitoral de Dragão',
];

// ============================================================
// CAPACETES
// ============================================================
const CAPACETES = [
  'Capacete de Couro', 'Capacete de Bronze', 'Capacete de Ferro',
  'Capacete de Aço', 'Capacete de Mithril', 'Capacete de Dragão',
  'Capacete de Cristal', 'Capacete de Fogo', 'Capacete de Gelo',
  'Capacete de Energia', 'Capacete de Luz', 'Capacete de Sombra',
  'Capacete de Veneno', 'Capacete de Sangue', 'Capacete de Batalha',
  'Capacete de Guerra', 'Capacete do Cavaleiro', 'Capacete do Guerreiro',
  'Capacete do Paladino', 'Capacete do Guardião', 'Capacete do Herói',
  'Capacete do Lendário', 'Capacete do Dragão', 'Capacete do Demonio',
  'Capacete do Anjo', 'Capacete do Rei', 'Capacete do Trono',
  'Chapéu', 'Chapéu de Couro', 'Chapéu de Mago',
  'Chapéu de Seda', 'Chapéu de Arcano', 'Chapéu do Elemental',
  'Chapéu do Caos', 'Chapéu do Mago', 'Chapéu do Feiticeiro',
  'Capuz', 'Capuz de Couro', 'Capuz de Seda',
  'Capuz de Mago', 'Capuz do Arcano', 'Capuz do Elemental',
  'Capuz do Caos', 'Capuz de Sombra', 'Capuz de Luz',
  'Elmo', 'Elmo de Ferro', 'Elmo de Aço',
  'Elmo de Mithril', 'Elmo de Dragão', 'Elmo de Cristal',
  'Elmo de Fogo', 'Elmo de Gelo', 'Elmo de Energia',
  'Elmo de Batalha', 'Elmo de Guerra', 'Elmo do Cavaleiro',
];

// ============================================================
// BOTAS
// ============================================================
const BOTAS = [
  'Botas de Couro', 'Botas de Bronze', 'Botas de Ferro',
  'Botas de Aço', 'Botas de Mithril', 'Botas de Dragão',
  'Botas de Cristal', 'Botas de Fogo', 'Botas de Gelo',
  'Botas de Energia', 'Botas de Luz', 'Botas de Sombra',
  'Botas de Veneno', 'Botas de Sangue', 'Botas de Velocidade',
  'Botas de Agilidade', 'Botas de Destreza', 'Botas de Guerra',
  'Botas do Cavaleiro', 'Botas do Guerreiro', 'Botas do Paladino',
  'Botas do Guardião', 'Botas do Herói', 'Botas do Lendário',
  'Botas do Dragão', 'Botas do Demonio', 'Botas do Anjo',
  'Botas do Rei', 'Botas do Trono', 'Botas do Destino',
  'Botas de Salto', 'Botas de Escalada', 'Botas de Caminhada',
  'Botas do Mago', 'Botas do Arcano', 'Botas do Elemental',
  'Botas do Assassino', 'Botas do Ladrão', 'Botas do Espião',
  'Botas do Guerreiro', 'Botas do Cavaleiro', 'Botas do Paladino',
  'Botas do Guardião', 'Botas do Sentinela', 'Botas do Vigia',
  'Botas de Plumas', 'Botas de Vento', 'Botas de Leveza',
  'Botas de Rapidez', 'Botas de Agilidade', 'Botas de Destreza',
];

// ============================================================
// ANÉIS
// ============================================================
const ANEIS = [
  'Anel de Vida', 'Anel de Mana', 'Anel de Força',
  'Anel de Proteção', 'Anel de Regeneração', 'Anel de Invisibilidade',
  'Anel de Energia', 'Anel de Fogo', 'Anel de Gelo',
  'Anel de Luz', 'Anel de Sombra', 'Anel de Veneno',
  'Anel de Sangue', 'Anel de Destreza', 'Anel de Agilidade',
  'Anel de Inteligência', 'Anel de Sabedoria', 'Anel de Poder',
  'Anel de Guerra', 'Anel de Batalha', 'Anel do Cavaleiro',
  'Anel do Guerreiro', 'Anel do Paladino', 'Anel do Guardião',
  'Anel do Herói', 'Anel do Lendário', 'Anel do Mago',
  'Anel do Arcano', 'Anel do Elemental', 'Anel do Caos',
  'Anel de Diamante', 'Anel de Ouro', 'Anel de Prata',
  'Anel de Cristal', 'Anel de Safira', 'Anel de Rubi',
  'Anel de Esmeralda', 'Anel de Ametista', 'Anel de Topázio',
  'Anel de Ônix', 'Anel de Jade', 'Anel de Âmbar',
  'Anel do Dragão', 'Anel do Demonio', 'Anel do Anjo',
  'Anel do Rei', 'Anel do Trono', 'Anel do Destino',
  'Anel da Alvorada', 'Anel do Crepúsculo', 'Anel da Meia-Noite',
  'Anel do Sol', 'Anel da Lua', 'Anel das Estrelas',
  'Anel do Vento', 'Anel da Tempestade', 'Anel do Trovão',
];

// ============================================================
// AMULETOS
// ============================================================
const AMULETOS = [
  'Amuleto de Proteção', 'Amuleto de Vitalidade', 'Amuleto de Mana',
  'Amuleto de Força', 'Amuleto de Inteligência', 'Amuleto de Destreza',
  'Amuleto de Regeneração', 'Amuleto de Vida', 'Amuleto de Energia',
  'Amuleto de Fogo', 'Amuleto de Gelo', 'Amuleto de Luz',
  'Amuleto de Sombra', 'Amuleto de Veneno', 'Amuleto de Sangue',
  'Amuleto de Guerra', 'Amuleto de Batalha', 'Amuleto do Cavaleiro',
  'Amuleto do Guerreiro', 'Amuleto do Paladino', 'Amuleto do Guardião',
  'Amuleto do Herói', 'Amuleto do Lendário', 'Amuleto do Mago',
  'Amuleto do Arcano', 'Amuleto do Elemental', 'Amuleto do Caos',
  'Amuleto de Ouro', 'Amuleto de Prata', 'Amuleto de Cristal',
  'Amuleto de Diamante', 'Amuleto de Safira', 'Amuleto de Rubi',
  'Amuleto de Esmeralda', 'Amuleto de Ametista', 'Amuleto de Topázio',
  'Amuleto de Ônix', 'Amuleto de Jade', 'Amuleto de Âmbar',
  'Amuleto do Dragão', 'Amuleto do Demonio', 'Amuleto do Anjo',
  'Amuleto do Rei', 'Amuleto do Trono', 'Amuleto do Destino',
  'Amuleto da Alvorada', 'Amuleto do Crepúsculo', 'Amuleto da Meia-Noite',
  'Amuleto do Sol', 'Amuleto da Lua', 'Amuleto das Estrelas',
  'Amuleto do Vento', 'Amuleto da Tempestade', 'Amuleto do Trovão',
  'Amuleto de Poder Superior', 'Amuleto de Proteção Total', 'Amuleto de Vida Eterna',
];

// ============================================================
// POÇÕES
// ============================================================
const POCOES = [
  'Poção de Vida Pequena', 'Poção de Vida Média', 'Poção de Vida Grande',
  'Poção de Vida Extrema', 'Poção de Vida Suprema', 'Poção de Vida Perfeita',
  'Poção de Vida Renovadora', 'Poção de Vida Forte', 'Poção de Vida Poderosa',
  'Poção de Mana Pequena', 'Poção de Mana Média', 'Poção de Mana Grande',
  'Poção de Mana Extrema', 'Poção de Mana Suprema', 'Poção de Mana Perfeita',
  'Poção de Mana Renovadora', 'Poção de Mana Forte', 'Poção de Mana Poderosa',
  'Poção de Energia', 'Poção de Força', 'Poção de Inteligência',
  'Poção de Destreza', 'Poção de Agilidade', 'Poção de Velocidade',
  'Poção de Regeneração', 'Poção de Invisibilidade', 'Poção de Resistência',
  'Poção de Vitalidade', 'Poção de Poder', 'Poção de Sabedoria',
  'Poção de Proteção', 'Poção de Defesa', 'Poção de Ataque',
  'Poção de Cura', 'Poção de Restauração', 'Poção de Fogo',
  'Poção de Gelo', 'Poção de Luz', 'Poção de Sombra',
  'Poção de Veneno', 'Poção de Sangue', 'Poção de Guerra',
  'Poção de Batalha', 'Poção do Herói', 'Poção do Lendário',
  'Poção do Mago', 'Poção do Arcano', 'Poção do Elemental',
  'Poção do Caos', 'Poção de Transformação', 'Poção de Metamorfose',
  'Poção de Ilusão', 'Poção de Fantasma', 'Poção de Voo',
  'Poção de Respiração', 'Poção de Visão', 'Poção de Escuridão',
  'Poção de Luz Divina', 'Poção de Sombra Eterna', 'Poção de Fogo Infernal',
  'Poção de Gelo Eterno', 'Poção de Energia Pura', 'Poção de Veneno Mortal',
  'Poção de Sangue do Dragão', 'Poção de Poder Supremo',
];

// ============================================================
// RUNAS
// ============================================================
const RUNAS = [
  'Runa de Fogo', 'Runa de Gelo', 'Runa de Energia',
  'Runa de Terra', 'Runa de Vento', 'Runa de Luz',
  'Runa de Sombra', 'Runa de Explosão', 'Runa de Cura',
  'Runa de Proteção', 'Runa de Poder', 'Runa de Vida',
  'Runa de Mana', 'Runa de Força', 'Runa de Destreza',
  'Runa de Agilidade', 'Runa de Velocidade', 'Runa de Regeneração',
  'Runa de Invisibilidade', 'Runa de Resistência', 'Runa de Veneno',
  'Runa de Sangue', 'Runa de Guerra', 'Runa de Batalha',
  'Runa do Herói', 'Runa do Lendário', 'Runa do Mago',
  'Runa do Arcano', 'Runa do Elemental', 'Runa do Caos',
  'Runa de Fogo Grande', 'Runa de Gelo Grande', 'Runa de Energia Grande',
  'Runa de Terra Grande', 'Runa de Vento Grande', 'Runa de Luz Grande',
  'Runa de Sombra Grande', 'Runa de Explosão Grande', 'Runa de Cura Grande',
  'Runa de Proteção Grande', 'Runa de Poder Grande', 'Runa de Vida Grande',
  'Runa de Mana Grande', 'Runa de Força Grande', 'Runa de Destreza Grande',
  'Runa de Fogo Suprema', 'Runa de Gelo Suprema', 'Runa de Energia Suprema',
  'Runa do Dragão', 'Runa do Demonio', 'Runa do Anjo',
  'Runa do Rei', 'Runa do Trono', 'Runa do Destino',
  'Runa da Alvorada', 'Runa do Crepúsculo', 'Runa da Meia-Noite',
  'Runa do Sol', 'Runa da Lua', 'Runa das Estrelas',
  'Runa do Vento', 'Runa da Tempestade', 'Runa do Trovão',
  'Runa do Relâmpago', 'Runa do Oceano', 'Runa do Deserto',
  'Runa da Floresta', 'Runa das Montanhas', 'Runa do Caos',
];

// ============================================================
// MUNIÇÃO
// ============================================================
const MUNICAO = [
  'Flecha', 'Flecha de Ferro', 'Flecha de Aço',
  'Flecha de Mithril', 'Flecha de Dragão', 'Flecha de Cristal',
  'Flecha de Fogo', 'Flecha de Gelo', 'Flecha de Energia',
  'Flecha de Luz', 'Flecha de Sombra', 'Flecha de Veneno',
  'Flecha de Sangue', 'Flecha de Guerra', 'Flecha de Batalha',
  'Flecha do Herói', 'Flecha do Lendário', 'Flecha do Paladino',
  'Flecha de Fogo Grande', 'Flecha de Gelo Grande', 'Flecha de Energia Grande',
  'Flecha de Luz Grande', 'Flecha de Sombra Grande', 'Flecha de Veneno Grande',
  'Flecha do Dragão', 'Flecha do Demonio', 'Flecha do Anjo',
  'Flecha do Caos', 'Flecha da Tempestade', 'Flecha do Trovão',
  'Flecha do Relâmpago', 'Flecha do Vento', 'Flecha do Oceano',
  'Bolt', 'Bolt de Ferro', 'Bolt de Aço',
  'Bolt de Mithril', 'Bolt de Dragão', 'Bolt de Cristal',
  'Bolt de Fogo', 'Bolt de Gelo', 'Bolt de Energia',
  'Bolt de Luz', 'Bolt de Sombra', 'Bolt de Veneno',
  'Bolt de Sangue', 'Bolt de Guerra', 'Bolt de Batalha',
  'Bolt do Herói', 'Bolt do Lendário', 'Bolt do Paladino',
  'Bolt de Fogo Grande', 'Bolt de Gelo Grande', 'Bolt de Energia Grande',
  'Bolt do Dragão', 'Bolt do Demonio', 'Bolt do Anjo',
  'Bolt do Caos', 'Bolt da Tempestade', 'Bolt do Trovão',
];

// ============================================================
// FERRAMENTAS
// ============================================================
const FERRAMENTAS = [
  'Machado de Madeira', 'Picareta', 'Enxada',
  'Pá', 'Corda', 'Lanterna',
  'Tocha', 'Fósforo', 'Isqueiro',
  'Faca de Caça', 'Faca de Sobrevivência', 'Canivete',
  'Picareta de Ferro', 'Picareta de Aço', 'Picareta de Mithril',
  'Picareta de Dragão', 'Picareta de Cristal', 'Picareta de Fogo',
  'Enxada de Ferro', 'Enxada de Aço', 'Enxada de Mithril',
  'Pá de Ferro', 'Pá de Aço', 'Pá de Mithril',
  'Corda de Seda', 'Corda de Couro', 'Corda de Ferro',
  'Lanterna de Ferro', 'Lanterna de Cristal', 'Lanterna de Fogo',
  'Tocha de Ferro', 'Tocha de Aço', 'Tocha de Mithril',
  'Machado de Ferro', 'Machado de Aço', 'Machado de Mithril',
  'Machado de Dragão', 'Machado de Cristal', 'Machado de Fogo',
  'Martelo de Ferreiro', 'Martelo de Ourives', 'Martelo de Fundição',
  'Alicate', 'Tenaz', 'Grampo',
  'Cunha', 'Cunha de Ferro', 'Cunha de Aço',
  'Serra', 'Serra de Ferro', 'Serra de Aço',
  'Lima', 'Lima de Ferro', 'Lima de Aço',
  'Broca', 'Broca de Ferro', 'Broca de Aço',
  'Esmeril', 'Esmeril de Ferro', 'Esmeril de Aço',
];

// ============================================================
// CONTAINERS
// ============================================================
const CONTAINERS = [
  'Bolsa', 'Bolsa de Couro', 'Bolsa de Viagem',
  'Bolsa de Ferro', 'Bolsa de Aço', 'Bolsa de Mithril',
  'Bolsa de Dragão', 'Bolsa de Cristal', 'Bolsa de Seda',
  'Mochila', 'Mochila de Couro', 'Mochila de Viagem',
  'Mochila de Ferro', 'Mochila de Aço', 'Mochila de Mithril',
  'Mochila de Dragão', 'Mochila de Cristal', 'Mochila de Seda',
  'Mochila Grande', 'Mochila de Viagem Grande', 'Mochila de Aventura',
  'Mochila de Explorador', 'Mochila de Guerreiro', 'Mochila de Mago',
  'Baú', 'Baú de Ferro', 'Baú de Aço',
  'Baú de Mithril', 'Baú de Dragão', 'Baú de Cristal',
  'Baú de Ouro', 'Baú de Prata', 'Baú de Platina',
  'Caixa', 'Caixa de Ferro', 'Caixa de Aço',
  'Caixa de Mithril', 'Caixa de Dragão', 'Caixa de Cristal',
  'Cesto', 'Cesto de Ferro', 'Cesto de Aço',
  'Cesto de Mithril', 'Cesto de Dragão', 'Cesto de Cristal',
  'Saco', 'Saco de Couro', 'Saco de Ferro',
  'Saco de Aço', 'Saco de Mithril', 'Saco de Dragão',
  'Saco de Cristal', 'Saco de Seda', 'Saco de Viagem',
  'Alforje', 'Alforje de Couro', 'Alforje de Ferro',
  'Alforje de Aço', 'Alforje de Mithril', 'Alforje de Dragão',
  'Arca', 'Arca de Ferro', 'Arca de Aço',
  'Arca de Mithril', 'Arca de Dragão', 'Arca de Cristal',
  'Cofre', 'Cofre de Ferro', 'Cofre de Aço',
  'Cofre de Mithril', 'Cofre de Dragão', 'Cofre de Cristal',
];

// ============================================================
// COMIDA
// ============================================================
const COMIDA = [
  'Carne', 'Carne Assada', 'Carne Grelhada',
  'Carne de Porco', 'Carne de Vaca', 'Carne de Frango',
  'Carne de Peixe', 'Carne de Dragão', 'Carne de Demonio',
  'Carne de Lobo', 'Carne de Urso', 'Carne de Veado',
  'Carne de Coelho', 'Carne de Pato', 'Carne de Peru',
  'Carne de Cordeiro', 'Carne de Cabra', 'Carne de Ovelha',
  'Pão', 'Pão de Centeio', 'Pão Integral',
  'Pão de Mel', 'Pão de Queijo', 'Pão de Alho',
  'Pão de Milho', 'Pão de Trigo', 'Pão de Cevada',
  'Queijo', 'Queijo Fresco', 'Queijo Curado',
  'Queijo de Cabra', 'Queijo de Ovelha', 'Queijo de Vaca',
  'Queijo Azul', 'Queijo Brie', 'Queijo Camembert',
  'Queijo Gouda', 'Queijo Emmental', 'Queijo Parmesão',
  'Leite', 'Leite Fresco', 'Leite de Cabra',
  'Leite de Ovelha', 'Leite de Vaca', 'Leite de Búfala',
  'Mel', 'Mel de Abelha', 'Mel de Flores',
  'Mel Silvestre', 'Mel de Eucalipto', 'Mel de Laranjeira',
  'Peixe', 'Peixe Fresco', 'Peixe Grelhado',
  'Peixe Assado', 'Peixe Salgado', 'Peixe Defumado',
  'Salmão', 'Truta', 'Atum',
  'Bacalhau', 'Sardinha', 'Anchova',
  'Maçã', 'Pêra', 'Uva',
  'Laranja', 'Limão', 'Banana',
  'Manga', 'Abacaxi', 'Melancia',
  'Melão', 'Morango', 'Cereja',
  'Pêssego', 'Ameixa', 'Damasco',
  'Castanha', 'Noz', 'Amêndoa',
  'Avelã', 'Pistache', 'Caju',
  'Bolo', 'Bolo de Chocolate', 'Bolo de Baunilha',
  'Torta', 'Torta de Maçã', 'Torta de Limão',
  'Sorvete', 'Sorvete de Chocolate', 'Sorvete de Baunilha',
  'Pudim', 'Pudim de Leite', 'Pudim de Chocolate',
  'Brigadeiro', 'Beijinho', 'Cajuzinho',
  'Quindim', 'Pavê', 'Panetone',
];

// ============================================================
// IMBUEMENT (Essências)
// ============================================================
const IMBUEMENT = [
  'Essência de Fogo', 'Essência de Gelo', 'Essência de Energia',
  'Essência de Terra', 'Essência de Vento', 'Essência de Luz',
  'Essência de Sombra', 'Essência de Vida', 'Essência de Mana',
  'Essência de Força', 'Essência de Destreza', 'Essência de Agilidade',
  'Essência de Velocidade', 'Essência de Regeneração', 'Essência de Proteção',
  'Essência de Poder', 'Essência de Veneno', 'Essência de Sangue',
  'Essência de Guerra', 'Essência de Batalha', 'Essência do Herói',
  'Essência do Lendário', 'Essência do Mago', 'Essência do Arcano',
  'Essência do Elemental', 'Essência do Caos', 'Essência de Cristal',
  'Essência de Dragão', 'Essência de Demonio', 'Essência de Anjo',
  'Essência de Fogo Grande', 'Essência de Gelo Grande', 'Essência de Energia Grande',
  'Essência de Terra Grande', 'Essência de Vento Grande', 'Essência de Luz Grande',
  'Essência de Sombra Grande', 'Essência de Vida Grande', 'Essência de Mana Grande',
  'Essência de Fogo Suprema', 'Essência de Gelo Suprema', 'Essência de Energia Suprema',
  'Essência de Terra Suprema', 'Essência de Vento Suprema', 'Essência de Luz Suprema',
  'Essência de Sombra Suprema', 'Essência de Vida Suprema', 'Essência de Mana Suprema',
];

// ============================================================
// MINÉRIOS
// ============================================================
const MINEIROS = [
  'Minério de Ferro', 'Minério de Bronze', 'Minério de Aço',
  'Minério de Mithril', 'Minério de Dragão', 'Minério de Ouro',
  'Minério de Prata', 'Minério de Cobre', 'Minério de Estanho',
  'Minério de Platina', 'Minério de Cristal', 'Minério de Diamante',
  'Minério de Safira', 'Minério de Rubi', 'Minério de Esmeralda',
  'Minério de Ametista', 'Minério de Topázio', 'Minério de Quartzo',
  'Minério de Ferro Puro', 'Minério de Aço Puro', 'Minério de Mithril Puro',
  'Minério de Dragão Puro', 'Minério de Ouro Puro', 'Minério de Prata Puro',
  'Minério de Platina Puro', 'Minério de Cristal Puro', 'Minério de Diamante Puro',
  'Minério de Chumbo', 'Minério de Zinco', 'Minério de Níquel',
  'Minério de Cobalto', 'Minério de Manganês', 'Minério de Tungstênio',
  'Minério de Titânio', 'Minério de Vanádio', 'Minério de Cromo',
  'Minério de Molibdênio', 'Minério de Tântalo', 'Minério de Niobe',
];

// ============================================================
// MOEDAS
// ============================================================
const MOEDAS = [
  'Moeda de Ouro', 'Moeda de Prata', 'Moeda de Cobre',
  'Moeda de Platina', 'Moeda de Cristal', 'Moeda de Dragão',
  'Moeda de Diamante', 'Moeda de Safira', 'Moeda de Rubi',
  'Moeda de Esmeralda', 'Moeda de Ametista', 'Moeda de Topázio',
  'Moeda de Ouro Grande', 'Moeda de Prata Grande', 'Moeda de Platina Grande',
  'Moeda de Cristal Grande', 'Moeda de Dragão Grande', 'Moeda de Diamante Grande',
  'Moeda de Safira Grande', 'Moeda de Rubi Grande', 'Moeda de Esmeralda Grande',
  'Moeda de Ouro Puro', 'Moeda de Prata Pura', 'Moeda de Platina Pura',
  'Moeda de Cristal Puro', 'Moeda de Dragão Puro', 'Moeda de Diamante Puro',
  'Moeda de Bronze', 'Moeda de Níquel', 'Moeda de Cobalto',
  'Moeda do Rei', 'Moeda da Rainha', 'Moeda do Império',
  'Moeda do Reino', 'Moeda da Coroa', 'Moeda do Trono',
];

// ============================================================
// MISCELÂNEA
// ============================================================
const MISC = [
  'Pergaminho', 'Pergaminho de Magia', 'Pergaminho de Proteção',
  'Pergaminho de Poder', 'Pergaminho de Sabedoria', 'Pergaminho de Conhecimento',
  'Pergaminho de Cura', 'Pergaminho de Força', 'Pergaminho de Destreza',
  'Pergaminho de Agilidade', 'Pergaminho de Velocidade', 'Pergaminho de Regeneração',
  'Pergaminho de Invisibilidade', 'Pergaminho de Resistência', 'Pergaminho de Veneno',
  'Pergaminho de Fogo', 'Pergaminho de Gelo', 'Pergaminho de Energia',
  'Livro', 'Livro de Magia', 'Livro de Poções',
  'Livro de Runas', 'Livro de Imbuement', 'Livro de Receitas',
  'Livro de Encantamentos', 'Livro de Feitiços', 'Livro de Maldições',
  'Livro de Bênçãos', 'Livro de Profecias', 'Livro de Lendas',
  'Livro de História', 'Livro de Geografia', 'Livro de Bestiário',
  'Chave', 'Chave de Ferro', 'Chave de Aço',
  'Chave de Mithril', 'Chave de Dragão', 'Chave de Cristal',
  'Chave de Ouro', 'Chave de Prata', 'Chave de Platina',
  'Chave do Tesouro', 'Chave do Cofre', 'Chave do Baú',
  'Chave da Masmorra', 'Chave da Torre', 'Chave do Castelo',
  'Cadeado', 'Cadeado de Ferro', 'Cadeado de Aço',
  'Cadeado de Mithril', 'Cadeado de Dragão', 'Cadeado de Cristal',
  'Bússola', 'Mapa', 'Mapa do Tesouro',
  'Mapa da Caverna', 'Mapa da Masmorra', 'Mapa do Labirinto',
  'Mapa do Mundo', 'Mapa do Reino', 'Mapa do Império',
  'Lupa', 'Telescópio', 'Binóculo',
  'Microscópio', 'Periscópio', 'Caleidoscópio',
  'Relógio', 'Relógio de Areia', 'Relógio de Sol',
  'Relógio de Lua', 'Relógio de Estrelas', 'Relógio de Vento',
  'Balança', 'Pesos', 'Medidas',
  'Garrafa', 'Garrafa de Água', 'Garrafa de Vinho',
  'Garrafa de Cerveja', 'Garrafa de Licor', 'Garrafa de Veneno',
  'Garrafa de Poção', 'Garrafa de Essência', 'Garrafa de Óleo',
  'Vidro', 'Vidro de Poção', 'Vidro de Essência',
  'Vidro de Cristal', 'Vidro de Diamante', 'Vidro de Safira',
  'Tecido', 'Tecido de Seda', 'Tecido de Couro',
  'Tecido de Linho', 'Tecido de Algodão', 'Tecido de Lã',
  'Tecido de Veludo', 'Tecido de Cetim', 'Tecido de Brocado',
  'Tecido de Camurça', 'Tecido de Microfibra', 'Tecido de Nylon',
];

// ============================================================
// JUNTAR TODOS OS ITENS
// ============================================================
const HUNTERA_ITEMS = {
  armas: ARMAS,
  escudos: ESCUDOS,
  armaduras: ARMADURAS,
  capacetes: CAPACETES,
  botas: BOTAS,
  aneis: ANEIS,
  amuletos: AMULETOS,
  pocoes: POCOES,
  runas: RUNAS,
  municao: MUNICAO,
  ferramentas: FERRAMENTAS,
  containers: CONTAINERS,
  comida: COMIDA,
  imbuement: IMBUEMENT,
  mineiros: MINEIROS,
  moedas: MOEDAS,
  misc: MISC,
};

// ============================================================
// LISTA PLANA DE TODOS OS ITENS
// ============================================================
const ALL_ITEMS = [];
for (const category in HUNTERA_ITEMS) {
  ALL_ITEMS.push(...HUNTERA_ITEMS[category]);
}

// ============================================================
// ITENS COMUMENTE BLOQUEADOS
// ============================================================
const COMMON_BLOCKED_ITEMS = [
  'Poção de Vida Pequena',
  'Poção de Vida Média',
  'Poção de Mana Pequena',
  'Poção de Mana Média',
  'Poção de Regeneração',
  'Poção de Cura',
  'Carne',
  'Carne Assada',
  'Pão',
  'Queijo',
  'Leite',
  'Mel',
  'Peixe',
  'Peixe Grelhado',
  'Flecha',
  'Bolt',
  'Runa de Cura',
  'Tocha',
  'Lanterna',
  'Corda',
  'Pergaminho',
  'Livro',
  'Garrafa',
  'Garrafa de Água',
  'Vidro',
  'Tecido',
];

// ============================================================
// FUNÇÕES AUXILIARES (APENAS UMA VEZ)
// ============================================================
function getItemsByCategory(category) {
  return HUNTERA_ITEMS[category] || [];
}

function getCategories() {
  return Object.keys(HUNTERA_ITEMS);
}

function searchItems(query) {
  if (!query || query.length === 0) {
    return [];
  }
  const searchTerm = query.trim().toLowerCase();
  if (searchTerm.length === 0) {
    return [];
  }
  return ALL_ITEMS.filter(item => item.toLowerCase().includes(searchTerm));
}

function searchItemsInCategory(query, category) {
  if (!query || query.length === 0) {
    return [];
  }
  const searchTerm = query.trim().toLowerCase();
  const items = HUNTERA_ITEMS[category] || [];
  return items.filter(item => item.toLowerCase().includes(searchTerm));
}

function autocompleteItems(query, limit = 20) {
  if (!query || query.length === 0) {
    return [];
  }
  const searchTerm = query.trim().toLowerCase();
  const results = ALL_ITEMS.filter(item => item.toLowerCase().includes(searchTerm));
  return results.slice(0, limit);
}

function getCommonBlocked() {
  return COMMON_BLOCKED_ITEMS;
}

function getAllItemsCount() {
  return ALL_ITEMS.length;
}

function getCategoryCount(category) {
  return (HUNTERA_ITEMS[category] || []).length;
}

function getItemCountByCategory() {
  const counts = {};
  for (const category in HUNTERA_ITEMS) {
    counts[category] = HUNTERA_ITEMS[category].length;
  }
  return counts;
}

// ============================================================
// EXPORTA PARA USO GLOBAL
// ============================================================
window.HUNTERA_ITEMS = HUNTERA_ITEMS;
window.ALL_ITEMS = ALL_ITEMS;
window.COMMON_BLOCKED_ITEMS = COMMON_BLOCKED_ITEMS;
window.getItemsByCategory = getItemsByCategory;
window.getCategories = getCategories;
window.searchItems = searchItems;
window.searchItemsInCategory = searchItemsInCategory;
window.autocompleteItems = autocompleteItems;
window.getCommonBlocked = getCommonBlocked;
window.getAllItemsCount = getAllItemsCount;
window.getCategoryCount = getCategoryCount;
window.getItemCountByCategory = getItemCountByCategory;

// ============================================================
// LOG DE CARREGAMENTO
// ============================================================
console.log('📦 ========================================');
console.log('📦 HUNTERA ITEMS - LISTA COMPLETA');
console.log('📦 ========================================');
console.log(`📦 Total de itens: ${ALL_ITEMS.length}`);
console.log(`📦 Categorias: ${Object.keys(HUNTERA_ITEMS).length}`);
for (const category in HUNTERA_ITEMS) {
  console.log(`   📂 ${category}: ${HUNTERA_ITEMS[category].length} itens`);
}
console.log('📦 ========================================');
console.log('📦 Items carregados com sucesso!');
console.log('📦 Use window.ALL_ITEMS para acessar a lista completa.');
console.log('📦 Use window.searchItems("termo") para buscar itens.');
console.log('📦 Use window.autocompleteItems("termo") para autocomplete.');
console.log('📦 ========================================');