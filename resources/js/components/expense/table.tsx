import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Link } from '@inertiajs/react';

type ExpenseItem = {
    id?: number;
    category?: {
        id: number;
        name: string;
    };
    mode?: string;
    amount?: number;
    item?: string;
};

interface ExpenseTableProps {
    expenses: ExpenseItem[];
}

export default function ExpenseTable({ expenses }: ExpenseTableProps) {
    console.log('ExpenseTable received:', expenses, 'length:', expenses?.length);
    
    return (
        <div className="overflow-auto rounded bg-white/5 p-4">
            {!expenses || expenses.length === 0 ? (
                <div>
                    <PlaceholderPattern />
                    <p className="mt-2 text-sm text-muted-foreground">No expenses yet.</p>
                </div>
            ) : (
                <table className="w-full table-auto text-sm">
                    <thead>
                        <tr className="text-left">
                            <th className="px-3 py-2">Category</th>
                            <th className="px-3 py-2">Mode</th>
                            <th className="px-3 py-2">Amount</th>
                            <th className="px-3 py-2">Item</th>
                            <th className="px-3 py-2">Delete</th>

                        </tr>
                    </thead>
                    <tbody>
                        {expenses.map((expense: ExpenseItem, index: number) => (
                            <tr key={expense.id ?? index} className="border-t">
                                <td className="px-3 py-2">{expense.category?.name ?? '-'}</td>
                                <td className="px-3 py-2">{expense.mode ?? '-'}</td>
                                <td className="px-3 py-2">
                                    {expense.amount !== undefined && expense.amount !== null 
                                        ? Number(expense.amount).toFixed(2) 
                                        : '0.00'}
                                </td>
                                <td className="px-3 py-2">{expense.item ?? '-'}</td>
                                <td className="px-3 py-2">
                                    <Link href={`/expenses/${expense.id}`} method="delete" as="button" className="bg-red-500 text-white px-2 py-1 rounded text-sm">
                                        Delete
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}