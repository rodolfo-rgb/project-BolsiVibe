import { useState } from "react";

interface CreditCard {
    id: number;
    name: string;
    debt: number;
    institution?: string;
    type?: string;
    expiryDate?: string;
    cutoffDate?: string;
}

export const useCreditCards = () => {
    const [creditCards, setCreditCards] = useState<CreditCard[]>([
        {
            id: 1,
            name: "Visa Clásica",
            debt: 2500,
            type: "visa",
            institution: "Banco Nacional",
            expiryDate: "12/25",
            cutoffDate: "15"
        },
        {
            id: 2,
            name: "Mastercard Gold",
            debt: 1800,
            type: "mastercard",
            institution: "Banco Internacional",
            expiryDate: "06/26",
            cutoffDate: "20"
        },
        {
            id: 3,
            name: "American Express",
            debt: 3200,
            type: "american-express",
            institution: "American Express",
            expiryDate: "09/24",
            cutoffDate: "25"
        },
    ]);

    const updateCardDebt = (cardId: number, amount: number) => {
        setCreditCards(prev =>
            prev.map(card =>
                card.id === cardId
                    ? { ...card, debt: Math.max(0, card.debt - amount) }
                    : card
            )
        );
    };

    return {
        creditCards,
        setCreditCards,
        updateCardDebt
    };
};