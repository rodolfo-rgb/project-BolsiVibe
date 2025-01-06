import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface MonthNavigationProps {
    currentDate: Date;
    onPreviousMonth: () => void;
    onNextMonth: () => void;
}

const MonthNavigation = ({
    currentDate,
    onPreviousMonth,
    onNextMonth,
}: MonthNavigationProps) => {
    return (
        <div className="flex items-center justify-between mb-6">
            <Button
                variant="ghost"
                size="icon"
                onClick={onPreviousMonth}
                className="hover:bg-finance-background"
            >
                <ChevronLeft className="h-6 w-6" />
            </Button>
            <h2 className="text-2xl font-semibold capitalize">
                {format(currentDate, "MMMM yyyy", { locale: es })}
            </h2>
            <Button
                variant="ghost"
                size="icon"
                onClick={onNextMonth}
                className="hover:bg-finance-background"
            >
                <ChevronRight className="h-6 w-6" />
            </Button>
        </div>
    );
};

export default MonthNavigation;