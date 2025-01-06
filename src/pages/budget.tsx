import MonthlyView from "../components/MonthlyView";
import { Toaster } from "../components/ui/toaster";
import { Toaster as Sonner } from "../components/ui/sonner";
const Budget = () => {
    return (
        <>
            <Toaster />
            <Sonner />
            <MonthlyView />
        </>
    );
};

export default Budget;