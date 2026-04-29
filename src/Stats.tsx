import { useEffect, useRef, useState }  from "react";
import styles from "./ExemploLanchonete.module.css";

type StatsProps = {
    value: number,
    label: string,
    suffix: string;
};


export function Stat({value, label,  suffix}: StatsProps) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement | null>(null);
    const  started = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) =>  {
            if(entry.isIntersecting && !started.current) {
                started.current =   true;

                let start = 0;
                const duration = 1200;
                const  increment = value  / (duration / 16);

                const timer = setInterval(() => {
                    start +=  increment;

                    if(start >= value) {
                        setCount(value);
                        clearInterval(timer)
                    } else {
                        setCount(Math.floor(start));
                    }
                }, 16);
            }
        });

        if(ref.current) observer.observe(ref.current);
        
        return() => observer.disconnect();

 
    }, [value]);

    return (
        <div ref={ref} className={styles.statBlock}>
           <div className={styles.statNum}>
           {count}
            {suffix}
           </div>
           <div className={styles.statLabel} >{label}</div>
        </div>
    );
}


export default function Stats() {
    return (
        <div className= {styles.heroRight}>
            <Stat value={5} label="ANOS NO  BAIRRO" suffix={"+"}/>
            <Stat value={1000} label="CLIENTES SATISFEITOS" suffix={"+"}/>
            <Stat value={100} label="FEITO NA HORA" suffix="%"/>


            <div className={styles.heroImage}>
                <img src="/burguer.jpg" alt="Lanche" />
            </div>
        </div>
    );
}

