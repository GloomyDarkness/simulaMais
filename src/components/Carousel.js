import { useEffect, useState, useCallback } from 'react';

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchStartX, setTouchStartX] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

    const cards = [
        {
            icon: "📈",
            title: "Simulação Detalhada",
            description: "Veja mês a mês como seu investimento cresce, incluindo dividendos e reinvestimentos."
        },
        {
            icon: "💰",
            title: "Reinvestimento Automático",
            description: "Calcule o impacto do reinvestimento dos dividendos no longo prazo."
        },
        {
            icon: "📊",
            title: "Análise Completa",
            description: "Acompanhe o total investido, reinvestido e os dividendos mensais projetados."
        }
    ];

    const getCardClassName = useCallback((index) => {
        const position = (index - currentIndex + cards.length) % cards.length;
        if (position === 0) return 'carousel-card center';
        if (position === cards.length - 1) return 'carousel-card left';
        return 'carousel-card right';
    }, [currentIndex, cards.length]);  

    const navigate = useCallback((direction) => {
        setCurrentIndex(current => {
            if (direction === 'next') {
                return (current + 1) % cards.length;
            }
            return (current - 1 + cards.length) % cards.length;
        });
    }, [cards.length]);

    const handleTouchStart = (e) => {
        setTouchStartX(e.touches[0].clientX);
        setIsDragging(true);
    };

    const handleTouchEnd = (e) => {
        if (!isDragging) return;
        
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > 50) {
            navigate(diff > 0 ? 'next' : 'prev');
        }
        
        setIsDragging(false);
    };

    useEffect(() => {
        const interval = setInterval(() => navigate('next'), 5000);
        return () => clearInterval(interval);
    }, [navigate]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft') navigate('prev');
            if (e.key === 'ArrowRight') navigate('next');
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [navigate]);

    return (
        <div className="carousel-container">
            <div 
                className="carousel"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                {cards.map((card, index) => (
                    <div 
                        key={index}
                        className={getCardClassName(index)}
                        onClick={() => {
                            if (index !== currentIndex) {
                                navigate(index > currentIndex ? 'next' : 'prev');
                            }
                        }}
                    >
                        <div className="card-content">
                            <div className="card-icon">{card.icon}</div>
                            <h3>{card.title}</h3>
                            <p>{card.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Carousel;
