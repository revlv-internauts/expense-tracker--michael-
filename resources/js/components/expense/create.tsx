import React, { useState } from 'react';
import { useForm, usePage, router } from '@inertiajs/react';

type FormData = {
  category_id: string;
  mode: string;
  amount: string | number;
  item: string;
};

type Category = {
  id: number;
  name: string;
};

type Props = {
  action?: string;
  onSuccess?: () => void;
};

export default function ExpenseCreateForm({ action = '/expenses', onSuccess }: Props) {
  const pageProps = usePage().props as any;
  const categories: Category[] = pageProps.categories ?? [];
  
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  const { data, setData, post, processing, errors, reset } = useForm<FormData>({
    category_id: '',
    mode: '',
    amount: '',
    item: '',
  });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    post(action, {
      onSuccess: () => {
        reset();
        onSuccess?.();
      },
    });
  }

  function addCategory(e: React.FormEvent) {
    e.preventDefault();
    if (!newCategory.trim()) return;
    
    // Post to create category
    router.post('/categories', { name: newCategory }, {
      onSuccess: () => {
        setNewCategory('');
        setShowCategoryForm(false);
      },
    });
  }

  return (
    <div className="col-span-3 rounded bg-white/5 p-4">
      <h2 className="mb-3 text-base font-semibold">Create Expense</h2>
      <form onSubmit={submit} className="grid max-w-xl gap-4">
        <div>
          <div className="mb-1 flex items-center justify-between">
            <label className="block text-sm font-medium">Category</label>
            <button
              type="button"
              onClick={() => setShowCategoryForm(!showCategoryForm)}
              className="text-xs text-indigo-600 hover:text-indigo-700"
            >
              {showCategoryForm ? 'Cancel' : '+ Add Category'}
            </button>
          </div>

          {showCategoryForm ? (
            <div className="flex gap-2">
              <input
                type="text"
                className="flex-1 rounded border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Enter category name"
              />
              <button
                type="button"
                onClick={addCategory}
                className="rounded bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700"
              >
                Add
              </button>
            </div>
          ) : (
            <select
              className="w-full rounded border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900"
              value={data.category_id}
              onChange={(e) => setData('category_id', e.target.value)}
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          )}
          {errors.category_id && <p className="mt-1 text-sm text-red-500">{errors.category_id}</p>}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Mode</label>
          <select
            className="w-full rounded border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900"
            value={data.mode}
            onChange={(e) => setData('mode', e.target.value)}
          >
            <option value="">Select mode</option>
            <option value="Cash">Cash</option>
            <option value="Card">Card</option>
          </select>
          {errors.mode && <p className="mt-1 text-sm text-red-500">{errors.mode}</p>}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Amount</label>
          <input
            type="number"
            step="0.01"
            className="w-full rounded border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900"
            value={data.amount}
            onChange={(e) => setData('amount', e.target.value)}
            placeholder="0.00"
          />
          {errors.amount && <p className="mt-1 text-sm text-red-500">{errors.amount}</p>}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Item</label>
          <input
            type="text"
            className="w-full rounded border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900"
            value={data.item}
            onChange={(e) => setData('item', e.target.value)}
            placeholder="e.g., Groceries"
          />
          {errors.item && <p className="mt-1 text-sm text-red-500">{errors.item}</p>}
        </div>

        <button
          type="submit"
          disabled={processing}
          className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
        >
          {processing ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  );
}