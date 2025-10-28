import AppLayout from '@/layouts/app-layout';
import { expense } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage, router } from '@inertiajs/react';
import ExpenseTable from '@/components/expense/table';
import ExpenseCreateForm from '@/components/expense/create';
import { useState } from 'react';

type ExpenseItem = {
    id?: number;
    category?: { id: number; name: string; };
    mode?: string;
    amount?: number;
    item?: string;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Expense',
        href: expense().url,
    },
];

export default function Index() {
    const pageProps = usePage().props as any;
    const expenses: ExpenseItem[] = pageProps.expenses ?? [];
    
    const [activeTab, setActiveTab] = useState<'expenses' | 'create'>('expenses');

    const handleExpenseCreated = () => {
        setActiveTab('expenses');
        router.reload();
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Expense" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="md:col-span-3">
                        {/* Tab Navigation */}
                        <div className="mb-4 border-b border-gray-200">
                            <nav className="flex space-x-4">
                                <button
                                    onClick={() => setActiveTab('expenses')}
                                    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                                        activeTab === 'expenses'
                                            ? 'border-indigo-600 text-indigo-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                >
                                    All Expenses
                                </button>
                                <button
                                    onClick={() => setActiveTab('create')}
                                    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                                        activeTab === 'create'
                                            ? 'border-indigo-600 text-indigo-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                >
                                    Create Expense
                                </button>
                            </nav>
                        </div>

                        {/* Tab Content */}
                        <div className="mt-4">
                            {activeTab === 'expenses' && (
                                <ExpenseTable expenses={expenses} />
                            )}
                            
                            {activeTab === 'create' && (
                                <ExpenseCreateForm 
                                    action="/expenses"
                                    onSuccess={handleExpenseCreated} 
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
