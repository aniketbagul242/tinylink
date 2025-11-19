import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export default function App() {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
            {/* Header */}
            <header className="bg-white shadow-md sticky top-0 z-10">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <Link
                        to="/"
                        className="text-2xl font-bold text-blue-600 hover:text-blue-800 transition-colors"
                    >
                        TinyLink
                    </Link>
                    <nav className="space-x-4">
                        <Link
                            to="/"
                            className="text-gray-700 hover:text-blue-600 transition-colors"
                        >
                            Dashboard
                        </Link>
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-6 py-8 flex-1">
                <div className="bg-white shadow rounded-lg p-6">
                    <Outlet />
                </div>
            </main>

        </div>
    );
}
