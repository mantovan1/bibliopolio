import React from "react";
import { Banner, Background, Text } from './style.js';

const message = "Colabore com a gente e distribua conhecimento";

export default function Banner() {

    const [messageDisplayed, setMessageDisplayed] = useState();

    useEffect(() => {
        const interval = setInterval(() => {
          setMessageDisplayed("");
          let currentIndex = 0;
    
          const messageInterval = setInterval(() => {
            setMessageDisplayed(prevMessage => prevMessage + message[currentIndex]);
            currentIndex++;
    
            if (currentIndex >= message.length) {
              clearInterval(messageInterval);
            }
          }, 100);
    
          setTimeout(() => {
            clearInterval(messageInterval);
          }, message.length * 100); // Certifica-se de que o intervalo seja limpo após o término da exibição da mensagem completa
    
        }, 60000); // A cada 1 minuto (60.000 milissegundos)
    
        return () => {
          clearInterval(interval);
        };
    }, []);

    return (
        <Banner>
            <Background src='old-books.jpg' />
            <Text>{'testetetsttwetegvh'}</Text>
        </Banner>
    );
}