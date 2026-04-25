
import styles from "./Hero.module.css";

const mesage = "Olá, gostaria de saber mais sobre os sites para negócios locais que vocês oferecem.";
const link = `https://api.whatsapp.com/send?phone=5592986309966&text=${encodeURIComponent(mesage)}`;
export default function CTA() {
  return (
    <section style={{ padding: "50px", textAlign: "center" }}>
      <h2>Quer um site assim?</h2>

      <p className={styles.texto}>Fale comigo agora mesmo</p>

      <a className={styles.ctaButton}
        href={link} 
       rel="noopener noreferrer"
      >
        
        Chamar no WhatsApp
      </a>
    </section>
  );
}
