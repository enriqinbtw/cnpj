async function consultarCNPJ() {
    const cnpj = document.getElementById('cnpjInput').value;
    if (cnpj.length !== 14) {
        alert("Por favor, digite um CNPJ válido com 14 dígitos.");
        return;
    }

    try {
        const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`);
        if (!response.ok) throw new Error();
        
        const data = await response.json();

        // Preenchendo os campos
        document.getElementById('razao').innerText = data.razao_social;
        document.getElementById('fantasia').innerText = data.nome_fantasia || "Não informado";
        document.getElementById('cnpj_res').innerText = data.cnpj;
        document.getElementById('atividade').innerText = data.estabelecimento.atividade_principal.descricao;
        document.getElementById('capital').innerText = `R$ ${data.capital_social.toLocaleString('pt-BR')}`;
        document.getElementById('situacao').innerText = data.situacao_cadastral;
        document.getElementById('telefone').innerText = data.ddd_telefone_1 || "Não informado";
        
        const end = data.estabelecimento;
        document.getElementById('endereco').innerText = `${end.logradouro}, ${end.numero} - ${end.bairro}, ${end.municipio}/${end.estado}`;

    } catch (error) {
        alert("Erro ao buscar dados. Verifique o CNPJ ou a conexão.");
    }
}

function gerarPDF() {
    const conteudo = document.getElementById('resultado');
    const opcoes = {
        margin: 10,
        filename: 'consulta_empresa.pdf',
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opcoes).from(conteudo).save();
}