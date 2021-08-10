// Autor: Arthur Felipe Bravo Pita
// Objetivo: Teste Prático - Processo Seletivo Rocky
// Data de entrega: 10.08.2021

/* * * * * QUESTÃO 1 - RECUPERAÇÃO DOS DADOS * * * * */

const fs = require('fs');

// Função de leitura do arquivo
function readJson(path) {
	let temp;
	try {
		// Leitura do arquivo .json
		temp = fs.readFileSync(path, "utf8");
	} catch (error) {
		console.log("Erro na leitura do arquivo .json");
		return 0;
	}

	// Processamento dos dados lidos na variável "temp" como um objeto JavaScript
	return JSON.parse(temp);
}

// Função de correção dos NOMES dos produtos
function correctName(toCorrect) {
	for (let index in toCorrect) {

		// Substituições de 'æ' por 'a', de '¢' por 'c', de 'ø' por 'o' e de 'ß' por 'b'
		// Sinalizador 'g' (global) para substituir todas as ocorrências
		toCorrect[index].name = toCorrect[index].name.replace(/æ/g, 'a');
		toCorrect[index].name = toCorrect[index].name.replace(/¢/g, 'c');
		toCorrect[index].name = toCorrect[index].name.replace(/ø/g, 'o');
		toCorrect[index].name = toCorrect[index].name.replace(/ß/g, 'b');
}	}

// Função de correção dos PREÇOS dos produtos
function correctPrice(toCorrect) {
	for (let index in toCorrect) {
		if (typeof (toCorrect[index].price) != 'number') {

			// Atualização dos preços em string para number (float, mais precisamente)
			toCorrect[index].price = parseFloat(toCorrect[index].price);
}	}	}

// Função de correção das QUANTIDADES dos produtos
function correctQuantity(toCorrect) {
	for (let index in toCorrect) {

		// Verificação da existência do atributo "quantity" no objeto "jsonFile"
		if ( !toCorrect[index].hasOwnProperty('quantity') ) {

			// Criação da propriedade inexistente no objeto
			toCorrect[index].quantity = 0;
}	}	}

// Função de criação e escrita do arquivo
function writeJson(path, data) {

	// Transforma os dados em uma string (já deixando indentada)
	let jsonString = JSON.stringify(data, null, 4);

	try {
		// Salva .json no local desejado
		return fs.writeFileSync(path, jsonString);
	} catch (error) {
		console.log("Erro ao criar/salvar arquivo .json");
		return 0;
}	}

/* * * * * QUESTÃO 2 - VALIDAÇÕES * * * * */

// Função de ordenação e listagem de todos os produtos
function sortProducts(toSort) {

	// Ordenação das CATEGORIAS em ordem alfabética
	toSort.sort(function (a, b) {

		// Comparação feita apenas com letra minúsculas, para evitar erros
		a = a.category.toLowerCase();
		b = b.category.toLowerCase();

		if (a > b) return 1;
		else if (a < b) return -1;
		else return 0;
	});

	// Ordenação dos ID's de uma mesma categoria em ordem crescente
	toSort.sort(function (a, b) {
		if (a.category == b.category) {
			// Igual a 1, se "a > b"
			// Igual a -1, se "a < b"
			// Igual a 0, se "a = b"
			return a.id - b.id;
		}
	});

	// Impressão da lista com todos os nomes dos produtos
	for (let index in toSort) {
		console.log(toSort[index].name);
	}
}

// Função de cálculo do valor total do estoque por categoria
function countStock(toCount) {
	let index = 0;
	let currentCategory;
	let currentValue = 0;

	for (; index<toCount.length-1; index++) {

		// Categorias diferente da próxima
		if (toCount[index].category != toCount[index+1].category) {
			currentCategory = toCount[index].category;
			currentValue += toCount[index].quantity * toCount[index].price;
			console.log(currentCategory + ": R$ " + currentValue);
			currentCategory = null;
			currentValue = 0;

		// Mesma categoria que a próxima
		} else {
			currentValue += toCount[index].quantity * toCount[index].price;
		}
	}

	// Última execução do vetor de produtos
	currentCategory = toCount[index].category;
	currentValue += toCount[index].quantity * toCount[index].price;
	console.log(currentCategory + ": R$ " + currentValue);
	currentCategory = null;
	currentValue = 0;
}

/* * * * * EXECUÇÃO PRINCIPAL * * * * */

// O retorno da função de leitura, ou seja, o conteúdo do arquivo .json, é salvo na variável "jsonFile"
let jsonFile = readJson('./broken-database.json');
correctName(jsonFile);
correctPrice(jsonFile);
correctQuantity(jsonFile);
writeJson('./saida.json', jsonFile);

// Novo input: o banco de dados corrigido na questão 1
let newJson = readJson('./saida.json');
sortProducts(newJson);
countStock(newJson);