// MongoDB Script to Populate Film Catalog Database
// Run with: mongosh Filmes populate-database.js

// Clear existing data
db.filmes.deleteMany({});
db.usuarios.deleteMany({});
db.avaliacoes.deleteMany({});
db.favoritos.deleteMany({});

print("🗑️  Existing data cleared");

// Insert Movies
const filmes = [
  {
    titulo: "O Poderoso Chefão",
    imagemUrl: "https://exemplo.com/poderoso-chefao.jpg",
    ano: 1972,
    generos: ["Drama", "Crime"],
    sinopse: "Uma família mafiosa luta para estabelecer sua supremacia nos Estados Unidos após a Segunda Guerra Mundial."
  },
  {
    titulo: "Happy Gilmore",
    imagemUrl: "https://exemplo.com/happy-gilmore.jpg",
    ano: 1996,
    generos: ["Comédia", "Esporte"],
    sinopse: "Um jogador de hóquei fracassado descobre que tem talento para golfe e tenta se tornar profissional."
  },
  {
    titulo: "O Iluminado",
    imagemUrl: "https://exemplo.com/iluminado.jpg",
    ano: 1980,
    generos: ["Terror", "Drama"],
    sinopse: "Um escritor e sua família se hospedam em um hotel isolado durante o inverno, onde uma presença maligna influencia o pai."
  },
  {
    titulo: "Silverado",
    imagemUrl: "https://exemplo.com/silverado.jpg",
    ano: 1985,
    generos: ["Western", "Ação"],
    sinopse: "Quatro estranhos se unem para enfrentar um xerife corrupto e seus homens em uma cidade do Velho Oeste."
  },
  {
    titulo: "O Senhor dos Anéis: A Sociedade do Anel",
    imagemUrl: "https://exemplo.com/lotr.jpg",
    ano: 2001,
    generos: ["Fantasia", "Aventura"],
    sinopse: "Um hobbit recebe a missão de destruir um anel poderoso que pode salvar ou destruir a Terra-média."
  },
  {
    titulo: "Heat",
    imagemUrl: "https://exemplo.com/heat.jpg",
    ano: 1995,
    generos: ["Crime", "Drama"],
    sinopse: "Um detetive da polícia de Los Angeles persegue um ladrão de bancos profissional e sua equipe."
  },
  {
    titulo: "Cidade de Deus",
    imagemUrl: "https://exemplo.com/cidade-deus.jpg",
    ano: 2002,
    generos: ["Drama", "Crime", "Nacional"],
    sinopse: "A história de dois jovens que crescem em uma favela do Rio de Janeiro e seguem caminhos diferentes na vida."
  },
  {
    titulo: "Central do Brasil",
    imagemUrl: "https://exemplo.com/central-brasil.jpg",
    ano: 1998,
    generos: ["Drama", "Nacional"],
    sinopse: "Uma professora aposentada ajuda um menino a encontrar seu pai em uma jornada pelo Nordeste brasileiro."
  },
  {
    titulo: "Tropa de Elite",
    imagemUrl: "https://exemplo.com/tropa-elite.jpg",
    ano: 2007,
    generos: ["Ação", "Drama", "Nacional"],
    sinopse: "A história de um capitão do BOPE que luta contra o tráfico de drogas nas favelas do Rio de Janeiro."
  },
  {
    titulo: "O Auto da Compadecida",
    imagemUrl: "https://exemplo.com/auto-compadecida.jpg",
    ano: 2000,
    generos: ["Comédia", "Drama", "Nacional"],
    sinopse: "As aventuras de João Grilo e Chicó, dois nordestinos pobres que vivem de golpes para sobreviver."
  },
  {
    titulo: "Carandiru",
    imagemUrl: "https://exemplo.com/carandiru.jpg",
    ano: 2003,
    generos: ["Drama", "Crime", "Nacional"],
    sinopse: "Baseado na história real do médico Dráuzio Varella e sua experiência na Casa de Detenção de São Paulo."
  },
  {
    titulo: "Pulp Fiction",
    imagemUrl: "https://exemplo.com/pulp-fiction.jpg",
    ano: 1994,
    generos: ["Crime", "Drama"],
    sinopse: "Várias histórias entrelaçadas de criminosos em Los Angeles, incluindo dois assassinos, um boxeador e uma esposa de gangster."
  },
  {
    titulo: "Forrest Gump",
    imagemUrl: "https://exemplo.com/forrest-gump.jpg",
    ano: 1994,
    generos: ["Drama", "Comédia"],
    sinopse: "A história de um homem simples que viveu momentos extraordinários da história americana."
  },
  {
    titulo: "Matrix",
    imagemUrl: "https://exemplo.com/matrix.jpg",
    ano: 1999,
    generos: ["Ficção Científica", "Ação"],
    sinopse: "Um programador descobre que a realidade como conhecemos é uma simulação criada por máquinas."
  },
  {
    titulo: "Titanic",
    imagemUrl: "https://exemplo.com/titanic.jpg",
    ano: 1997,
    generos: ["Drama", "Romance"],
    sinopse: "Uma história de amor entre um artista pobre e uma jovem rica a bordo do navio que afundou em 1912."
  },
  {
    titulo: "Jurassic Park",
    imagemUrl: "https://exemplo.com/jurassic-park.jpg",
    ano: 1993,
    generos: ["Aventura", "Ficção Científica"],
    sinopse: "Um parque temático com dinossauros clonados se torna uma armadilha mortal quando os animais escapam."
  },
  {
    titulo: "Interestelar",
    imagemUrl: "https://exemplo.com/interstellar.jpg",
    ano: 2014,
    generos: ["Ficção Científica", "Drama"],
    sinopse: "Uma equipe de exploradores viaja através de um buraco de minhoca no espaço para encontrar um novo lar para a humanidade."
  },
  {
    titulo: "O Rei Leão",
    imagemUrl: "https://exemplo.com/rei-leao.jpg",
    ano: 1994,
    generos: ["Animação", "Aventura"],
    sinopse: "Um jovem leão deve enfrentar seu passado e assumir seu lugar como rei das terras do reino."
  },
  {
    titulo: "Vingadores: Ultimato",
    imagemUrl: "https://exemplo.com/vingadores.jpg",
    ano: 2019,
    generos: ["Ação", "Aventura"],
    sinopse: "Os Vingadores se reúnem mais uma vez para reverter as ações de Thanos e restaurar o equilíbrio do universo."
  },
  {
    titulo: "Parasita",
    imagemUrl: "https://exemplo.com/parasita.jpg",
    ano: 2019,
    generos: ["Drama", "Suspense"],
    sinopse: "Uma família pobre se infiltra na casa de uma família rica, criando uma situação inesperada e perigosa."
  }
];

const filmesResult = db.filmes.insertMany(filmes);
print(`🎬 ${filmesResult.insertedIds.length} filmes inseridos`);

// Insert Users
const usuarios = [
  {
    nome: "Admin",
    email: "admin@filmes.com",
    senha: "admin123",
    isAdmin: true
  },
  {
    nome: "Teste",
    email: "teste@filmes.com",
    senha: "admin123",
    isAdmin: false
  },
  {
    nome: "Ryder",
    email: "ryder@filmes.com",
    senha: "admin123",
    isAdmin: false
  },
  {
    nome: "Colton White",
    email: "colton@filmes.com",
    senha: "admin123",
    isAdmin: false
  },
  {
    nome: "Maria Silva",
    email: "maria@filmes.com",
    senha: "admin123",
    isAdmin: false
  },
  {
    nome: "João Santos",
    email: "joao@filmes.com",
    senha: "admin123",
    isAdmin: false
  },
  {
    nome: "Ana Costa",
    email: "ana@filmes.com",
    senha: "admin123",
    isAdmin: false
  },
  {
    nome: "Pedro Oliveira",
    email: "pedro@filmes.com",
    senha: "admin123",
    isAdmin: false
  }
];

const usuariosResult = db.usuarios.insertMany(usuarios);
print(`👥 ${usuariosResult.insertedIds.length} usuários inseridos`);

// Get inserted IDs for reference
const filmeIds = Object.values(filmesResult.insertedIds);
const usuarioIds = Object.values(usuariosResult.insertedIds);

// Insert Reviews
const avaliacoes = [
  // Reviews for "O Poderoso Chefão"
  {
    autor: "João Santos",
    nota: 5,
    comentario: "Um dos melhores filmes já feitos! A atuação de Marlon Brando é simplesmente incrível.",
    filmeId: filmeIds[0].toString()
  },
  {
    autor: "Maria Silva",
    nota: 5,
    comentario: "Clássico absoluto. A narrativa e a direção são perfeitas.",
    filmeId: filmeIds[0].toString()
  },
  {
    autor: "Ana Costa",
    nota: 4,
    comentario: "Excelente filme, mas um pouco longo. Vale muito a pena assistir.",
    filmeId: filmeIds[0].toString()
  },
  
  // Reviews for "Happy Gilmore"
  {
    autor: "Pedro Oliveira",
    nota: 4,
    comentario: "Muito engraçado! Adam Sandler no seu melhor.",
    filmeId: filmeIds[1].toString()
  },
  {
    autor: "Ryder",
    nota: 3,
    comentario: "Divertido, mas não é o melhor do Sandler.",
    filmeId: filmeIds[1].toString()
  },
  
  // Reviews for "O Iluminado"
  {
    autor: "Colton White",
    nota: 5,
    comentario: "Aterrorizante! Jack Nicholson está fenomenal neste papel.",
    filmeId: filmeIds[2].toString()
  },
  {
    autor: "Maria Silva",
    nota: 4,
    comentario: "Um dos melhores filmes de terror de todos os tempos.",
    filmeId: filmeIds[2].toString()
  },
  
  // Reviews for "Cidade de Deus"
  {
    autor: "João Santos",
    nota: 5,
    comentario: "Filme brasileiro incrível! Retrato realista e impactante.",
    filmeId: filmeIds[6].toString()
  },
  {
    autor: "Ana Costa",
    nota: 5,
    comentario: "Obra-prima do cinema brasileiro. Direção e atuações excepcionais.",
    filmeId: filmeIds[6].toString()
  },
  {
    autor: "Pedro Oliveira",
    nota: 4,
    comentario: "Filme forte e realista. Muito bem feito.",
    filmeId: filmeIds[6].toString()
  },
  
  // Reviews for "Matrix"
  {
    autor: "Ryder",
    nota: 5,
    comentario: "Revolucionário! Mudou o cinema de ação para sempre.",
    filmeId: filmeIds[12].toString()
  },
  {
    autor: "Colton White",
    nota: 5,
    comentario: "Inovador e espetacular. Os efeitos especiais são incríveis.",
    filmeId: filmeIds[12].toString()
  },
  {
    autor: "João Santos",
    nota: 4,
    comentario: "Excelente filme de ficção científica.",
    filmeId: filmeIds[12].toString()
  },
  
  // Reviews for "O Auto da Compadecida"
  {
    autor: "Maria Silva",
    nota: 5,
    comentario: "Humor brasileiro no seu melhor! Muito engraçado e inteligente.",
    filmeId: filmeIds[9].toString()
  },
  {
    autor: "Ana Costa",
    nota: 5,
    comentario: "Clássico do cinema brasileiro. Matheus Nachtergaele está perfeito.",
    filmeId: filmeIds[9].toString()
  },
  
  // Reviews for "Interestelar"
  {
    autor: "Pedro Oliveira",
    nota: 5,
    comentario: "Filme incrível! A ciência e a emoção se misturam perfeitamente.",
    filmeId: filmeIds[16].toString()
  },
  {
    autor: "Ryder",
    nota: 4,
    comentario: "Muito bom, mas um pouco confuso em algumas partes.",
    filmeId: filmeIds[16].toString()
  },
  
  // Reviews for "Parasita"
  {
    autor: "Colton White",
    nota: 5,
    comentario: "Filme sul-coreano excepcional! Mereceu o Oscar.",
    filmeId: filmeIds[19].toString()
  },
  {
    autor: "João Santos",
    nota: 5,
    comentario: "Narrativa brilhante e comentário social poderoso.",
    filmeId: filmeIds[19].toString()
  }
];

const avaliacoesResult = db.avaliacoes.insertMany(avaliacoes);
print(`⭐ ${avaliacoesResult.insertedIds.length} avaliações inseridas`);

// Insert Favorites
const favoritos = [
  // User 1 favorites
  { userId: "admin@filmes.com", filmeId: filmeIds[0].toString() },
  { userId: "admin@filmes.com", filmeId: filmeIds[6].toString() },
  { userId: "admin@filmes.com", filmeId: filmeIds[12].toString() },
  
  // User 2 favorites
  { userId: "teste@filmes.com", filmeId: filmeIds[1].toString() },
  { userId: "teste@filmes.com", filmeId: filmeIds[9].toString() },
  { userId: "teste@filmes.com", filmeId: filmeIds[16].toString() },
  
  // User 3 favorites
  { userId: "ryder@filmes.com", filmeId: filmeIds[2].toString() },
  { userId: "ryder@filmes.com", filmeId: filmeIds[12].toString() },
  { userId: "ryder@filmes.com", filmeId: filmeIds[19].toString() },
  
  // User 4 favorites
  { userId: "colton@filmes.com", filmeId: filmeIds[0].toString() },
  { userId: "colton@filmes.com", filmeId: filmeIds[6].toString() },
  { userId: "colton@filmes.com", filmeId: filmeIds[9].toString() },
  
  // User 5 favorites
  { userId: "maria@filmes.com", filmeId: filmeIds[2].toString() },
  { userId: "maria@filmes.com", filmeId: filmeIds[9].toString() },
  { userId: "maria@filmes.com", filmeId: filmeIds[16].toString() },
  
  // User 6 favorites
  { userId: "joao@filmes.com", filmeId: filmeIds[0].toString() },
  { userId: "joao@filmes.com", filmeId: filmeIds[6].toString() },
  { userId: "joao@filmes.com", filmeId: filmeIds[12].toString() },
  
  // User 7 favorites
  { userId: "ana@filmes.com", filmeId: filmeIds[0].toString() },
  { userId: "ana@filmes.com", filmeId: filmeIds[9].toString() },
  { userId: "ana@filmes.com", filmeId: filmeIds[19].toString() },
  
  // User 8 favorites
  { userId: "pedro@filmes.com", filmeId: filmeIds[1].toString() },
  { userId: "pedro@filmes.com", filmeId: filmeIds[16].toString() },
  { userId: "pedro@filmes.com", filmeId: filmeIds[12].toString() }
];

const favoritosResult = db.favoritos.insertMany(favoritos);
print(`❤️ ${favoritosResult.insertedIds.length} favoritos inseridos`);

// Summary
print("\n📊 RESUMO DA POPULAÇÃO:");
print(`🎬 Filmes: ${db.filmes.countDocuments()}`);
print(`👥 Usuários: ${db.usuarios.countDocuments()}`);
print(`⭐ Avaliações: ${db.avaliacoes.countDocuments()}`);
print(`❤️ Favoritos: ${db.favoritos.countDocuments()}`);

print("\n✅ Banco de dados populado com sucesso!");
print("🔑 Senha para todos os usuários: admin123");
print("👤 Admin: admin@filmes.com");
print("🧪 Teste: teste@filmes.com"); 