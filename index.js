const nomeEmpresa = "Sistema Omma";
console.log(nomeEmpresa);

const listaDeReceitas = [
    {
        id: 1,
        titulo: "Cachorro quente",
        dificuldade: "simples",
        ingredientes: ["1 pão de leite", "1 salsicha", "1 colher de batata palha"],
        preparo: "Ferva a salsicha, em seguida coloque no pão de leite e adicione a batata palha por cima, para finalizar.",
        link: "http://youtube.com",
        vegano: false,
    },
];

const cadastrarReceita = (
    id,
    titulo,
    dificuldade,
    ingredientes,
    preparo,
    link,
    vegano
) => {
    const rawData = fs.readFileSync("data.json");
    const listaDeReceitas = JSON.parse(rawData);

    const indiceUltimaReceita = listaDeReceitas.length - 1;

    const novaReceita = {
        id: listaDeReceitas[indiceUltimaReceita].id + 1,
        titulo,
        dificuldade,
        ingredientes,
        preparo,
        link,
        vegano,
    };

    listaDeReceitas.push(novaReceita);

    fs.writeFileSync("data.json", JSON.stringify(listaDeReceitas));

    console.log(`Cadastro da receita ${titulo} feito com sucesso!`);
};

const exibirReceitas = () => {

    const rawData = fs.readFileSync("data.json");
    const listaDeReceitas = JSON.parse(rawData);

    listaDeReceitas.forEach((receita) => {
        const { titulo, ingredientes, vegano } = receita;
        console.log("--------------------------------");
        console.log(`Título: ${titulo}`);

        console.log("Ingredientes:");
        ingredientes.forEach((ingrediente) => {
            console.log(`- ${ingrediente}`);
        });

        console.log("É vegano? ", vegano ? "Sim" : "Não");
        console.log("--------------------------------");
    });
};

    const deletarReceita = (id) => {

        const rawData = fs.readFileSync("data.json");
        const listaDeReceitas = JSON.parse(rawData);

        const indiceReceita = listaDeReceitas.findIndex((receita) => {
            return receita.id === id;
        });

        if (indiceReceita === -1) {
            return console.log("Receita não encontrada");
        }

        listaDeReceitas.splice(indiceReceita, 1);

        console.log("Receita deletada com sucesso!");
        fs.writeFileSync("data.json", JSON.stringify(listaDeReceitas));

};

        const buscarReceita = (termo) => {
            const rawData = fs.readFileSync("data.json");
            const listaDeReceitas = JSON.parse(rawData);
        
            const resultado = listaDeReceitas.filter((receita) => {
                return receita.titulo.toLowerCase().indexOf(termo) != -1;
            });
            if (resultado.length >= 1) {
                console.log(resultado);
            } else {
                console.log("Receita não encontrada");
            }
        };

        const atualizarReceita = (id, receitaAtualizada = {}) => {

            const rawData = fs.readFileSync("data.json");
            const listaDeReceitas = JSON.parse(rawData);
        
        
            const indiceReceita = listaDeReceitas.findIndex(receita => {
                return receita.id === id;
            });
        
            if (indiceReceita === -1) {
                return console.log("Receita não encontrada");
            }
        
            listaDeReceitas[indiceReceita] = {
                ...listaDeReceitas[indiceReceita],
                ...receitaAtualizada,
            };
        
            fs.writeFileSync("data.json", JSON.stringify(listaDeReceitas));
        
            console.log(`Receita "${listaDeReceitas[indiceReceita].titulo}" atualizada com sucesso!`);
        };
        
        buscarReceita("pipoca");
        
        atualizarReceita(6, { dificuldade: "Difícil" });