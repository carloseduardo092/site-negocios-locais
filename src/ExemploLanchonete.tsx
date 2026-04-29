import { useRef , useState  , type RefObject} from "react";
import styles from "./ExemploLanchonete.module.css";
import  Stat  from "./Stats";

// ─────────────────────────────────────────
// ÍCONE DO WHATSAPP
// É um componente separado porque o SVG é
// reutilizado em dois lugares (hero e contato).
// Em vez de copiar o código duas vezes, criamos
// um componente e usamos <WppIcon /> onde precisar.
// ─────────────────────────────────────────
const WppIcon = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

// ─────────────────────────────────────────
// DADOS DO CARDÁPIO
// Separar os dados do visual é uma boa prática
// em React. Quando quiser mudar um item, preço
// ou descrição, você só mexe aqui — o resto
// da página não precisa ser tocado.
// ─────────────────────────────────────────
const menuData: Record<string, { icon: string; name: string; desc: string; price: string }[]> = {
  lanches: [
    { icon: "🍔", name: "X-Burgão",    desc: "Pão brioche, carne 180g, queijo cheddar e salada fresca", price: "R$ 22,90" },
    { icon: "🥓", name: "X-Bacon",     desc: "Carne 180g, bacon crocante e maionese especial da casa",  price: "R$ 26,90" },
    { icon: "🌮", name: "Wrap Frango", desc: "Frango grelhado, alface americana e molho Caesar",        price: "R$ 19,90" },
    { icon: "🥪", name: "Misto Quente",desc: "Pão de forma, presunto e queijo mussarela",               price: "R$ 12,90" },
  ],
  bebidas: [
    { icon: "🥤", name: "Refri Lata",   desc: "Coca-Cola, Guaraná ou Sprite gelada",           price: "R$ 7,90"  },
    { icon: "🧃", name: "Suco Natural", desc: "Laranja, maracujá ou acerola. 300ml",            price: "R$ 10,90" },
    { icon: "🧋", name: "Milkshake",    desc: "Chocolate, morango ou baunilha. 400ml cremoso",  price: "R$ 16,90" },
  ],
  acomp: [
    { icon: "🍟", name: "Batata Frita",  desc: "Porção grande com sal e vinagre",                price: "R$ 14,90" },
    { icon: "🧅", name: "Onion Rings",   desc: "Anéis de cebola empanados e crocantes",          price: "R$ 13,90" },
    { icon: "🥗", name: "Salada",        desc: "Mix de folhas com tomate cereja e molho",        price: "R$ 11,90" },
  ],
};


// ✏️ Coloque seu número aqui (com DDI + DDD, sem espaços ou traços)
const phone   = "5592986309966";
const message = "Olá! Gostaria de fazer um pedido.";
const wppLink = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;

// Nomes das abas que aparecem na tela
const tabs = [
  { key: "lanches", label: "Lanches"          },
  { key: "bebidas", label: "Bebidas"           },
  { key: "acomp",   label: "Acompanhamentos"  },
];

// ─────────────────────────────────────────
// COMPONENTE PRINCIPAL
// ─────────────────────────────────────────
export default function Lanchonete() {

  // useRef → cria uma "etiqueta" que colamos em
  // elementos HTML para poder acessá-los direto.
  // Usamos em três seções para o scroll suave
  // funcionar quando o usuário clica no menu.
  const cardapioRef = useRef<HTMLElement| null>(null);
  const sobreRef    = useRef<HTMLElement| null>(null);
  const contatoRef  = useRef<HTMLElement| null>(null);

  // useState → memória do componente.
  // "tabAtual" guarda qual aba do cardápio está
  // ativa ("lanches", "bebidas" ou "acomp").
  // Quando muda, o React re-renderiza só a parte
  // necessária automaticamente.
  const [tabAtual, setTabAtual] = useState("lanches");

  // Função de scroll reutilizável.
  // Recebe a ref do elemento e rola a tela até ele.
  const scrollTo = (ref: RefObject<HTMLElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Os itens do cardápio da aba ativa
  const itensAtivos = menuData[tabAtual];

  return (
    <div className={styles.root}>

      {/* ── NAV ─────────────────────────────
          Barra de navegação fixa no topo.
          Cada link chama scrollTo() com a ref
          da seção correspondente.
      ─────────────────────────────────────── */}
      <nav className={styles.nav}>
        <div className={styles.navLogo}>
          Sabor<span className={styles.gold}>Top</span>
        </div>
        <div className={styles.navLinks}>
          <button className={styles.navLink} onClick={() => scrollTo(cardapioRef)}>Cardápio</button>
          <button className={styles.navLink} onClick={() => scrollTo(sobreRef)}>Sobre</button>
          <button className={styles.navLink} onClick={() => scrollTo(contatoRef)}>Contato</button>
        </div>
      </nav>

      {/* ── HERO ────────────────────────────
          Seção principal. Dividida em dois lados:
          esquerdo (texto + botões) e direito (stats).
          O layout em grid de 2 colunas é feito no CSS.
      ─────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroLeft}>
          <div className={styles.heroTag}>Lanchonete artesanal</div>
          <h1 className={styles.heroTitle}>
            Feito com cuidado,<br />
            servido com <em className={styles.gold}>sabor.</em>
          </h1>
          <p className={styles.heroSub}>
            Cada lanche preparado na hora, com ingredientes frescos
            e aquele gosto de comida de verdade que você não esquece.
          </p>
          <div className={styles.heroActions}>
            <button className={styles.btnGold} onClick={() => scrollTo(cardapioRef)}>
              Ver cardápio
            </button>
            <a href={wppLink} className={styles.btnGhost}>
              Pedir agora →
            </a>
          </div>
        </div>

        <Stat/>

      </section>

      {/* ── CARDÁPIO ────────────────────────
          ref={cardapioRef} → cola a etiqueta aqui
          para o scroll do nav funcionar.

          As abas controlam "tabAtual" via useState.
          Quando tabAtual muda, "itensAtivos" muda
          automaticamente e o React atualiza a grade.
      ─────────────────────────────────────── */}
      <section ref={cardapioRef} className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <div className={styles.sectionLabel}>O que temos</div>
            <div className={styles.sectionTitle}>Cardápio</div>
          </div>
          <div className={styles.sectionCount}>{itensAtivos.length} itens</div>
        </div>

        {/* Abas */}
        <div className={styles.menuTabs}>
          {tabs.map((t) => (
            <button
              key={t.key}
              className={`${styles.tab} ${tabAtual === t.key ? styles.tabOn : ""}`}
              onClick={() => setTabAtual(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Grade de itens — gerada com .map() a partir de itensAtivos */}
        <div className={styles.menuGrid}>
          {itensAtivos.map((item) => (
            <div key={item.name} className={styles.menuItem}>
              <div className={styles.miTop}>
                <span className={styles.miIcon}>{item.icon}</span>
                <span className={styles.miPrice}>{item.price}</span>
              </div>
              <p className={styles.miName}>{item.name}</p>
              <p className={styles.miDesc}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SOBRE ───────────────────────────
          Seção em grid de 2 colunas:
          esquerda → história, direita → diferenciais.
      ─────────────────────────────────────── */}
      <section ref={sobreRef} className={styles.sobre}>
        <div className={styles.sobreLeft}>
          <div className={styles.sectionLabel}>Nossa história</div>
          <h2 className={styles.sectionTitle}>Sobre nós</h2>
          <div className={styles.sobreNum}>05</div>
          <p className={styles.sobreDestaque}>
            Cinco anos servindo o melhor lanche do bairro.
          </p>
          <p className={styles.sobreTxt}>
            Começamos pequenos, com uma chapa, muito amor e a receita certa.
            Hoje somos referência na região, mas o compromisso é o mesmo:
            comida fresca, atendimento rápido e preço justo.
          </p>
          <div className={styles.tagRow}>
            {["Artesanal", "Fresco todo dia", "Família"].map((t) => (
              <span key={t} className={styles.tag}>{t}</span>
            ))}
          </div>
        </div>

        <div className={styles.sobreRight}>
          <div className={styles.sectionLabel}>Por que a gente?</div>
          {[
            { titulo: "Ingredientes frescos",  desc: "Recebemos fornecedores toda manhã. Nada fica de ontem." },
            { titulo: "Feito na hora",         desc: "Cada pedido é preparado do zero. Sem pré-pronto."       },
            { titulo: "Atendimento rápido",    desc: "Seu pedido fica pronto em até 15 minutos."              },
            { titulo: "Preço justo",           desc: "Qualidade que cabe no bolso, sem abrir mão do sabor."   },
          ].map((d) => (
            <div key={d.titulo} className={styles.diferencial}>
              <p className={styles.difTitulo}>{d.titulo}</p>
              <p className={styles.difDesc}>{d.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTATO ─────────────────────────
          Três blocos de informação lado a lado
          + botão do WhatsApp.
      ─────────────────────────────────────── */}
      <section ref={contatoRef} className={styles.contato}>
        <div className={styles.sectionLabel}>Fale com a gente</div>
        <h2 className={styles.sectionTitle}>Contato</h2>

        <div className={styles.contatoGrid}>
          {[
            { label: "WhatsApp", val: "(92) 99999-9999", sub: "Pedidos e dúvidas"  },
            { label: "Endereço", val: "Rua das Flores, 123", sub: "Iranduba, AM"   },
            { label: "Horário",  val: "Seg–Sáb",          sub: "11h às 22h"        },
          ].map((c) => (
            <div key={c.label} className={styles.contatoItem}>
              <div className={styles.ciLabel}>{c.label}</div>
              <div className={styles.ciVal}>{c.val}</div>
              <div className={styles.ciSub}>{c.sub}</div>
            </div>
          ))}
        </div>

        <a href={wppLink} className={styles.wppBtn}>
          <WppIcon /> Chamar no WhatsApp
        </a>
      </section>

      {/* ── FOOTER ──────────────────────────
          Rodapé simples com logo e copyright.
      ─────────────────────────────────────── */}
      <footer className={styles.footer}>
        <div className={styles.footerLogo}>
          Sabor<span className={styles.gold}>Top</span>
        </div>
        <div className={styles.footerCopy}>
          © 2025 SaborTop — Todos os direitos reservados
        </div>
      </footer>

    </div>
  );
}