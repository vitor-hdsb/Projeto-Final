// --- DADOS DO CURSO (MISSÕES) ---
const missions = [
    {
        title: "Fase 1: Ameaças Digitais",
        content: `
            <h3>O que é Phishing?</h3>
            <p>Phishing é uma técnica de engenharia social usada para enganar usuários e obter informações confidenciais.</p>
            <ul>
                <li>Nunca clique em links suspeitos.</li>
                <li>Verifique o remetente do e-mail.</li>
            </ul>
            <p><strong>Missão:</strong> Identifique e ignore e-mails que pedem senhas urgentes.</p>
        `
    },
    {
        title: "Fase 2: Plano de Contingência",
        content: `
            <h3>Quando tudo falha...</h3>
            <p>O Plano de Contingência visa garantir a continuidade dos negócios após um incidente.</p>
            <p>Devemos ter backups atualizados e testados frequentemente (Restore).</p>
            <p><strong>Dica:</strong> Backup na nuvem + Backup físico é uma boa prática.</p>
        `
    },
    {
        title: "Fase 3: Proteção de Dados e LGPD",
        content: `
            <h3>Seus dados, sua responsabilidade</h3>
            <p>A LGPD exige que tratemos dados pessoais com transparência e segurança.</p>
            <p>Não compartilhe senhas e sempre bloqueie sua tela ao sair da mesa.</p>
        `
    }
];

// --- BANCO DE QUESTÕES (POOL) ---
// Adicionei 15 questões para o sistema sortear 10 aleatórias
const questionPool = [
    { q: "Qual o principal objetivo da Segurança da Informação?", options: ["Proteger a confidencialidade, integridade e disponibilidade", "Apenas fazer backups", "Monitorar redes sociais"], a: 0 },
    { q: "O que é Phishing?", options: ["Um vírus de computador", "Uma técnica de fraude via e-mail/msg", "Um firewall"], a: 1 },
    { q: "O que garante a Integridade da informação?", options: ["Que ela não foi alterada indevidamente", "Que ela é secreta", "Que ela está acessível"], a: 0 },
    { q: "Qual a melhor prática para senhas?", options: ["Usar '123456'", "Anotar no monitor", "Usar caracteres especiais, números e letras"], a: 2 },
    { q: "O que é um Plano de Contingência?", options: ["Um plano de férias", "Estratégia para recuperar operações após desastre", "Um antivírus"], a: 1 },
    { q: "Segundo a LGPD, o que é um dado sensível?", options: ["Nome completo", "Origem racial ou étnica", "E-mail corporativo"], a: 1 },
    { q: "O que fazer ao receber um e-mail suspeito?", options: ["Clicar no link", "Encaminhar para todos", "Reportar à TI e deletar"], a: 2 },
    { q: "Qual a função do Backup?", options: ["Deixar o PC lento", "Cópia de segurança para restauração", "Ocupar espaço"], a: 1 },
    { q: "Engenharia Social ataca principalmente:", options: ["O Hardware", "O Software", "O Fator Humano"], a: 2 },
    { q: "Bloquear a tela do computador ao sair é:", options: ["Desnecessário", "Uma boa prática de segurança física", "Perda de tempo"], a: 1 },
    { q: "Ransomware é um tipo de malware que:", options: ["Sequestra dados e pede resgate", "Deixa a internet rápida", "Limpa o disco"], a: 0 },
    { q: "A autenticação de dois fatores (2FA) serve para:", options: ["Deixar o login mais lento", "Adicionar uma camada extra de segurança", "Compartilhar senhas"], a: 1 },
    { q: "VPN é utilizada para:", options: ["Jogar online apenas", "Criar uma conexão segura e criptografada", "Aumentar a memória RAM"], a: 1 },
    { q: "Quem é o encarregado de dados na LGPD?", options: ["O Hacker", "O DPO (Data Protection Officer)", "O CEO apenas"], a: 1 },
    { q: "Atualizações de sistema (Updates) servem para:", options: ["Mudar as cores da tela", "Corrigir vulnerabilidades de segurança", "Gastar internet"], a: 1 }
];

// --- VARIÁVEIS DE CONTROLE ---
let currentMission = 0;
let selectedQuestions = [];
let score = 0;

// --- FUNÇÕES DE NAVEGAÇÃO ---

function startTraining() {
    document.getElementById('home-screen').classList.add('hidden');
    document.getElementById('home-screen').classList.remove('active');
    
    document.getElementById('mission-screen').classList.remove('hidden');
    document.getElementById('mission-screen').classList.add('active');
    loadMission();
}

function loadMission() {
    const mission = missions[currentMission];
    document.getElementById('mission-title').innerText = mission.title;
    document.getElementById('mission-content').innerHTML = mission.content;
    
    // Atualiza barra de progresso
    let progress = ((currentMission) / missions.length) * 100;
    document.getElementById('progress-fill').style.width = progress + '%';
}

function nextMission() {
    currentMission++;
    if (currentMission < missions.length) {
        loadMission();
    } else {
        // Fim das missões, ir para o Quiz
        document.getElementById('mission-screen').classList.remove('active');
        document.getElementById('mission-screen').classList.add('hidden');
        document.getElementById('quiz-screen').classList.remove('hidden');
        document.getElementById('quiz-screen').classList.add('active');
        generateQuiz();
    }
}

// --- LÓGICA DO QUIZ ---

function generateQuiz() {
    const container = document.getElementById('quiz-container');
    container.innerHTML = '';
    
    // Embaralha e pega 10 questões aleatórias
    selectedQuestions = questionPool.sort(() => 0.5 - Math.random()).slice(0, 10);
    
    selectedQuestions.forEach((q, index) => {
        let html = `<div class="quiz-item">
            <p>${index + 1}. ${q.q}</p>`;
        
        q.options.forEach((opt, i) => {
            html += `<label>
                <input type="radio" name="q${index}" value="${i}"> ${opt}
            </label>`;
        });
        
        html += `</div>`;
        container.innerHTML += html;
    });
}

function submitQuiz() {
    let correctAnswers = 0;
    
    selectedQuestions.forEach((q, index) => {
        const options = document.getElementsByName(`q${index}`);
        let selected = -1;
        for(let i=0; i<options.length; i++){
            if(options[i].checked) selected = i;
        }
        
        if(selected == q.a) correctAnswers++;
    });
    
    score = (correctAnswers / 10) * 100;
    showResult(score);
}

function showResult(finalScore) {
    document.getElementById('quiz-screen').classList.remove('active');
    document.getElementById('quiz-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.remove('hidden');
    document.getElementById('result-screen').classList.add('active');
    
    if (finalScore >= 70) {
        document.getElementById('success-msg').classList.remove('hidden');
        document.getElementById('fail-msg').classList.add('hidden');
        document.getElementById('final-score').innerText = finalScore;
    } else {
        document.getElementById('fail-msg').classList.remove('hidden');
        document.getElementById('success-msg').classList.add('hidden');
        document.getElementById('score-val').innerText = finalScore;
    }
}

function restartQuiz() {
    // Reinicia apenas o quiz
    document.getElementById('result-screen').classList.remove('active');
    document.getElementById('result-screen').classList.add('hidden');
    document.getElementById('quiz-screen').classList.remove('hidden');
    document.getElementById('quiz-screen').classList.add('active');
    generateQuiz(); // Gera novas questões aleatórias
}

// --- GERAÇÃO DE CERTIFICADO ---

function generateCertificate() {
    const name = document.getElementById('user-name').value;
    const email = document.getElementById('user-email').value;
    
    if(name.trim() === "" || email.trim() === "") {
        alert("Por favor, preencha nome e e-mail.");
        return;
    }
    
    document.getElementById('result-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.remove('active');
    document.getElementById('certificate-print').classList.remove('hidden');
    document.getElementById('certificate-print').classList.add('active');
    
    // Preenche dados
    document.getElementById('cert-name').innerText = name;
    const today = new Date();
    document.getElementById('cert-date').innerText = today.toLocaleDateString('pt-BR');
    document.getElementById('cert-score').innerText = score;
    
    // Muda o fundo para branco para impressão
    document.body.style.backgroundColor = "white";
}